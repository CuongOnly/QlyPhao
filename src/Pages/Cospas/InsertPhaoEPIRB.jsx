import React, { useEffect, useState } from "react";
import TextInput from "../../components/BoxFormPhao/TextInputOwner";
import SelectInput from "../../components/BoxFormPhao/CheckboxOwner";
import RadioGroup from "../../components/BoxFormPhao/RadioGroupOwner";
import { Button, Drawer, Card, Tabs, Row, Col, Typography } from "antd";
import OwnerInfo from "../../components/BoxFormPhao/OwnerInfo";
import EpirbInfo from "../../components/BoxFormPhao/EPIRB/EpirbInfo";
import EpirbVesselInfo from "../../components/BoxFormPhao/EPIRB/EpirbVesselInfo";
import OwnerKhanCap from "../../components/BoxFormPhao/OwnerKhanCap";
import { showError, showSuccess, showWarning } from "../../lib/common";
import "../../Assets/styles/global.css"; // Import your global CSS file
import OwnerDataPhao from "../../components/BoxFormPhao/OwnerDataPhao";
import ReportXuLy from "../../components/BoxFormPhao/ReportXuLy";
import BtnSave from "./BtnSave";
import BtnNotSave from "./BtnNotSave";
import ConfirmDialog from "../../components/ConfirmDialog";
import { ToastContainer } from "react-toastify";

const server = require("../../lib/server");
const myLib = require("../../lib/MyLib");

const { Text } = Typography;

