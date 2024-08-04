import React from 'react';
import { Menu, Dropdown, Button, Space, Popover } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, CompassOutlined } from '@ant-design/icons';

const handleMenuClick = (e) => {
  switch (e.key) {
    case '1':
      break;
    case '2':
      break;
    case '3':
      break;
    case '4':
      break;
    default:
      break;
  }
};
const handleClosePM = () => {
  localStorage.removeItem("accessTokenSSO");
  localStorage.removeItem("Username");
  window.localStorage.setItem(window.JwtTokenTag, "");
  localStorage.removeItem("ssoState");
  localStorage.removeItem("ServerVersion");
  window.location.href = "https://ssoadmin.vishipel.vn/oidc/logout";
};
const menu = (
  <Menu onClick={handleMenuClick} style={{ width: "160px", fontSize: "14px", padding:0 }}>
  <Menu.Item key="1">
    <UserOutlined style={{ marginRight: "10px" }} /> ndcuong
  </Menu.Item>
  <Menu.Item key="2">
    <SettingOutlined style={{ marginRight: "10px" }} /> Setting
  </Menu.Item>
  <Menu.Item key="3">
    <CompassOutlined style={{ marginRight: "10px" }} /> Đổi mật khẩu
  </Menu.Item>
  <Menu.Item key="4" onClick={handleClosePM}>
    <LogoutOutlined  style={{ marginRight: "10px" }} /> Thoát
  </Menu.Item>
</Menu>
);

const MenuAccountAnt = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
      <Popover arrow={{ pointAtCenter: true }} content={menu} trigger={['click']} placement="bottomRight">
      <span style={{cursor:"pointer" ,fontWeight:600, color:"white"}}><UserOutlined style={{fontSize:"18px"}}/> ndcuong</span>
        </Popover>
      </Space>
    </Space>
  );
};

export default MenuAccountAnt;
