import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { requestRegister } from "../../config/UserRequest";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        date: values.date ? dayjs(values.date).format("DD/MM/YYYY") : "",
      };
      const res = await requestRegister(payload);

      message.success("Đăng kí thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/login");
    } catch (error) {
      const msg = error?.response?.data?.message;

      if (msg === "Email đã tồn tại") {
        form.setFields([{ name: "email", errors: [msg] }]);
      }
      message.error(msg || "Đăng kí thất bại");
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
      form={form}
      name="register"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
      >
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>

      <Form.Item
        label="Ngày sinh"
        name="date"
        rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
      >
        <DatePicker
          placeholder="Chọn ngày sinh"
          format="DD/MM/YYYY"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Giới tính"
        name="dob"
        rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
      >
        <Radio.Group>
          <Radio value="male">Nam</Radio>
          <Radio value="female">Nữ</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email" },
          { type: "email", message: "Email không hợp lệ" },
        ]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Đăng kí tài khoản
        </Button>
        <Button
          style={{ marginLeft: 8 }}
          type="dashed"
          onClick={() => navigate("/login")}
        >
          Đăng nhập nếu đã có tài khoản rồi
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterPage;
