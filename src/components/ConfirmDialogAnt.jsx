import React from "react";
import { Modal, Button, Input, Spin, Row, Col, Typography, Progress } from "antd";
const { TextArea } = Input;
const { Title } = Typography;

export default function ConfirmDialogAnt({
  handleDeleteConfirmed,
  dataRow,
  onOpenConfirm,
  onCloseDialog,
  content,
  title,
  isDeleting,
  onConfirmSave
}) {
  return (
    <Modal
      title={
        <div
          style={{
            cursor: "move",
            backgroundColor: "#75829B",
            color: "white",
            padding: "5px 10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </div>
      }
      visible={onOpenConfirm}
      onCancel={onCloseDialog}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={isDeleting}
          onClick={!isDeleting && handleDeleteConfirmed ? handleDeleteConfirmed : onOpenConfirm}
        >
          {isDeleting ? "Đang xử lý" : "Xác nhận"}
        </Button>,
        <Button key="back" onClick={!isDeleting ? onCloseDialog : null}>
          Đóng
        </Button>
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minWidth: 450,
            minHeight: 30,
            padding: 5,
            fontSize: 10,
            wordWrap: "break-word",
          }}
        >
          <TextArea value={content} readOnly autoSize={{ minRows: 3, maxRows: 6 }} />
          {/* <span>{dataRow.MaPhanMem}</span> */}
        </div>
      </div>
      {isDeleting ? <Progress percent={100} status="active" showInfo={false} /> : null}
    </Modal>
  );
}
