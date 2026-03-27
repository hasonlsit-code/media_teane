import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import RegisterPage from "./pages/auth/Register.jsx";
import enUS from "antd/locale/en_US";

import LoginPage from "./pages/auth/Login.jsx";
import { ConfigProvider } from "antd";

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
import Story from "./components/about-us/Story.jsx";
import Philosophy from "./components/about-us/Story-3.jsx";
import Original from "./components/about-us/Story-2.jsx";
import AdminRoute from "./routes/AdminRoutes.jsx";
import TableCategory from "./components/admin/category/TableCategory.jsx";
import CreateCategory from "./components/admin/category/CreateCategory.jsx";
import UpdateCategory from "./components/admin/category/UpdateCategory.jsx";
import DetailCategory from "./components/admin/category/DetailCategory.jsx";
import Products3DList from "./pages/client/Products3DList.jsx";
import Product3DDetail from "./pages/client/Product3DDetail.jsx";
import TableCoupon from "./components/admin/coupon/TableCoupon.jsx";
import TableOrder from "./components/admin/order/TableOrder.jsx";
import TeaMixerBoard from "./components/game/TeaMixerBoard.jsx";
import ProductPage from "./pages/client/ProductPage.jsx";
import Cart from "./pages/cart/EbayCart.jsx";
import Checkout from "./pages/cart/Checkout.jsx";
import PaymentSuccess from "./pages/cart/PaymentSuccess.jsx";
import Homepage from "./components/HomePage.jsx";
import AboutPage from "./pages/client/AboutPage.jsx";
import BanchaPage from "./pages/client/BanchaPage.jsx";
import ProductMain from "./components/homepage/ProductMain.jsx";
import ProductList from "./components/homepage/ProductList.jsx";

import StoreProfile from "./components/admin/store/StoreProfile.jsx";
import TableReview from "./components/admin/review/TableReview.jsx";
import TableFeedback from "./components/admin/feedback/TableFeedback.jsx";
import TableComplaint from "./components/admin/complaint/TableComplaint.jsx";
import SalesReport from "./components/admin/report/SalesReport.jsx";
import MyOrders from "./pages/client/MyOrders.jsx";
import MyFeedback from "./pages/client/MyFeedback.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "bancha-detail", element: <BanchaPage /> },
      { path: "product-main", element: <ProductMain /> },
      { path: "product-list", element: <ProductList /> },
      { path: "shop", element: <Shop /> },
      { path: "story", element: <Story /> },
      { path: "story-3", element: <Original /> },
      { path: "story-2", element: <Philosophy /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "payment-success/:orderId", element: <PaymentSuccess /> },
      { path: "orders", element: <MyOrders /> },
      { path: "my-feedback", element: <MyFeedback /> },
      { path: "/3d-products", element: <Products3DList /> },
      { path: "/3d-products/:id", element: <Product3DDetail /> },
      { path: "/tea-mixer", element: <TeaMixerBoard /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  {
    element: <AdminRoute />,
    children: [
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

          // CATEGORY
          { path: "table-category", element: <TableCategory /> },
          { path: "create-category", element: <CreateCategory /> },
          { path: "detail-category", element: <DetailCategory /> },
          { path: "update-category", element: <UpdateCategory /> },

          // COUPON
          { path: "table-coupon", element: <TableCoupon /> },

          // ORDER
          { path: "table-order", element: <TableOrder /> },

          // STORE PROFILE
          { path: "store-profile", element: <StoreProfile /> },

          // REVIEW
          { path: "table-review", element: <TableReview /> },

          // FEEDBACK
          { path: "table-feedback", element: <TableFeedback /> },

          // COMPLAINT
          { path: "table-complaint", element: <TableComplaint /> },

          // SALES REPORT
          { path: "sales-report", element: <SalesReport /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider locale={enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>,
);
