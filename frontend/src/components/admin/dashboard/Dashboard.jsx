import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Breadcrumb, theme, Avatar, Space, Button, Typography } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./dashboard.css";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
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
      if (stored) {
        setUser(JSON.parse(stored));
      }
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
        key: "user",
        label: "User",
        children: [
          { label: "Table User", key: "table-user" },
          // { label: "Create User", key: "create-user" },
          // { label: "Detail User", key: "detail-user" },
          // { label: "Update User", key: "update-user" },
        ],
      },
      {
        key: "product",
        label: "Product",
        children: [
          { label: "Table Product", key: "table-product" },
          // { label: "Create Product", key: "create-product" },
          // { label: "Detail Product", key: "detail-product" },
          // { label: "Update Product", key: "update-product" },
        ],
      },
      {
        key: "category",
        label: "Category",
        children: [
          { label: "Table Category", key: "table-category" },
          // { label: "Create Category", key: "create-category" },
          // { label: "Detail Category", key: "detail-category" },
          // { label: "Update Category", key: "update-category" },
        ],
      },
      {
        key: "coupon",
        label: "Coupon",
        children: [{ label: "Tabel Coupon", key: "table-coupon" }],
      },
      {
        key: "order",
        label: "Order",
        children: [{ label: "Tabel Coupon", key: "table-order" }],
      },
      {
        key: "Dashboard",
        label: "Dashboard",
        children: [{ label: "Dashboard", key: "table-order" }],
      },
    ],
    [],
  );

  const openKey = useMemo(() => {
    if (selectedKey.includes("user")) return ["user"];
    if (selectedKey.includes("product")) return ["product"];
    return ["user"];
  }, [selectedKey]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="admin-logo">{!collapsed && <span>Admin</span>}</div>

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
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Xin chào,
                </Text>
                <Text strong style={{ fontSize: 15, display: "block", lineHeight: 1.2 }}>
                  {user?.fullName || "Admin"}
                </Text>
              </div>
            </Space>
          </div>
          <div className="admin-header__right">
            <Button
              type="default"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
            >
              Trang chủ
            </Button>
          </div>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedKey}</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>MediTea xin chào</Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
