import { Navigate } from "react-router";
import Layout from "../Layout";
import Home from "../pages/Home/Home";

export default function privateRoutes() {
  return {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  };
}
