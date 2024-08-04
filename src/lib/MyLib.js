import moment from "moment";
import { toast } from "react-toastify";

//kiem tra xem co phai dang trong che do dev khong
export function isDev() {
  return process.env.NODE_ENV === "development";
}

export function formatDate(date, format) {
  return new moment(date).format(format);
}
//copy gia tri cua 1 object
export function cloneObject(obj) {
  var newObj = { ...obj };
  return newObj;
}
//Kiem tra trong'
export function isEmpty(data) {
  return data === undefined || data === null || data + "" === "";
}
//chuyen thanh string
export function toString(data) {
  if (isEmpty(data)) {
    return "";
  }
  return data.toString();
}
//kiem tra xem 2 doi tuong co giong nhau cac field hay khong
export function isSame(obj1, obj2, fields) {
  var ok = true;
  fields.map((item, index) => {
    let v1 = obj1[item];
    let v2 = obj2[item];
    ok = ok && toString(v1) === toString(v2);
    if (ok && toString(v1) !== "" && toString(v2) !== "") {
      if (v1.hasOwnProperty("value")) {
        ok = ok && toString(v1.value) === toString(v2.value);
      }
    }
  });
  return ok;
}
//gan thuoc tinh va tra ve doi tuong moi
export function assign(source, des, fields) {
  fields.map((item, index) => {
    let v1 = source[item];
    if (v1 !== undefined) {
      des[item] = v1;
    }
  });
  return des;
}
export function assignForce(source, des, fields) {
  fields.map((item, index) => {
    let v1 = source[item];
    des[item] = v1;
  });
  return des;
}
//copy cac gia tri thuoc tinh cua des
export function cloneValues(source, des) {
  var keys = Object.keys(des);
  var d = {};
  keys.forEach((k) => {
    var v = source[k];
    if (v !== undefined) {
      d[k] = source[k];
    }
  });
  return d;
}
//chuan hoa lai cac gia tri dung de edit tren control
export function controlValues(source, fields) {
  fields.map((item, index) => {
    let v1 = source[item];
    if (v1 === undefined || v1 == null) {
      source[item] = "";
    }
  });
  return source;
}
export function copy(source, fields) {
  var des = {};
  fields.map((item, index) => {
    let v1 = source[item];
    if (v1 !== undefined) {
      des[item] = v1;
    }
  });
  return des;
}
//cut iso string time: 2020-12-08T03:05:22.743Z to 2020-12-08T03:05:22
export function cutTime(isoTime) {
  return isoTime.substring(0, 19);
}
//chuyen doi thoi gian local dang luu tru tren server theo gio HN ve gia tri datetime cua client
export function fromServerTime(str) {
  var date = new Date(str);
  date.setTime(date.getTime() - 7 * 3600 * 1000);
  return date;
}
//tra ve thoi gian hien tai theo format local
export function currentLocalTimeString() {
  var d = new Date();
  d.setTime(d.getTime() + 7 * 3600 * 1000);
  return cutTime(d.toISOString());
}
//convert mask text: dd/MM/yyyy HH:mm:ss thanh date time
export function convertMaskTextToDateTime(text, maskChar) {
  var mask = maskChar === undefined ? "_" : maskChar;
  var dd = text.substring(0, 2);
  if (dd.indexOf(mask) >= 0) return undefined;
  var idd = parseInt(dd);
  if (idd <= 0 || idd > 31) return undefined;
  var MM = text.substring(3, 5);
  if (MM.indexOf(mask) >= 0) return undefined;
  var iMM = parseInt(MM);
  if (iMM <= 0 || iMM > 12) return undefined;
  var yyyy = text.substring(6, 10);
  if (yyyy.indexOf(mask) >= 0) return undefined;
  var iyyyy = parseInt(yyyy);
  if (iyyyy <= 0 || iyyyy >= 3000) return undefined;
  var HH = text.substring(11, 13);
  if (HH.indexOf(mask) >= 0) return undefined;
  var iHH = parseInt(HH);
  if (iHH < 0 || iHH > 23) return undefined;
  var mm = text.substring(14, 16);
  if (mm.indexOf(mask) >= 0) return undefined;
  var imm = parseInt(mm);
  if (imm < 0 || imm > 59) return undefined;
  var ss = text.substring(17, 19);
  if (ss.indexOf(mask) >= 0) return undefined;
  var iss = parseInt(ss);
  if (iss < 0 || iss > 59) return undefined;
  if (
    iMM === 2 &&
    ((iyyyy % 4 === 0 && idd > 29) || (iyyyy % 4 !== 0 && idd > 28))
  )
    return undefined;
  console.log(
    "date time:",
    yyyy + "-" + MM + "-" + dd + "T" + HH + ":" + mm + ":" + ss
  );
  return new Date(
    yyyy + "-" + MM + "-" + dd + "T" + HH + ":" + mm + ":" + ss + ".000+07:00"
  );
}
//chuyen doi vi do thanh string
export function latToDMS(lat, format) {
  if (lat === undefined || lat === null || lat == "") {
    return undefined;
  }
  var isN = lat >= 0;
  lat = Math.abs(lat);
  var d = Math.floor(lat);
  var m = Math.floor((lat - d) * 60);
  var s = Math.round((lat - d - m / 60.0) * 3600);
  if (s >= 60) {
    m += 1;
    s = s - 60;
  }
  if (m >= 60) {
    m = m - 60;
    d = d + 1;
  }
  var t =
    (d < 10 ? "0" : "") +
    d +
    "." +
    ((m < 10 ? "0" : "") + m) +
    "." +
    ((s < 10 ? "0" : "") + s) +
    (isN ? "N" : "S");
  return t;
}
export function lonToDMS(lon, format) {
  if (lon === undefined || lon === null || lon == "") {
    return undefined;
  }
  var isE = lon >= 0;
  lon = Math.abs(lon);
  var d = Math.floor(lon);
  var m = Math.floor((lon - d) * 60);
  var s = Math.round((lon - m / 60.0 - d) * 3600);
  if (s >= 60) {
    m += 1;
    s = s - 60;
  }
  if (m >= 60) {
    m = m - 60;
    d = d + 1;
  }
  var t =
    (d < 10 ? "00" : d < 100 ? "0" : "") +
    d +
    "." +
    ((m < 10 ? "0" : "") + m) +
    "." +
    ((s < 10 ? "0" : "") + s) +
    (isE ? "E" : "W");
  return t;
}
//chuyen tu text sang gia tri
export function latFromDMS(text) {
  text = text.toUpperCase();
  var d = parseInt(text.substring(0, 2));
  if (isNaN(d) || d === undefined) return undefined;
  var m = parseInt(text.substring(3, 5));
  if (isNaN(d) || m === undefined) return undefined;
  var s = parseInt(text.substring(6, 8));
  if (isNaN(s) || s === undefined) return undefined;
  var direct = text.substring(8, 9);
  if (direct === undefined || (direct !== "N" && direct !== "S"))
    return undefined;
  var lat =
    ((direct === "N" ? 1.0 : -1.0) *
      Math.round((d + m / 60.0 + s / 3600.0) * 10000)) /
    10000.0;
  return lat;
}
export function lonFromDMS(text) {
  text = text.toUpperCase();
  var d = parseInt(text.substring(0, 3));
  if (isNaN(d) || d === undefined) return undefined;
  var m = parseInt(text.substring(4, 6));
  if (isNaN(m) || m === undefined) return undefined;
  var s = parseInt(text.substring(7, 9));
  if (isNaN(s) || s === undefined) return undefined;
  var direct = text.substring(9, 10);
  if (direct === undefined || (direct !== "E" && direct !== "W"))
    return undefined;
  var lat =
    ((direct === "E" ? 1.0 : -1.0) *
      Math.round((d + m / 60.0 + s / 3600.0) * 10000)) /
    10000.0;
  return lat;
}

