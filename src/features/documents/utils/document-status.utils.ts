import { DocumentStatus } from "../types/document.types";

export const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case DocumentStatus.COMPLETED:
      return "success";
    case DocumentStatus.PROCESSING:
      return "warning";
    case DocumentStatus.FAILED:
      return "error";
    default:
      return "default";
  }
};
