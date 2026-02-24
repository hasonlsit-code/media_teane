import React from "react";
import { Button, Form, Input, Radio } from "antd";

import { DatePicker } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
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
        name="fullname"
        rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
      >
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>

      <Form.Item
        label="Ngày sinh"
        name="dob"
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
        label="Số điện thoại di động hoặc email"
        name="email"
        rules={[{ required: true, message: "Vui lòng nhập email" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
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
