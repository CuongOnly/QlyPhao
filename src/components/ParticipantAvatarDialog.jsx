import React, { useState } from "react";
import { Avatar, Modal, Tooltip, List } from "antd";
import { Dialog } from "@mui/material";
import { UserOutlined } from "@ant-design/icons";

const ParticipantAvatarDialog = ({ participants }) => {
  const [visible, setVisible] = useState(false);

  const handleOpenDialog = () => {
    setVisible(true);
  };

  const handleCloseDialog = () => {
    setVisible(false);
  };

  return (
    <>
      <Avatar.Group
        onClick={handleOpenDialog}
        maxCount={3}
        // maxPopoverTrigger="click"
        size="large"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
          cursor: "pointer",
          height: "25px",
          width: "25px",
        }}
      >
        {participants.map((participant, index) => (
          <Tooltip title={participant} placement="top" key={index}>
            <Avatar
              style={{
                width: "25px",
                height: "25px",
                backgroundColor: "rgb(132 151 178)",
              }}
              onClick={handleOpenDialog}
            >
              <UserOutlined />
            </Avatar>
          </Tooltip>
        ))}
      </Avatar.Group>
      <Modal
        title="Participant List"
        visible={visible}
        onCancel={handleCloseDialog}
        footer={null}
      >
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <List
            style={{
              maxWidth: "600px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            dataSource={participants}
            renderItem={(participant, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignItems: "center",
                    height: "20px",
                    
                  }}
                  avatar={<Avatar icon={<UserOutlined color="#00B4ED" />} />}
                  title={
                    <p style={{ fontSize: "12px" }}>
                      <span style={{ color: "#00B4ED"}}>
                        {participant} 
                      </span>
                      <br />
                      <div style={{fontWeight: "normal"}}>
                      <span> Phòng NCPT</span>
                      <span>- Chuyên viên</span>
                      </div>
                    </p>
                  }
                  description={participant.description}
                />
              </List.Item>
            )}
            scrollbar={{
              vertical: "hidden",
              horizontal: "3px",
              thumbStyle: { backgroundColor: "yellow" },
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ParticipantAvatarDialog;