const InsertPhaoEPIRB = ({
  edittingRecord,
  openPhaoEPIRB,
  closePhaoEPIRB,
  doSearch,
}) => {
  const isEditRow = edittingRecord;

  const splitTask = (task) => {
    if (task) {
      const [task1, task2] = task.split("|");
      return [task1 || "", task2 || ""];
    }
    return ["", ""];
  };
  //validate
  const [validateStatus, setValidateStatus] = useState({ error: false });
  console.log(isEditRow);
  // thao tác
  const [open, setOpen] = useState(false);
  const [changesMade, setChangesMade] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);
  // loadding
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [formValues, setFormValues] = useState({
    IdPhao: isEditRow ? isEditRow.IdPhao : "",
    TypePhao: isEditRow ? isEditRow.TypePhao : "1", //1-EPIRB; 2-PLB; 3-ELT
    NgayKhai: isEditRow ? isEditRow.NgayKhai : "",
    XuLy: isEditRow ? isEditRow.XuLy : 0,
    MaKH: isEditRow ? isEditRow.MaKH : "",
    TaiKhoanKH: isEditRow ? isEditRow.TaiKhoanKH : "",
    NguoiCN: isEditRow ? isEditRow.NguoiCN : "",
    NgayCN: isEditRow ? isEditRow.NgayCN : "",
    //EPIRB/PLB/ELT Information
    IdChar: isEditRow ? isEditRow.IdChar : "",
    NXB: isEditRow ? isEditRow.NXB : "",
    Model: isEditRow ? isEditRow.Model : "",
    Serial: isEditRow ? isEditRow.Serial : "",
    Category: isEditRow ? isEditRow.Category : "", //1-phat tự động hoặc thu cong; 2-phát thủ công
    ThietBiPhuTro: isEditRow ? isEditRow.ThietBiPhuTro : "",
    ThongTinKhac: isEditRow ? isEditRow.ThongTinKhac : "",
    DuLieuCungCap: isEditRow ? isEditRow.DuLieuCungCap : "", //Cung cấp mới (New Supply); 2-Thay đổi thông tin EPIRB

    O_Name: isEditRow ? isEditRow.O_Name : "",
    O_Name_International: isEditRow ? isEditRow.O_Name_International : "",
    O_Address: isEditRow ? isEditRow.O_Address : "",
    O_City: isEditRow ? isEditRow.O_City : "",
    O_PostalCode: isEditRow ? isEditRow.O_PostalCode : "",
    O_Country: isEditRow ? isEditRow.O_Country : "",
    O_WorkPhone: isEditRow ? isEditRow.O_WorkPhone : "",
    O_HomePhone: isEditRow ? isEditRow.O_HomePhone : "",
    O_Fax: isEditRow ? isEditRow.O_Fax : "",
    O_Email: isEditRow ? isEditRow.O_Email : "",
    E_Name1: splitTask(isEditRow ? isEditRow.E_Name : "")[0],
    E_Name2: splitTask(isEditRow ? isEditRow.E_Name : "")[1],
    E_WorkPhone1: splitTask(isEditRow ? isEditRow.E_WorkPhone : "")[0],
    E_WorkPhone2: splitTask(isEditRow ? isEditRow.E_WorkPhone : "")[1],
    E_HomePhone1: splitTask(isEditRow ? isEditRow.E_HomePhone : "")[0],
    E_HomePhone2: splitTask(isEditRow ? isEditRow.E_HomePhone : "")[1],
    E_Mobile1: splitTask(isEditRow ? isEditRow.E_Mobile : "")[0],
    E_Mobile2: splitTask(isEditRow ? isEditRow.E_Mobile : "")[1],
    E_Fax1: splitTask(isEditRow ? isEditRow.E_Fax : "")[0],
    E_Fax2: splitTask(isEditRow ? isEditRow.E_Fax : "")[1],
    E_Email1: splitTask(isEditRow ? isEditRow.E_Email : "")[0],
    E_Email2: splitTask(isEditRow ? isEditRow.E_Email : "")[1],

    _MucDich: isEditRow ? isEditRow._MucDich : "",
    _NhaSanXuat: isEditRow ? isEditRow._NhaSanXuat : "",
    _NhaKhaiThac: isEditRow ? isEditRow._NhaKhaiThac : "",
    _Model_ELT: isEditRow ? isEditRow._Model_ELT : "",
    _HoHieu: isEditRow ? isEditRow._HoHieu : "",
    _ChieuDai: isEditRow ? isEditRow._ChieuDai : "",
    _INM: isEditRow ? isEditRow._INM : "",
    _IMO: isEditRow ? isEditRow._IMO : "",
    _TrongTai: isEditRow ? isEditRow._TrongTai : "",
    _Name: isEditRow ? isEditRow._Name : "",
    _SoDangKy: isEditRow ? isEditRow._SoDangKy : "",
    _Color: isEditRow ? isEditRow._Color : "",
    _Type: isEditRow ? isEditRow._Type : "", // tàu cá, trực thăng
    _SLNguoi: isEditRow ? isEditRow._SLNguoi : "",
    _ThietBiVoTuyen: isEditRow ? isEditRow._ThietBiVoTuyen : "",
    _ThongTinKhac: isEditRow ? isEditRow._ThongTinKhac : "",
  });

  //************ validate *************
  function validate_Data(data) {
    var ret = myLib.validateEmpty(data, [
      // validate value
      "O_Name", "O_WorkPhone", "O_Email",
      "_Name", "_HoHieu", "_SoDangKy", "_INM", "_IMO", "_SLNguoi",
      "IdChar"
    ]);

    // if (Object.keys(ret).length == 0) {
    //   //ko co loi thi kiem tra cac dieu kien khac
    // }
    if (Object.keys(ret).length === 0) {
    }
    ret.error = Object.keys(ret).length > 0;
    ret.GUID = new Date(); //danh dau version
    return ret;
  }

  useEffect(() => {}, []);

  const dataUpdate = (formData) => {
    setLoadingBtn(true);
    console.log(formData);

    const thamSo = {
      IdPhao: formData.IdPhao,
      TypePhao: formData.TypePhao,

      NgayKhai: formData.NgayKhai,
      XuLy: formData.XuLy, // trạng thái
      MaKH: formData.MaKH,
      TaiKhoanKH: formData.TaiKhoanKH,
      NguoiCN: formData.NguoiCN,
      NgayCN: formData.NgayCN,
      IdChar: formData.IdChar,
      Category: formData.Category,

      NXB: formData.NXB,
      Model: formData.Model,
      Serial: formData.Serial,
      ThietBiPhuTro: formData.ThietBiPhuTro,
      ThongTinKhac: formData.ThongTinKhac,
      DuLieuCungCap: formData.DuLieuCungCap,

      O_Name: formData.O_Name,
      O_Name_International: formData.O_Name_International,
      O_Address: formData.O_Address,
      O_City: formData.O_City,
      O_PostalCode: formData.O_PostalCode,
      O_Country: formData.O_Country,
      O_WorkPhone: formData.O_WorkPhone,
      O_HomePhone: formData.O_HomePhone,
      O_Fax: formData.O_Fax,
      O_Email: formData.O_Email,

      E_Name: formData.E_Name1 + "|" + formData.E_Name2,
      E_WorkPhone: formData.E_WorkPhone1 + "|" + formData.E_WorkPhone2,
      E_HomePhone: formData.E_HomePhone1 + "|" + formData.E_HomePhone2,
      E_Mobile: formData.E_Mobile1 + "|" + formData.E_Mobile2,
      E_Fax: formData.E_Fax1 + "|" + formData.E_Fax2,
      E_Email: formData.E_Email1 + "|" + formData.E_Email2,

      _MucDich: formData._MucDich,
      _NhaSanXuat: formData._NhaSanXuat,
      _NhaKhaiThac: formData._NhaKhaiThac,
      _Model_ELT: formData._Model_ELT,
      _HoHieu: formData._HoHieu,
      _ChieuDai: formData._ChieuDai,
      _INM: formData._INM,
      _IMO: formData._IMO,
      _TrongTai: formData._TrongTai,
      _Name: formData._Name,
      _SoDangKy: formData._SoDangKy,
      _Color: formData._Color,
      _Type: formData._Type,
      _SLNguoi: formData._SLNguoi,
      _ThietBiVoTuyen: formData._ThietBiVoTuyen,
      _ThongTinKhac: formData._ThongTinKhac,
    };
    server
      .post("qlmc/dorequest", {
        // gọi đến tên controller
        Function: "Proc_QL_PM_CPMS_Update",
        ThamSo: thamSo,
      })
      // fetch("http://demo.vishipel.net:8083/phao/epirb", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(thamSo),
      // })
      .then((response) => {
        console.log(response);

        setLoadingBtn(false);
        doSearch();
        showSuccess("Lưu thành công");
        onClose();
      })
      .catch((error) => {
        setLoadingBtn(false);
        showError(error);
      });
  };

  const saveInput = (field, value) => {
    setFormValues((prevData) => {
      if (field in prevData) {
        return {
          ...prevData,

          ...(field in prevData ? { [field]: value } : { [field]: value }),
        };
      } else {
        return prevData;
      }
    });
    setChangesMade(true); // khi value của field thay đổi changesMade  -> false dòng có thay đổi
  };

  const handleSave = () => {
    setLoadingBtn(true);
    const check = validate_Data(formValues);
    setValidateStatus(check);
    if (!check.error) {
      console.log(formValues);
      dataUpdate(formValues); //data update
      setLoadingBtn(true);
      onClose();
    } else {
      setValidateStatus(check);
      showError("Vui lòng điền đầy đủ thông tin.");
      setLoadingBtn(false);
    }
  };

  const onClose = () => {
    setOpen(false);
    closePhaoEPIRB();
  };

  const onDialogClose = (confirmed) => {
    setOpenConfirmDialog(false);
    if (confirmed) {
      setChangesMade(false);
      onClose();
    }
  };
  const handleChangeBtnSave = () => {
    if (!changesMade) {
      setChangeBtn(false);
      onClose(); // action hủy for btn Hủy bỏ
    }

    if (isEditRow && changesMade) {
      // sửa
      if (changesMade) {
        setOpenConfirmDialog(true);
      } else {
        setChangeBtn(false);
      }
    }

    if (
      (isEditRow === undefined || isEditRow === null || isEditRow === "") &&
      changesMade
    ) {
      // lưu
      if (changesMade) {
        setOpenConfirmDialog(true);
      } else {
        setChangeBtn(true);
        onClose();
      }
    }
  };

  // Handle Function

  console.log(formValues);
  return (
    <div>
      <Drawer
        placement="right" // or "left" depending on your preference
        title={isEditRow ? "Xem: Phao EPIRB" : "Đăng ký Phao EPIRB"}
        onClose={onClose}
        visible={openPhaoEPIRB}
        width="100%"
      >
        <div style={{ display: "flex", marginBottom: "50px" }}>
          <Card
            title="Thông tin về chủ sở hữu phao"
            bordered={true}
            style={{
              flex: "1",
              marginRight: "10px",
              fontSize: "10px",
            }}
          >
            <OwnerInfo
              validateStatus={validateStatus}
              formValues={formValues}
              saveInput={saveInput}
              dataBanDau={isEditRow}
              changeBtn={changeBtn}
            />
            <ReportXuLy
              validateStatus={validateStatus}
              formValues={formValues}
              saveInput={saveInput}
              changeBtn={changeBtn}
              dataBanDau={isEditRow}
            />
          </Card>
          <Card
            title="Thông tin khác"
            bordered={true}
            style={{
              flex: "3",
            }}
          >
            <Row gutter={10}>
              <Col span={12}>
                <div>
                  <EpirbVesselInfo
                    validateStatus={validateStatus}
                    formValues={formValues}
                    saveInput={saveInput}
                    changeBtn={changeBtn}
                    dataBanDau={isEditRow}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <EpirbInfo
                    validateStatus={validateStatus}
                    formValues={formValues}
                    saveInput={saveInput}
                    changeBtn={changeBtn}
                    dataBanDau={isEditRow}
                  />
                  <OwnerDataPhao
                    validateStatus={validateStatus}
                    formValues={formValues}
                    saveInput={saveInput}
                    changeBtn={changeBtn}
                    dataBanDau={isEditRow}
                  />
                  <OwnerKhanCap
                    validateStatus={validateStatus}
                    formValues={formValues}
                    saveInput={saveInput}
                    changeBtn={changeBtn}
                    dataBanDau={isEditRow}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
        {isEditRow && changeBtn === false ? (
          <BtnNotSave
            handleChangeBtnSave={() => setChangeBtn(true)}
            onClose={onClose}
            isEditRow={isEditRow}
          />
        ) : (
          <BtnSave
            handleChangeBtnSave={handleChangeBtnSave}
            handleSave={handleSave}
            loadingBtn={loadingBtn}
            onClose={onClose}
          />
        )}
      </Drawer>
      <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          style={{ fontSize: 12, width: 750 }}
          limit={5}
        />
      {openConfirmDialog && (
        <ConfirmDialog
          // openDeleteDialog={openConfirmDialog}
          title="Thông báo"
          content="Bạn chắc chắn muốn thoát ?"
          onOpenConfirm={onClose}
          onCloseDialog={() => onDialogClose(false)}
        />
      )}
    </div>
  );
};

export default InsertPhaoEPIRB;
