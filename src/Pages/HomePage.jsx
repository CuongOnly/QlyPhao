import { useEffect, useState, lazy, Suspense } from "react";
import "../App.css";
import { Layout, theme, Spin, Breadcrumb } from "antd";
import logo_VSP_new_small from "../Assets/Images/logo_VSP_new_small.png";
import Box from "@mui/material/Box";
import { FormLabel } from "@mui/material";
import MenuAccountCpn from "../components/MenuAccountAnt";
import { Stack } from "@mui/system";
import MenuOutlineCpn from "../components/MenuOutlineAnt";
import { Helmet } from "react-helmet";
import PrintForm from "../components/BoxFormPhao/PrintForm";
import NotificationBell from "../components/BoxFormPhao/NotificationBell";

const server = require("../lib/server");
const { Header, Sider, Content } = Layout;

const BtnPhao = lazy(() => import("./Home/BtnPhao"));
const PhaoSearchPage = lazy(() => import("./QlyPhao/PhaoSearchPage"));

const HomePage = ({}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedQly, setSelectedQly] = useState(false);
  const [selectedHome, setSelectedHome] = useState(false);
  const [openCpnPrint, setOpenCpnPrint] = useState(false);
  const [loading, setLoading] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    setSelectedHome(true);
    const lclCSs = localStorage.getItem("collapsed");
    const collapsedState = lclCSs === "true";
    setCollapsed(collapsedState);
    doTest();
  }, []);

  const doTest = () => {
// nội dung khác
    setLoading(false);
  };

  const handleHomeClick = () => {
    setSelectedHome(true);
    setSelectedQly(false);
  };

  const handleQlyClick = () => {
    setSelectedQly(true);
    setSelectedHome(false);
  };

  return (
    <Layout>
      <Box
        component="header"
        sx={{
          borderBottom: "1px solid var(--bg-color-header)",
          backgroundColor: "var(--bg-color-header)",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            height: "45px",
            px: 5,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <a href={window.location.href}>
              <img width="120px" src={logo_VSP_new_small} alt="logo" />
            </a>
            <FormLabel
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#ffffff",
                fontFamily: "Quicksand, sans-serif",
              }}
            >
              Đài Thông tin Vệ tinh Mặt đất Cospas-Sarsat Việt Nam
            </FormLabel>
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              padding: "30px",
              "& > *:not(:last-child)": {
                marginRight: "18px",
              },
            }}
            direction="row"
            spacing={2}
          >
            <MenuOutlineCpn
              handleClickHome={handleHomeClick}
              handleClickQly={handleQlyClick}
            />
            <NotificationBell />
            <MenuAccountCpn />
          </Stack>
        </Stack>
      </Box>

      <Content
        style={{
          margin: "0px",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          backgroundColor: "rgb(245, 245, 245)",
        }}
      >
        <div style={{ borderBottom: "1px solid rgb(221 221 221)" }}>
          <Breadcrumb style={{ margin: "8px 8px 8px 8px" }}>
            <Breadcrumb.Item>
              {selectedQly ? "Quản lý danh sách phao" : "Đăng ký phao"}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <main style={{ height: "calc(100vh - 86px)" }}>
          <Suspense
            fallback={
              <Spin
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              />
            }
          >
            {loading ? (
              <Spin
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              />
            ) : (
              <>
                {selectedHome ? (
                  <>
                    <Helmet>
                      <title>Đăng ký phao</title>
                    </Helmet>
                    <BtnPhao />
                  </>
                ) : null}
              </>
            )}
            {selectedQly && (
              <>
                <Helmet>
                  <title>Quản lý danh sách phao</title>
                </Helmet>
                <PhaoSearchPage 
                handleHomeClick = {handleHomeClick}
                />
              
              </>
            )}

            
          </Suspense>
        </main>
      </Content>
      {openCpnPrint && (
              <>
              <PrintForm />
              </>
            )}
    </Layout>
  );
};

export default HomePage;
