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
import Shop from "./pages/client/Shop.jsx";
import CreateUser from "./components/admin/user/CreateUser.jsx";
import DetailUser from "./components/admin/user/DetailUser.jsx";
import TableUser from "./components/admin/user/TableUser.jsx";
import UpdateUser from "./components/admin/user/UpdateUser.jsx";
import CreateProduct from "./components/admin/product/CreateProduct.jsx";
import TableProduct from "./components/admin/product/TableProduct.jsx";
import DetailProduct from "./components/admin/product/DetailProduct.jsx";
import DashBoard from "./components/admin/dashboard/Dashboard.jsx";
import UpdateProduct from "./components/admin/product/UpdateProduct.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
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
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashBoard />,
    children: [
      { index: true, element: <TableUser /> },

      // USER
      { path: "table-user", element: <TableUser /> },
      { path: "create-user", element: <CreateUser /> },
      { path: "detail-user", element: <DetailUser /> },
      { path: "update-user", element: <UpdateUser /> },

      // PRODUCT
      { path: "table-product", element: <TableProduct /> },
      { path: "create-product", element: <CreateProduct /> },
      { path: "detail-product", element: <DetailProduct /> },
      { path: "update-product", element: <UpdateProduct /> },
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
