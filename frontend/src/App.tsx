import React from "react";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import privateRoutes from "./routes/PrivateRoutes";
import publicRoute from "./routes/PublicRoutes";
import checkAuth from "./utils/checkAuth";

function App() {
  const router = createBrowserRouter([
    checkAuth() ? privateRoutes() : {},
    ...publicRoute(),
  ]);
  return <RouterProvider router={router} />;
}

export default App;
