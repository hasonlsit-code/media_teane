import React, { useState } from "react";
import { Form, Input, Button, message, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { requestForgotPassword } from "../../config/UserRequest";

const { Title, Text } = Typography;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Gọi API gửi OTP
      await requestForgotPassword({ email: values.email.trim() });

      message.loading({
        content: "Đang khởi tạo phiên làm việc... Vui lòng đợi 5 giây",
        duration: 5,
      });

      // Đợi đúng 5 giây mới chuyển trang
      setTimeout(() => {
        message.success("Đã sẵn sàng! Hãy nhập mã OTP từ email của bạn.");
        navigate("/reset-password");
      }, 5000);
    } catch (error) {
      const msg = error?.response?.data?.message || "Email không tồn tại!";
      message.error(msg);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card style={{ width: 420, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Quên mật khẩu
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 20 }}
        >
          Nhập email để nhận mã OTP xác thực.
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không đúng định dạng!" },
            ]}
          >
            <Input
              size="large"
              placeholder="example@gmail.com"
              disabled={loading}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
          >
            {loading ? "Đang xử lý..." : "Gửi mã OTP"}
          </Button>

          <Button
            type="link"
            block
            onClick={() => navigate("/login")}
            disabled={loading}
          >
            Quay lại đăng nhập
          </Button>
        </Form>
      </Card>
    </div>
  );
}
