import { useGetDocumentTypesQuery } from "../store/document-types.slice";

export const useDocumentTypes = () => {
  const {
    data: documentTypes = [],
    isLoading,
    error,
  } = useGetDocumentTypesQuery();

  return {
    documentTypes,
    isLoading,
    error,
  };
};
