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
import About from "./components/homepage/About.jsx";
import ProductMain from "./components/homepage/ProductMain.jsx";
import ProductList from "./components/homepage/ProductList.jsx";
import Slide from "./components/homepage/Slide.jsx";
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
        path: "about",
        element: <About />,
      },
      {
        path: "product-main",
        element: <ProductMain />,
      },
      {
        path: "product-list",
        element: <ProductList />,
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
