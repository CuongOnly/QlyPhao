import React from "react";
import { Menu, Dropdown, Space } from "antd";
import { MenuFoldOutlined, DatabaseOutlined, HomeOutlined } from "@ant-design/icons";

const MenuAccountAnt = ({ handleClickQly, handleClickHome }) => {
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        handleClickQly();
        break;
      case "2":
        handleClickHome();
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item style={{height:"60px"}} key="1" icon={<DatabaseOutlined style={{fontSize:"18px"}} type="user" />}>
      Quản lý Phao
    </Menu.Item>
    <Menu.Item style={{height:"60px"}} key="2" icon={<HomeOutlined style={{fontSize:"18px"}} type="home" />}>
      Đăng ký Phao
    </Menu.Item>
    </Menu>
  );

  return (
    <Space direction="vertical">
      <Space wrap>
        <Dropdown
          arrow={{ pointAtCenter: true }}
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <span style={{ cursor: "pointer", fontWeight: 600, color: "white" }}>
            <MenuFoldOutlined style={{ fontSize: "22px" }} /> 
          </span>
        </Dropdown>
      </Space>
    </Space>
  );
};

export default MenuAccountAnt;
