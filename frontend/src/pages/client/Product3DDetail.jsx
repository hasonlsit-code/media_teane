import React, { Suspense, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, Html } from "@react-three/drei";
import { Button, Spin, Typography, Select, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { MODELS_3D } from "../../data/models3d";

const { Title, Text } = Typography;

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Product3DDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedModelId, setSelectedModelId] = useState(id || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Try to find model by id, if not found use the provided id or first model
  let modelData = MODELS_3D.find((m) => m.id === selectedModelId);
  
  // If model not found, use first model as fallback
  if (!modelData && MODELS_3D.length > 0) {
    modelData = MODELS_3D[0];
  }

  if (!modelData) {
    return (
      <div
        style={{ padding: "100px 5%", textAlign: "center", minHeight: "70vh" }}
      >
        <Title level={3}>Không có mô hình 3D khả dụng</Title>
        <Button type="primary" onClick={() => navigate("/shop")}>
          Quay lại sản phẩm
        </Button>
      </div>
    );
  }

  const modelUrl = `/3D/${modelData.file}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "none",
          padding: "15px 5%",
          background: "#fff",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          zIndex: 10,
        }}
      >
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            type="text"
          >
            Quay lại
          </Button>
          <Title level={4} style={{ margin: 0 }}>
            {modelData.title}
          </Title>
        </Space>
        
        {MODELS_3D.length > 1 && (
          <Select
            style={{ width: 200 }}
            value={selectedModelId}
            onChange={setSelectedModelId}
            options={MODELS_3D.map((m) => ({
              label: m.title,
              value: m.id,
            }))}
            placeholder="Chọn mô hình"
          />
        )}
      </div>

      {/* 3D Canvas Container */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense
            fallback={
              <Html center>
                <div style={{ textAlign: "center" }}>
                  <Spin size="large" />
                  <div style={{ marginTop: 10 }}>Đang tải môi trường 3D...</div>
                </div>
              </Html>
            }
          >
            <Stage environment="city" intensity={0.5}>
              <Model key={modelUrl} url={modelUrl} />
            </Stage>
          </Suspense>
          <OrbitControls
            autoRotate
            autoRotateSpeed={2}
            enableZoom={true}
            makeDefault
          />
        </Canvas>

        {/* Overlay Info */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            left: "0",
            right: "0",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255, 255, 255, 0.9)",
              padding: "15px 25px",
              borderRadius: "12px",
              pointerEvents: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Text
              strong
              style={{
                fontSize: "16px",
                display: "block",
                marginBottom: "5px",
              }}
            >
              Góc nhìn 360°
            </Text>
            <Text type="secondary">
              Dùng chuột để xoay & cuộn để thu phóng chi tiết
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
