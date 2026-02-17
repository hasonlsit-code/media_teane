import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RegisterPage from "./pages/auth/Register.jsx";
import enUS from "antd/locale/en_US";
import Homepage from "./components/Homepage.jsx";
import LoginPage from "./pages/auth/Login.jsx";
import { ConfigProvider } from "antd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AppProvider> */}
    <ConfigProvider locale={enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
    {/* </AppProvider> */}
  </StrictMode>,
);
