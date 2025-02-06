import { RouteObject } from "react-router";
import { DocumentDetail } from "./components/DocumentDetail";
import { DocumentsList } from "./components/DocumentsList";
import { DocumentUpload } from "./components/DocumentUpload";

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
        element: <DocumentUpload />,
      },
      {
        path: ":id",
        element: <DocumentDetail />,
      },
    ],
  },
];
