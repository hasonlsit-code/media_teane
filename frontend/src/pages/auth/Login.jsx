import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Divider, message } from "antd";
import { GoogleOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { requestLogin } from "../../config/UserRequest";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleGoogleAuth = () => {
    // TẠM THỜI: chuyển sang route backend để bắt đầu Google OAuth
    window.location.href = "http://localhost:5000/auth/google";
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await requestLogin(values);
      message.success("Đăng nhập thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      navigate("/");
    } catch (error) {
      message.error("Vui lòng đăng nhập lại !");
      // message.error(error.response.data.message);
      console.log("Login error", error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Vui lòng kiểm tra lại thông tin!");
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="login"
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
        name="email"
        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
      >
        <Input placeholder="Tên đăng nhập" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-gray-400" />}
          placeholder="••••••••"
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Nhớ mật khẩu</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button
          type="link"
          htmlType="button"
          onClick={() => navigate("/forgot-password")}
        >
          Quên mật khẩu?
        </Button>

        <Button type="primary" htmlType="submit" block loading={loading}>
          Đăng nhập
        </Button>

        <Button
          htmlType="button"
          block
          onClick={() => navigate("/register")}
          style={{ marginTop: 8 }}
        >
          Đăng kí tài khoản
        </Button>

        <Divider plain>hoặc</Divider>

        <Button
          htmlType="button"
          icon={<GoogleOutlined />}
          onClick={handleGoogleAuth}
          block
        >
          Tiếp tục với Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
