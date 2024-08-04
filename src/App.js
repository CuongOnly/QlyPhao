import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import LoaddingSSO from "./Assets/styles/theme/LoaddingSSO";
import ErrorPage from "./Assets/styles/theme/ErrorPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import { themeOptions } from "./Assets/styles/theme/ThemeOptions/ThemeOptions";
import { componentOptions } from "./Assets/styles/theme/ComponentOptions/ComponentOptions";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import viLocale from "date-fns/locale/vi";
import "./Assets/styles/global.css";
import { showError, showWarning } from "./lib/common";
import jwtDecode from "jwt-decode"; // Remove curly braces since jwt-decode doesn't have a default export
import { Helmet } from "react-helmet";

const server = require("./lib/server");
const theme = createTheme({ ...themeOptions, ...componentOptions });

export default function App() {
  const [isLoadingUserAD, setIsLoadingUserAD] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingUserAD(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        locale={viLocale}
        style={{ height: "100vh" }}
      >
        {isLoadingUserAD ? (
          <div
            style={{
              height: "100vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Helmet>
              <title>Đăng ký phao</title>
            </Helmet>
            <LoaddingSSO isLoading={isLoadingUserAD} />
          </div>
        ) : (
          <HomePage />
        )}
        <ToastContainer
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover={false}
          style={{ fontSize: 12, width: 550 }}
          limit={5}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
