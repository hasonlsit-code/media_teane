import React from "react";
import { Button, Checkbox, Form, Input, Divider } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const onFinish = (values) => console.log("Success:", values);
const onFinishFailed = (errorInfo) => console.log("Failed:", errorInfo);

const LoginPage = () => {
  const navigate = useNavigate();
  const handleGoogleAuth = () => {
    // TẠM THỜI: chuyển sang route backend để bắt đầu Google OAuth
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
      >
        <Input placeholder="Tên đăng nhập" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" label={null}>
        <Checkbox>Nhớ mật khẩu</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
        <Button onClick={() => navigate("/register")}>Đăng kí tài khoản</Button>
        <Divider plain>hoặc</Divider>

        <Button icon={<GoogleOutlined />} onClick={handleGoogleAuth} block>
          Tiếp tục với Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
