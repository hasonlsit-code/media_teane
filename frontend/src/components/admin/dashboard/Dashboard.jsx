import React, { useEffect, useMemo, useState } from "react";
import {
  Layout, Menu, theme, Avatar, Space, Button, Typography,
} from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";
import {
  HomeOutlined, UserOutlined, ShopOutlined, ShoppingOutlined,
  AppstoreOutlined, TagOutlined, StarOutlined, MessageOutlined,
  ExclamationCircleOutlined, BarChartOutlined, GiftOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

const DashBoard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKey = location.pathname.split("/")[2] || "table-user";

  const items = useMemo(
    () => [
      {
        key: "store-group",
        label: "Cửa hàng",
        icon: <ShopOutlined />,
        children: [
          { label: "Hồ sơ cửa hàng", key: "store-profile" },
        ],
      },
      {
        key: "user-group",
        label: "Người dùng",
        icon: <UserOutlined />,
        children: [
          { label: "Danh sách User", key: "table-user" },
        ],
      },
      {
        key: "product-group",
        label: "Sản phẩm",
        icon: <AppstoreOutlined />,
        children: [
          { label: "Danh sách SP", key: "table-product" },
        ],
      },
      {
        key: "category-group",
        label: "Danh mục",
        icon: <TagOutlined />,
        children: [
          { label: "Danh sách DM", key: "table-category" },
        ],
      },
      {
        key: "order-group",
        label: "Đơn hàng",
        icon: <ShoppingOutlined />,
        children: [
          { label: "Quản lý đơn hàng", key: "table-order" },
        ],
      },
      {
        key: "coupon-group",
        label: "Mã giảm giá",
        icon: <GiftOutlined />,
        children: [
          { label: "Danh sách Coupon", key: "table-coupon" },
        ],
      },
      {
        key: "review-group",
        label: "Đánh giá",
        icon: <StarOutlined />,
        children: [
          { label: "Đánh giá SP", key: "table-review" },
        ],
      },
      {
        key: "feedback-group",
        label: "Phản hồi",
        icon: <MessageOutlined />,
        children: [
          { label: "Phản hồi KH", key: "table-feedback" },
        ],
      },
      {
        key: "complaint-group",
        label: "Khiếu nại",
        icon: <ExclamationCircleOutlined />,
        children: [
          { label: "Khiếu nại", key: "table-complaint" },
        ],
      },
      {
        key: "report-group",
        label: "Báo cáo",
        icon: <BarChartOutlined />,
        children: [
          { label: "Doanh số", key: "sales-report" },
        ],
      },
    ],
    [],
  );

  const openKey = useMemo(() => {
    if (selectedKey.includes("store")) return ["store-group"];
    if (selectedKey.includes("user")) return ["user-group"];
    if (selectedKey.includes("product")) return ["product-group"];
    if (selectedKey.includes("category")) return ["category-group"];
    if (selectedKey.includes("order")) return ["order-group"];
    if (selectedKey.includes("coupon")) return ["coupon-group"];
    if (selectedKey.includes("review")) return ["review-group"];
    if (selectedKey.includes("feedback")) return ["feedback-group"];
    if (selectedKey.includes("complaint")) return ["complaint-group"];
    if (selectedKey.includes("report")) return ["report-group"];
    return ["user-group"];
  }, [selectedKey]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="admin-logo">{!collapsed && <span>MediTea Admin</span>}</div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
          defaultOpenKeys={openKey}
          onClick={({ key }) => navigate(`/admin/${key}`)}
        />
      </Sider>

      <Layout>
        <Header className="admin-header" style={{ background: colorBgContainer }}>
          <div className="admin-header__left">
            <Space size="middle">
              <Avatar
                size={40}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1677ff" }}
              />
              <div className="admin-header__welcome">
                <Text type="secondary" style={{ fontSize: 12 }}>Xin chào,</Text>
                <Text strong style={{ fontSize: 15, display: "block", lineHeight: 1.2 }}>
                  {user?.fullName || "Admin"}
                </Text>
              </div>
            </Space>
          </div>
          <div className="admin-header__right">
            <Button type="default" icon={<HomeOutlined />} onClick={() => navigate("/")}>
              Trang chủ
            </Button>
          </div>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: 16,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>MediTea Admin © 2025</Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
