import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";

import { DatePicker } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { requestRegister } from "../../config/UserRequest";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await requestRegister(values);
      message.success("Đăng kí thành công!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      navigate("/");
    } catch (error) {
      message.error(error.response?.data?.message || "Đăng kí thất bại");
      console.log("Register error", error);
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
        name="gender"
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
        rules={[{ required: true, message: "Vui lòng nhập email" }]}
      >
        <Input placeholder="Nhập email" type="email" />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Đăng kí tài khoản
        </Button>
        <Button type="dashed" onClick={() => navigate("/login")}>
          Đăng nhập nếu đã có tài khoản rồi
        </Button>
      </Form.Item>
    </Form>
  );
};
export default RegisterPage;