//tra ve danh sach quyen
export function getQuyen() {
  return [
    { Code: "R11", Name: "Danh mục cơ quan" },
    { Code: "R111", Name: "Cập nhật" },
    { Code: "R12", Name: "Danh mục đơn vị ngoài" },
    { Code: "R121", Name: "Cập nhật" },
    { Code: "R13", Name: "Danh mục loại tàu" },
    { Code: "R131", Name: "Cập nhật" },
    { Code: "R14", Name: "Danh mục quốc gia" },
    { Code: "R141", Name: "Cập nhật" },
    { Code: "R15", Name: "Danh mục vùng biển" },
    { Code: "R151", Name: "Cập nhật" },
    { Code: "R16", Name: "Danh mục khu vực biển" },
    { Code: "R161", Name: "Cập nhật" },
    { Code: "R17", Name: "Danh mục tính chất tai nạn" },
    { Code: "R171", Name: "Cập nhật" },
    { Code: "R18", Name: "Danh mục tên tàu SAR" },
    { Code: "R181", Name: "Cập nhật" },
    { Code: "R19", Name: "Danh mục loại thiết bị" },
    { Code: "R191", Name: "Cập nhật" },
    { Code: "R90", Name: "Danh mục người dùng" },
    { Code: "R901", Name: "Cập nhật" },
    { Code: "R902", Name: "Phân quyền" },
    { Code: "R21", Name: "Bản đồ" },
    { Code: "R211", Name: "Cập nhật" },
    { Code: "R22", Name: "Quản lý sự vụ" },
    { Code: "R221", Name: "Cập nhật" },
    { Code: "R23", Name: "Kế hoạch chốt chặn" },
    { Code: "R231", Name: "Cập nhật" },
    { Code: "R24", Name: "Sổ trực ban" },
    { Code: "R241", Name: "Cập nhật" },
    { Code: "R25", Name: "Trao đổi thông tin" },
    { Code: "R251", Name: "Cập nhật" },
    { Code: "R29", Name: "Thống kê" },
    { Code: "RX1", Name: "Admin dữ liệu" },
  ];
}
function Tol() {
  return 1.0e-9;
}
function toRad(degree) {
  return (degree * Math.PI) / 180;
}
function toDeg(radians) {
  return (radians * 180) / Math.PI;
}
//convert NM to radians
function NMtorad(distance_NM) {
  return (Math.PI / (180 * 60)) * distance_NM;
}
/*
Note on the mod function. This appears to be implemented differently in different languages, with differing conventions on whether
the sign of the result follows the sign of the divisor or the dividend. (We want the sign to follow the divisor or be Euclidean.
C's fmod and Java's % do not work.) In this document, Mod(y,x) is the remainder on dividing y by x and always lies in the range 0 <=mod <x.
For instance: mod(2.3,2.)=0.3 and mod(-2.3,2.)=1.7
*/
function mod(y, x) {
  var m = y - x * Math.floor(y / x);
  if (m < 0) m = m + x;
  return m;
}

