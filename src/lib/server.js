//import FileSaver from "file-saver";
//import config from "../config.json";

import { jwtDecode } from "jwt-decode";

import moment from "moment";

String.prototype.replaceAll = function (find, replace) {
  var str = this;
  return str.replace(new RegExp(find, "g"), replace);
};
//Override output UTC mac dinh cua trinh duyet
Date.prototype.toJSON = function () {
  // console.log(this, ";", moment(this).format("YYYY-MM-DDTHH:mm:ss"));
  return moment(this).format("YYYY-MM-DDTHH:mm:ss");
};
global.SPAVersion = "1.0.6";
global.LocalLogin = true;

global.User = {
  MaKVDK: 1,
  MaCQDK: 1,
};
global.grid_columns = {};
//kiem tra xem user co quyen khong
global.hasRoles = (roles) => {
  var ps = roles.split(";");
  var has = false;
  if (global.User.Roles !== undefined && global.User.Roles !== null) {
    ps.map((item, index) => {
      var exists = false;
      item = item.indexOf(".") >= 0 ? item : window.SoftCode + "." + item;
      global.User.Roles.map((r, i) => {
        exists = exists || r === item || r === "Admin" || r === "System"; //neu co quyen admin, system thi ok luon
      });
      has = has || exists;
    });
  }
  return has;
};
//dia chi phan dich vu cong
export function getPortalServer() {
  return window.myconfig.SERVER_PORTAL;
}
export function getServer() {
  return window.myconfig.SERVER;
}
function getToken() {
  var jwt = window.localStorage.getItem(window.JwtTokenTag);
  if (!jwt) {
    jwt = window.sessionStorage.getItem(window.JwtTokenTag);
  }
  return jwt;
}

// sửa khi gặp lỗi error 401
export function loginByUrlSSOError401(error401) {
  const clientId = window.ssoConfig.clientID;
  const redirectUri = window.ssoConfig.signInRedirectURL;
  const scope = window.ssoConfig.scope;

  // const ssoUrl = `https://ssoadmin.vishipel.vn/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  const ssoUrl = `https://ssoadmin.vishipel.vn/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid email custom_scope`;
  const urlParams = new URLSearchParams(window.location.search);

  const code = urlParams.get("code");
  const sessionState = urlParams.get("session_state");

  // Không có "code" từ SSO thì gọi lại URL SSO
  window.location.href = ssoUrl;
}

export function loginByUrlSSO() {
  const clientId = window.ssoConfig.clientID;
  const redirectUri = window.ssoConfig.signInRedirectURL;
  const ssoUrl = `https://ssoadmin.vishipel.vn/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid email custom_scope`;
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const sessionState = urlParams.get("session_state");
  if (!code && !sessionState) {
    // Không có "code" từ SSO thì gọi lại URL SSO
    window.location.href = ssoUrl;
  } 
}

// so sánh giây hiện tại với token time kết thúc
function getTokenSSO() {
  var jwt = window.localStorage.getItem("accessTokenSSO");
  var date = new Date();
  if(jwt !== "" && jwt !== undefined && jwt !== null){
    var decoded = jwtDecode(jwt);
    if( decoded.exp <= (date.getTime() / 1000) ){
      loginByUrlSSO();
    }
  }
  return jwt;
}

export function saveToken(token) {
  window.localStorage.setItem(window.JwtTokenTag, token);
  window.sessionStorage.setItem(window.JwtTokenTag, token);
}
export function getRequest(rq) {
  // return window.myconfig.SERVER_CONGTY + rq;
  return window.myconfig.SERVER_URL + rq;
}
//kiem tra va lay thong tin tu response

