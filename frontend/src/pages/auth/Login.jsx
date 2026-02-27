import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Divider, message } from "antd";
import { GoogleOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { requestLogin, requestLoginGoogle } from "../../config/UserRequest";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    try {
      // 1. Lấy token từ Google
      const { credential } = credentialResponse;

      // 2. Gọi API Backend (Bạn cần định nghĩa requestLoginGoogle trong UserRequest.js)
      // Backend của bạn đang nhận { token } qua req.body
      const res = await requestLoginGoogle({ token: credential });

      message.success("Đăng nhập Google thành công!");

      // Lưu thông tin user/token vào localStorage hoặc Context tùy dự án của bạn
      // Sau đó chuyển hướng
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Google Login Error:", error);
      message.error(
        error?.response?.data?.message || "Đăng nhập Google thất bại!",
      );
    } finally {
      setLoading(false);
    }
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
        <GoogleOAuthProvider>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => message.error("Không đăng nhập được với google")}
          />
          ;
        </GoogleOAuthProvider>
        ;
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
