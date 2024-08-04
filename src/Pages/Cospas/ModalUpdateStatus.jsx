import React, { useState } from "react";
import { Modal, Button, Table, Input, Select } from "antd";
import { Checks } from "@phosphor-icons/react";
import "../../Assets/styles/theme/antd.css";
const { Option } = Select;
const ModalUpdateStatus = ({ onOpen, onClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [selectedValue, setSelectedValue] = useState("status1");
  const [selectedColor, setSelectedColor] = useState("red");
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSelectChange = (value, option) => {
    setSelectedValue(value);
    console.log(option.style.color)
    setSelectedColor(option.style.color);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const columns = [
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      style: {
        background: "#f0f0f0", // Màu nền
        color: "blue", // Màu chữ
      },
    },
    {
      title: "Nội dung xử lý",
      dataIndex: "content",
      key: "content",
      width: 600,
      align: "center",
      style: {
        background: "#f0f0f0", // Màu nền
        color: "blue", // Màu chữ
      },

      //   render: () => (
      //     <Input.TextArea
      //       value={content}
      //       onChange={handleContentChange}
      //       placeholder="Nội dung xử lý"
      //     />
      //   ),
    },
    {
      title: "T/g CN",
      dataIndex: "time",
      key: "time",
      width: 120,
      align: "center",
      style: {
        background: "#f0f0f0", // Màu nền
        color: "blue", // Màu chữ
      },
    },
    {
      title: "Người CN",
      dataIndex: "person",
      key: "person",
      align: "center",
      style: {
        background: "#f0f0f0", // Màu nền
        color: "blue", // Màu chữ
      },
    },
  ];

  const data = [
    {
      key: "1",
      status: "",
      content: content,
      time: "",
      person: "",
    },
  ];

  return (
    <>
      <Modal
        title="Cập nhật thông tin xử lý trạng thái phao"
        visible={onOpen}
        onOpen={handleOk}
        onCancel={onClose}
        width={1000}
        footer={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Select
              defaultValue="status1"
              value={selectedValue}
              onChange={handleSelectChange}
              style={{
                minWidth: "60%",
                textAlign: "center",
                backgroundColor: "#f0f0f0", // Màu nền
                color: selectedColor, // Màu chữ
                marginRight: "30px",
            
              }}
              placeholder="Chọn trạng thái"
            >
              <Option value="status1" style={{ color: "red" }}>
                Chưa xử lý
              </Option>
              <Option value="status2" style={{ color: "orange" }}>
                Đang xử lý
              </Option>
              <Option value="status3" style={{ color: "blue" }}>
                Đề nghị Đài xử lý
              </Option>
              <Option value="status4" style={{ color: "green" }}>
                Đã xử lý
              </Option>
            </Select>

            <Button
              type="primary"
              ghost
              onClick={onClose}
              icon={<Checks size={20} />}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Lưu nhật kí xử lý
            </Button>
          </div>
        }
      >
        <div className="container">
          <p>
            <strong>Thông tin trạng thái:</strong> ID: A001 - Chờ xử lý
          </p>
          <p>
            <strong>Hướng xử lý:</strong> Cập nhật thông tin email chủ sở hữu
          </p>
        </div>
        <Table columns={columns} dataSource={data} pagination={false} />
        <Input.TextArea
          value={content}
          onChange={handleContentChange}
          placeholder="Nội dung xử lý"
          rows={4}
        />
      </Modal>
    </>
  );
};

export default ModalUpdateStatus;
