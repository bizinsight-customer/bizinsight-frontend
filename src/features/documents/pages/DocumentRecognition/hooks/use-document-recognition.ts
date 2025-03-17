import { SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useGetDocumentTypesQuery } from "../../../store/document-types.slice";
import { useRecognizeDocumentMutation } from "../../../store/documents-api.slice";
import { useCreateDocumentMutation } from "../../../store/documents-updated.api-slice";
import { DocumentType } from "../../../types/document.types";
import { FieldErrors, RecognizedData } from "../document-recognition.types";
import {
  flattenRecognizedData,
  getInputDefaultValue,
  handleFieldValueChange,
} from "../utils/document-data-transformer";

export const useDocumentRecognition = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdDocumentId, setCreatedDocumentId] = useState<string>();
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [recognizedData, setRecognizedData] = useState<RecognizedData>({});
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [recognizeDocument] = useRecognizeDocumentMutation();
  const [createDocument, { isLoading: isCreating }] =
    useCreateDocumentMutation();
  const {
    data: documentTypes,
    isLoading: isLoadingTypes,
    error: documentTypesError,
  } = useGetDocumentTypesQuery();

  console.log("DOCUMENT TYPES", documentTypes);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    const newType = documentTypes?.find((type) => type.value === selectedValue);
    setSelectedType(newType || null);
    // Clear field errors when changing type
    setFieldErrors({});

    if (newType) {
      const initialFields = Object.entries(newType.fields).reduce(
        (acc, [key, field]) => {
          if (key in recognizedData) {
            acc[key] = recognizedData[key];
          } else {
            acc[key] = getInputDefaultValue(field.type);
          }
          return acc;
        },
        {} as RecognizedData
      );
      setRecognizedData(initialFields);
    } else {
      setRecognizedData({});
    }
  };

  const handleFieldChange = (path: string, value: string) => {
    // Clear error for the field being changed
    setFieldErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[path];
      return newErrors;
    });

    setRecognizedData((prevData) =>
      handleFieldValueChange(prevData, path, value)
    );
  };

  const handleCreateDocument = async () => {
    if (!fileObject || !selectedType) return;

    try {
      setFieldErrors({});
      const fields = flattenRecognizedData(recognizedData);
      const payload = {
        file: fileObject,
        type: selectedType.value,
        title: String(recognizedData.title) || fileObject.name,
        description: recognizedData.description?.toString(),
        fields,
      };

      const response = await createDocument(payload).unwrap();
      console.log("response", response);
      setCreatedDocumentId(response.id);
      setIsSuccess(true);
    } catch (err) {
      console.error("Error creating document:", err);
      const errors = err?.data?.errors;
      console.log("ERRORS", errors);

      // Handle validation errors
      if (errors && Array.isArray(errors) && errors.length > 0) {
        const newFieldErrors: FieldErrors = {};
        errors.forEach((validationError) => {
          if (validationError.loc && validationError.loc.length > 0) {
            const fieldPath = validationError.loc[0];
            newFieldErrors[fieldPath] = validationError.msg;
          }
        });
        setFieldErrors(newFieldErrors);
      }
    }
  };

  const handleCancel = () => {
    setFileObject(null);
    setRecognizedData({});
    setSelectedType(null);
    setFieldErrors({});
    navigate(-1);
  };

  const handleUploadToRecognize = useCallback(
    async (file: File) => {
      setFileObject(file);
      setActiveStep(1);
      try {
        const response = await recognizeDocument(file).unwrap();
        setSelectedType(
          documentTypes?.find((type) => type.value === response.document_type)
        );
        setRecognizedData(response.extracted_data);
        setActiveStep(2);
      } catch (err) {
        console.error("Error recognizing document:", err);
        setActiveStep(0);
      }
    },
    [recognizeDocument, documentTypes]
  );

  return {
    activeStep,
    isSuccess,
    createdDocumentId,
    fileObject,
    recognizedData,
    selectedType,
    documentTypes,
    isLoadingTypes,
    isCreating,
    documentTypesError,
    fieldErrors,
    handleTypeChange,
    handleFieldChange,
    handleCreateDocument,
    handleCancel,
    handleUploadToRecognize,
    setActiveStep,
  };
};
