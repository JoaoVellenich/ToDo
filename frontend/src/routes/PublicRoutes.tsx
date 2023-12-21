import { Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";

export default function publicRoutes() {
  return [
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}
