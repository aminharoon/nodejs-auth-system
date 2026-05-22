import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1 className="">Home</h1>,
      },
      {
        path: "/about",
        element: <h1>About</h1>,
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);
