import React from 'react';
import { Menu, Dropdown, Button, Space, Popover } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, CompassOutlined, BellOutlined } from '@ant-design/icons';

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
  <Menu onClick={handleMenuClick} style={{ width: "280px", fontSize: "14px", padding:0 }}>
  <Menu.Item key="1">
    Thông tin sửa nội dung
  </Menu.Item>
  <Menu.Item key="2">
    
  </Menu.Item>
  <Menu.Item key="3">
    
  </Menu.Item>
  <Menu.Item key="4" >
    
  </Menu.Item>
</Menu>
);

const NotificationBell = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
      <Popover arrow={{ pointAtCenter: true }} content={menu} trigger={['click']} placement="bottomRight">
      <span style={{cursor:"pointer" ,fontWeight:600, color:"white"}}><BellOutlined  style={{fontSize:"18px"}}/></span>
        </Popover>
      </Space>
    </Space>
  );
};

export default NotificationBell;
