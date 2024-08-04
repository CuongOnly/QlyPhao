import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";
import TextInputOwner from "../TextInputOwner";
import RadioGroupOwner from "../RadioGroupOwner";
import CheckboxOwner from "../CheckboxOwner";

export default function EpirbVesselInfo({
  dataBanDau,
  validateStatus,
  formValues,
  saveInput,
  changeBtn

}) {
  const [form] = Form.useForm();
  console.log(formValues._IMO);

  const createTextInput = (label, name, value) => {
    const fieldsToValidate = [
      "_Name",
      "_HoHieu",
      "_SoDangKy",
      "_Type",
      "_ThietBiVoTuyen",
      "_INM",
      "_IMO",
      "_SLNguoi",
    ];
    const isEmpty = validateStatus && fieldsToValidate.includes(name) && !value;
    return (
      <TextInputOwner
        label={label}
        name={name}
        value={value}
        onChange={(e) => saveInput(name, e.target.value)}
        placeholder={`Nhập ${label.toLowerCase()}`}
        validateStatus={isEmpty ? "error" : ""}
        help={isEmpty ? `${label} không được để trống` : ""}
        rules={
          isEmpty
            ? [{ required: true, message: `${label} không được để trống` }]
            : false
        }
        disabled={dataBanDau && !changeBtn ? true : false}
      />
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={formValues}
      style={{ width: "100%" }}
    >
      <h3>Vessel’s / Offshore Installation Information</h3>

      {createTextInput(
        "Tên tàu/Công trình biển ngoài khơi (Name of vessel/ Offshore Installation)",
        "_Name",
        formValues._Name
      )}
      {createTextInput("Hô hiệu (Call Sign)", "_HoHieu", formValues._HoHieu)}
      {createTextInput(
        "Số MMSI (MMSI Number)",
        "_SoDangKy",
        formValues._SoDangKy
      )}
      <RadioGroupOwner
        label="Loại tàu (Type of vessel)"
        name="_Type"
        value={formValues._Type}
        disabled={dataBanDau && !changeBtn ? true : false}
        options={[
          { label: "Tàu cá (Fishing)", value: "1" },
          { label: "Tàu hàng (Cargo)", value: "2" },
          { label: "Tàu kéo (Tug)", value: "3" },
          { label: "Tàu dầu (Tanker)", value: "4" },
          { label: "Khác (Other)", value: "5" },
        ]}
        onChange={(e) => saveInput("_Type", e.target.value)}
      />
      {createTextInput(
        "Màu thân tàu (Vessel Color)",
        "_Color",
        formValues._Color
      )}
      {createTextInput("Chiều dài (Length)", "_ChieuDai", formValues._ChieuDai)}
      <CheckboxOwner
        label="Thiết bị vô tuyến (Radio Equipment)"
        name="_ThietBiVoTuyen"
        value={formValues._ThietBiVoTuyen}
        disabled={dataBanDau &&!changeBtn ? true : false}
        options={[
          {
            label: "VHF",
            value: "VHF",
          },
          {
            label: "MF",
            value: "MF",
          },
          {
            label: "HF",
            value: "HF",
          },
          {
            label: "NAVTEX",
            value: "NAVTEX",
          },
          {
            label: "Khác (Other)",
            value: "Other",
          },
        ]}
        onChange={(value) => {
          console.log(value);
          saveInput("_ThietBiVoTuyen", value.toString());
        }}
      />
      {createTextInput("Số INMARSAT (INMARSAT No.)", "_INM", formValues._INM)}
      {createTextInput(
        "Số IMO (IMO Number.)",
        "_IMO",
        formValues._IMO
      )}
      {createTextInput(
        "Số thuyền viên và hành khách (Number Of Crew And Passengers)",
        "_SLNguoi",
        formValues._SLNguoi
      )}
      {createTextInput("Trọng tải (DWT)", "_TrongTai", formValues._TrongTai)}
      {createTextInput(
        "Thông tin khác (Other Information)",
        "_ThongTinKhac",
        formValues._ThongTinKhac
      )}
    </Form>
  );
}

EpirbVesselInfo.propTypes = {
  validateStatus: PropTypes.bool.isRequired,
  formValues: PropTypes.object.isRequired,
  saveInput: PropTypes.func.isRequired,
};
