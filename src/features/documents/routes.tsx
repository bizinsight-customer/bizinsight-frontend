import { RouteObject } from "react-router";
import { DocumentDetail } from "./pages/DocumentDetail";
import { DocumentRecognition } from "./pages/DocumentRecognition/DocumentRecognition";
import { DocumentsList } from "./pages/DocumentsList/DocumentsList";
import { DocumentsHistoryPage } from "./pages/documents-history.page";

export const documentsRoutes: RouteObject[] = [
  {
    path: "documents",
    children: [
      {
        index: true,
        element: <DocumentsList />,
      },
      {
        path: "new",
        element: <DocumentRecognition />,
      },
      {
        path: ":id",
        element: <DocumentDetail />,
      },
      {
        path: "history",
        element: <DocumentsHistoryPage />,
      },
    ],
  },
];
