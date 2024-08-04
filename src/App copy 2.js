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
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";

const server = require("./lib/server");
const theme = createTheme({ ...themeOptions, ...componentOptions });

export default function App() {
  const [valueJWT, setValueJWT] = useState(null);
  const [showVersion, setShowVersion] = useState(false);
  const [isLoadingUserAD, setIsLoadingUserAD] = useState(true);
  const [isPageError, setIsPageError] = useState(false);
  const requestAccessTokenSSO = (code, sessionState, clientId, redirectUri) => {
    const details = {
      code: code,
      sessionState: sessionState,
      client_id: clientId,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://ssoadmin.vishipel.vn/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((res) => {
        if (res.ok) return res.json();
        else {
          return res.text().then((textLog) => {
            return Promise.reject(
              JSON.stringify({
                code: res.status,
                message: "Server error: " + res.statusText,
                traceLog: textLog,
              })
            );
          });
        }
      })
      .then((result) => {
        var accessTokenSSO = result.access_token;
        const decoded = jwtDecode(accessTokenSSO);
        localStorage.setItem("UsernameSSO", decoded.username);
        localStorage.setItem("accessTokenSSO", accessTokenSSO);
        sessionStorage.setItem("accessTokenSSO", accessTokenSSO);
        requestLogin();
      })
      .catch((error) => {
        showError(error);
      });
  };

  const requestLogin = () => {
    let usernameToUse = localStorage.getItem("UsernameSSO");
    let tokenSSO = localStorage.getItem("accessTokenSSO");
    if (usernameToUse && tokenSSO) {
      var values = {
        UserName: usernameToUse,
        Password: tokenSSO,
      };

      server
        .post("userad/loginsso", values)
        // .post("UserAD/LoginSSO" , values)
        .then((response) => {
          setValueJWT(response);
          server.saveToken(response.JWT);
          setIsLoadingUserAD(false);
        })
        .catch((error) => {
          setIsPageError(true);
          setIsLoadingUserAD(false);
        });
    } else {
      server.loginByUrlSSO();
      requestAccessTokenSSO();
      showWarning("Kiểm tra tham số lấy tokenSSO");
    }
  };

  var versionChecked = false;
  useEffect(() => {
    const accessTokenSSO = localStorage.getItem("accessTokenSSO");
    const urlParams = new URLSearchParams(window.location.search); // url hiện tại, search lấy sau gtr sau "?"
    // window.history.replaceState({}, '', "/"); // xóa params sau

    const code = urlParams.get("code");
    const sessionState = urlParams.get("session_state");
    const clientId = window.ssoConfig.clientID;
    const redirectUri = window.ssoConfig.signInRedirectURL;
    const urlWithoutParams = window.location.origin + window.location.pathname;
    window.history.replaceState("/phanmem", "", urlWithoutParams);
    if (!versionChecked) {
      server
        .getUrl("/phanmem/version.txt")
        // .getUrl("http://localhost:3010/phanmem/" + "version.txt")
        .then((response) => {
          versionChecked = true;
          if (response !== window.myconfig.SPAVersion) {
            window.myconfig.ServerVersion = response;
            setShowVersion(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (
      code !== "" &&
      sessionState !== "" &&
      code !== null &&
      sessionState !== null
    ) {
      requestAccessTokenSSO(code, sessionState, clientId, redirectUri);
    } else {
      if (accessTokenSSO === null || accessTokenSSO === "") {
        server.loginByUrlSSO();
      } else {
        requestLogin();
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        locale={viLocale}
        style={{ height: "100vh" }}
      >
        {/* {showVersion ? (
        <div
          style={{
            backgroundColor: "yellow",
            color: "white",
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 10000,
          }}  
        >
          <a href="#" onClick={() => window.location.reload(true)}>
            Click here to update version {window.myconfig.ServerVersion}
          </a>
        </div>
      ) : null} */}
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
          valueJWT && <HomePage JwtToken={valueJWT} />
        )}
        {isPageError && !valueJWT ? <ErrorPage /> : null}
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
