import { useDocumentsList } from "./useDocumentsList";

export const useDocumentFromList = (id: string) => {
  const { documents, isLoading, error } = useDocumentsList();
  const document = documents.find((d) => d.id === id);

  return {
    document,
    isLoading,
    error,
  };
};