//xac dinh vi tri tiep theo can cu vao huong va khoang cach
export function calculateRhumbLine(coord1, brng, dist) {
  var lat1 = coord1[1];
  var lon1 = coord1[0];
  var lat2, lon2;
  lat1 = toRad(lat1);
  lon1 = toRad(lon1);
  var d = NMtorad(dist);
  var tc = toRad(brng);
  var lat = lat1 + d * Math.cos(tc);
  if (Math.abs(lat) > Math.PI / 2) return undefined; //"d too large. You can't go this far along this rhumb line!"
  var q;
  if (Math.abs(lat - lat1) < Math.sqrt(Tol())) {
    q = Math.cos(lat1);
  } else {
    var dphi = Math.log(
      Math.tan(lat / 2 + Math.PI / 4) / Math.tan(lat1 / 2 + Math.PI / 4)
    );
    q = (lat - lat1) / dphi;
  }
  var dlon = (-d * Math.sin(tc)) / q;
  lon2 = toDeg(mod(lon1 + dlon + Math.PI, 2 * Math.PI) - Math.PI);
  lat2 = toDeg(lat);
  return [lon2, lat2];
}
export function dateDiff(t1, t2) {
  var d1 = new Date(t1);
  var d2 = new Date(t2);
  var time = d1.getTime() - d2.getTime();
  var hours = time / 3600000;
  var days = Math.floor(hours / 24);
  return hours < 24
    ? Math.round(hours) + " h"
    : days + " n " + Math.round(hours - days * 24) + " h";
}
//thu convert date time ma khong co nhap nam, vd: 11020420->11/02/2021 04:20
export function tryToDate(str) {
  try {
    var now = new Date();
    var day = parseInt(str.substring(0, 2));
    var month = parseInt(str.substring(2, 4));
    var year = now.getFullYear();
    var hour = 0,
      minute = 0;
    if (str.length > 4) {
      hour = parseInt(str.substring(4, 6));
    }
    if (str.length > 6) {
      minute = parseInt(str.substring(6, 8));
    }
    return new Date(year, month - 1, day, hour, minute, 0, 0);
  } catch (e) {
    console.log(e);
  }
  return undefined;
}
export function isZero(v) {
  return (
    v === undefined || v === null || isNaN(parseFloat(v)) || parseFloat(v) <= 0
  );
}
export function isEmptyData(v) {
  return v == undefined || v == null || v == "";
}
export function isEmptyNumber(v) {
  return v == undefined || v == null;
}
//kiem tra du lieu trong'
export function validateEmpty(data, fields) {
  var ret = {};
  fields.map((name, index) => {
    if (isEmpty(data[name])) {
      ret[name] = true;
    }
  });
  console.log(ret)
  return ret;
}
export function validateZero(data, fields) {
  var ret = {};
  fields.map((name, index) => {
    if (isZero(data[name])) {
      ret[name] = true;
    }
  });
  return ret;
}
//tao so bien lai tiep theo
export function taoSoBienLaiTiepTheo(soct, next) {
  var so = "";
  var prefix = "";
  var laySo = true;
  for (var i = soct.length - 1; i >= 0; i--) {
    var ch = soct.charAt(i);
    if (laySo && ch >= "0" && ch <= "9") {
      so = ch + so;
    } else {
      laySo = false;
      prefix = ch + prefix;
    }
  }
  var stt = parseInt(so, 10) + (next ? next : 1);
  var str = prefix + (so === "" ? "1" : paddingLeft(stt + "", "0", so.length));
  return str;
}
export function paddingLeft(s, c, n) {
  while (s.length < n) {
    s = c + s;
  }
  return s;
}
export function getSTT(soct) {
  var so = "";
  var prefix = "";
  var laySo = true;
  for (var i = soct.length - 1; i >= 0; i--) {
    var ch = soct.charAt(i);
    if (laySo && ch >= "0" && ch <= "9") {
      so = ch + so;
    } else {
      laySo = false;
      prefix = ch + prefix;
    }
  }
  return so === "" ? 0 : parseInt(so, 10);
}
//tra ve ngay 1 dau nam hien tai
export function getBeginYear() {
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  now.setDate(1);
  now.setMonth(0);
  return now;
}
export function getNowDate() {
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}
export function handleServerError(error) {
  var message = "";
  var log = "";
  try {
    var obj = JSON.parse(error);
    message = obj.message;
    log = obj.traceLog;
    var log_detail = JSON.parse(log);

    if (log_detail && log_detail.Message) {
      message += "\n<br>" + log_detail.Message;
      if (log_detail.ExceptionMessage) {
        message = log_detail.ExceptionMessage + "\n" + message;
      }
    }
  } catch (e) {
    message = error + "";
  }
  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
}
//thuc hien tao lap columns tu dinh nghia moi va cu
export function applyGridColumns(default_columns, new_columns) {
  new_columns.map((col) => {
    //gan render cua default
    var find = default_columns.find((item) => item.name == col.name);
    if (find && find.render !== undefined) {
      col.render = find.render;
    }
  });
  return new_columns;
}
export function replaceAll(str, search, replaced) {
  return str.replace(new RegExp(search, "g"), replaced);
}
export function toUpperCase(str) {
  return str == undefined ? undefined : str == null ? null : str.toUpperCase();
}
export function round(number, decimal) {
  let heso = Math.pow(10, decimal);
  return Math.round(number * heso) / heso;
}
//thuc hien load script tu ben ngoai
export function useExternalScript(url) {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject("invalid url");
      return;
    }
    let script = document.querySelector(`script[src="${url}"]`);
    if (!script) {
      script = document.createElement("script");
      script.type = "application/javascript";
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", () => reject());
    } else {
      resolve();
    }
  });
}

export function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat('vi-VN', {
    // style: 'currency',
    currency: 'VND'
  });
  return formatter.format(amount).replace('đ',' ');
}