function checkResponse(response) {
  if (response.status === 505) {
    window.location.reload(true);
  }
  if (response.status === 401) {
    loginByUrlSSOError401(true);
  }
}
export function getUrl(rq) {
  var requestOptions = {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache",
    },
  };
  //thong tin token key
  return fetch(rq, requestOptions)
    .then((res) => {
      return res.text();
    })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((error) => {
      return Promise.reject(error + "");
    });
}
export function get(rq) {
  var requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      credentials: "true",
      SPAVersion: global.SPAVersion,
    },
  };
  //thong tin token key
  const jwt = getToken();
  if (jwt != undefined && jwt != "") {
    var bearer = "Bearer " + jwt;
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: bearer,
      "x-bearer": bearer,
    };
  }
  return fetch(rq, requestOptions)
    .then((res) => {
      checkResponse(res);
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
      return Promise.resolve(result);
    })
    .catch((error) => {
      return Promise.reject(error + "");
    });
}
//luu lai cac cache neu can
const queryCacheResults = {};
export function queryCache(rq, ps) {
  var cacheID = rq + queryParams(ps);
  var cache = queryCacheResults[cacheID];
  if (cache) {
    //console.log("return from cache:" + cacheID);
    //var data = JSON.parse(cache);
    return new Promise(function (success, failed) {
      success(cache);
    });
  } else {
    return query(rq, ps).then(
      (result) => (queryCacheResults[cacheID] = result)
    );
  }
}
function queryParams(params) {
  const qs = params
    ? Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        )
        .join("&")
    : "";
  return qs;
}
export function query(rq, params) {
  const qs = queryParams(params);
  var requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      credentials: "include",
      SPAVersion: global.SPAVersion,
    },
  };
  //thong tin token key
  const jwt = getToken();
  if (jwt != undefined) {
    var bearer = "Bearer " + jwt;
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: bearer,
      "x-bearer": bearer,
    };
  }
  return fetch(getRequest(rq + "?" + qs), requestOptions)
    .then((res) => {
      checkResponse(res);
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
      return Promise.resolve(result);
    })
    .catch((error) => {
      return Promise.reject(error + "");
    });
}
export function post(rq, ps) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      SPAVersion: global.SPAVersion,
    },
    body: JSON.stringify(ps),
  };
  //thong tin token key
  const jwt = getToken();
  const jwtSSO = getTokenSSO();
  if (jwt !== undefined) {
    var bearer = "Bearer " + jwt;
    var bearerSSO = "Bearer " + jwtSSO;
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: bearer,
      "x-bearer": bearer,
    };
  }
  return fetch(getRequest(rq), requestOptions)
    .then((res) => {
      // if(rq === "qlphanmem/dorequest"){
      //    res = {status : 401}
      // }
      checkResponse(res);

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
      return Promise.resolve(result);
    })
    .catch((error) => {
      return Promise.reject(error + "");
    });
}
export function post3(rq, ps) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
      SPAVersion: global.SPAVersion,
    },
    body: JSON.stringify(ps),
  };
  //thong tin token key
  const jwt = getToken();
  if (jwt !== undefined) {
    var bearer = "Bearer " + getToken();
    requestOptions.headers = {
      ...requestOptions.headers,
      // Authorization: bearer,
      "x-bearer": bearer,
    };
  }
  return fetch(getRequest(rq), requestOptions)
    .then((res) => {
      checkResponse(res);

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
      return Promise.resolve(result);
    })
    .catch((error) => {
      return Promise.reject(error + "");
    });
}
export function upload(rq, ps) {
  const requestOptions = {
    method: "POST",
    headers: {},
    body: ps,
  };
  //thong tin token key
  const jwt = getToken();
  if (jwt !== undefined) {
    var bearer = "Bearer " + jwt;
    requestOptions.headers = {
      ...requestOptions,
      Authorization: bearer,
      "x-bearer": bearer,
    };
  }

  return fetch(getRequest(rq), requestOptions)
    .then((res) => {
      checkResponse(res);
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
      return Promise.resolve(result);
    })
    .catch((error) => {
      return Promise.reject(error + "");
    });
}
export function download(rq, ps) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      credentials: "include",
      SPAVersion: global.SPAVersion,
    },
    body: JSON.stringify(ps),
  };
  //thong tin token key
  const jwt = getToken();
  if (jwt !== undefined) {
    var bearer = "Bearer " + jwt;
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: bearer,
      "x-bearer": bearer,
    };
  }
  var filename = "";
  return fetch(getRequest(rq), requestOptions)
    .then((response) => {
      filename = response.headers.get("Content-Disposition").split(";")[1];
      filename = filename.split("=")[1];
      while (filename.indexOf('"') >= 0) filename = filename.replace('"', "");
      return response.blob();
    })
    .then((file) => {
      //FileSaver.saveAs(file, filename );
    })
    .catch((error) => console.log(error));
}

export function populateID(list) {
  list.map((item, index) => (item.id = index + 1));
  return list;
}
