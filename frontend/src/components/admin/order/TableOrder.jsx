import React, { useEffect, useState } from "react";
import {
  Table, Button, Tag, Space, Modal, Select, Input, message, Form, Flex, Descriptions, Divider,
} from "antd";
import { PrinterOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getOrdersAdmin, updateOrderStatus, getShippingLabel } from "../../../config/SellerRequest";

const { Option } = Select;
const { TextArea } = Input;

const STATUS_COLOR = {
  pending: "orange",
  confirmed: "blue",
  delivered: "cyan",
  completed: "green",
  cancelled: "red",
};

const STATUS_LABEL = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  delivered: "Đang giao",
  completed: "Hoàn thành",
  cancelled: "Đã huỷ",
};

const NEXT_STATUS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["delivered", "cancelled"],
  delivered: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

const TableOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit status
  const [editOpen, setEditOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Shipping label modal
  const [shippingOpen, setShippingOpen] = useState(false);
  const [shippingData, setShippingData] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getOrdersAdmin();
      const raw = res?.metadata || [];
      setOrders(raw.map((o) => ({ ...o, key: o._id })));
    } catch {
      message.error("Không tải được danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const openEdit = (order) => {
    setEditingOrder(order);
    setSelectedStatus(order.status);
    setEditOpen(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedStatus) return message.warning("Vui lòng chọn trạng thái");
    setEditLoading(true);
    try {
      await updateOrderStatus(editingOrder._id, selectedStatus);
      message.success("Cập nhật trạng thái thành công");
      setEditOpen(false);
      fetchOrders();
    } catch (err) {
      message.error(err?.response?.data?.message || "Cập nhật thất bại");
    } finally {
      setEditLoading(false);
    }
  };

  const handlePrintShipping = async (orderId) => {
    setShippingLoading(true);
    setShippingOpen(true);
    try {
      const res = await getShippingLabel(orderId);
      setShippingData(res?.metadata || null);
    } catch {
      message.error("Không tải được phiếu vận chuyển");
      setShippingOpen(false);
    } finally {
      setShippingLoading(false);
    }
  };

  const columns = [
    {
      title: "Khách hàng",
      key: "customer",
      render: (_, r) => (
        <div>
          <div style={{ fontWeight: 600 }}>{r.fullName}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{r.phoneNumber}</div>
          <div style={{ fontSize: 12, color: "#888" }}>{r.email}</div>
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      ellipsis: true,
    },
    {
      title: "Sản phẩm",
      key: "products",
      render: (_, r) => (
        <div>
          {(r.products || []).map((p, i) => (
            <div key={i} style={{ fontSize: 12 }}>
              {p.productId?.nameProduct || "Sản phẩm"} × {p.quantity}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      key: "price",
      render: (_, r) => (
        <div style={{ fontWeight: 600, color: "#52c41a" }}>
          {Number(r.finalPrice > 0 ? r.finalPrice : r.totalPrice).toLocaleString("vi-VN")}đ
        </div>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      render: (v) => <Tag>{v?.toUpperCase()}</Tag>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (v) => <Tag color={STATUS_COLOR[v]}>{STATUS_LABEL[v] || v}</Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (v) => dayjs(v).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, r) => (
        <Space direction="vertical" size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={() => openEdit(r)}
            disabled={!NEXT_STATUS[r.status]?.length}
          >
            Cập nhật
          </Button>
          <Button
            size="small"
            icon={<PrinterOutlined />}
            onClick={() => handlePrintShipping(r._id)}
          >
            Phiếu ship
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Quản lý đơn hàng</h2>
        <Button onClick={fetchOrders} loading={loading}>Tải lại</Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
      />

      {/* EDIT STATUS MODAL */}
      <Modal
        title="Cập nhật trạng thái đơn hàng"
        open={editOpen}
        onCancel={() => setEditOpen(false)}
        onOk={handleSaveStatus}
        confirmLoading={editLoading}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <p>
          Trạng thái hiện tại:{" "}
          <Tag color={STATUS_COLOR[editingOrder?.status]}>
            {STATUS_LABEL[editingOrder?.status]}
          </Tag>
        </p>
        <Select
          style={{ width: "100%" }}
          value={selectedStatus}
          onChange={setSelectedStatus}
          placeholder="Chọn trạng thái mới"
        >
          {(NEXT_STATUS[editingOrder?.status] || []).map((s) => (
            <Option key={s} value={s}>
              <Tag color={STATUS_COLOR[s]}>{STATUS_LABEL[s]}</Tag>
            </Option>
          ))}
        </Select>
      </Modal>

      {/* SHIPPING LABEL MODAL */}
      <Modal
        title={<span><PrinterOutlined /> Phiếu vận chuyển (giả lập)</span>}
        open={shippingOpen}
        onCancel={() => { setShippingOpen(false); setShippingData(null); }}
        footer={[
          <Button key="print" type="primary" icon={<PrinterOutlined />} onClick={() => window.print()}>
            In phiếu
          </Button>,
          <Button key="close" onClick={() => { setShippingOpen(false); setShippingData(null); }}>
            Đóng
          </Button>,
        ]}
        width={600}
        loading={shippingLoading}
      >
        {shippingData && (
          <div style={{ fontFamily: "monospace", border: "1px dashed #ccc", padding: 16, borderRadius: 8 }}>
            <div style={{ textAlign: "center", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
              📦 PHIẾU VẬN CHUYỂN
            </div>
            <div style={{ textAlign: "center", marginBottom: 16, color: "#1677ff", fontSize: 14 }}>
              Mã theo dõi: <strong>{shippingData.trackingCode}</strong>
            </div>
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="Người gửi">{shippingData.sender?.name}</Descriptions.Item>
              <Descriptions.Item label="SĐT gửi">{shippingData.sender?.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ gửi">{shippingData.sender?.address}</Descriptions.Item>
              <Descriptions.Item label="Người nhận" style={{ fontWeight: 700 }}>{shippingData.receiver?.name}</Descriptions.Item>
              <Descriptions.Item label="SĐT nhận">{shippingData.receiver?.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ nhận">{shippingData.receiver?.address}</Descriptions.Item>
              <Descriptions.Item label="Ngày giao">
                {dayjs(shippingData.shippingDate).format("DD/MM/YYYY HH:mm")}
              </Descriptions.Item>
              <Descriptions.Item label="Dự kiến nhận">
                {dayjs(shippingData.estimatedDelivery).format("DD/MM/YYYY")}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TableOrder;
