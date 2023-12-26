import { Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import SingUp from "../pages/SingUp/SingUp";

export default function publicRoutes() {
  return [
    { path: "/login", element: <Login /> },
    { path: "/register", element: <SingUp /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];
}
