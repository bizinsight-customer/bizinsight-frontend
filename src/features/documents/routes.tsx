import { RouteObject } from "react-router";
import { DocumentRecognition } from "./pages/DocumentRecognition/DocumentRecognition";
import { DocumentsList } from "./pages/DocumentsList";

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
      // {
      //   path: ":id",
      //   element: <DocumentDetail />,
      // },
    ],
  },
];
