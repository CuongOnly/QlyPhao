import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "antd";
import TextInputOwner from "../TextInputOwner";
import RadioGroupOwner from "../RadioGroupOwner";

const { Item } = Form;

export default function EpirbInfo({
  dataBanDau,
  validateStatus,
  formValues,
  saveInput,
  changeBtn
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues]);

  const createTextInput = (label, name, value) => {
    const fieldsToValidate = ["IdChar"];
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
        disabled={dataBanDau && !changeBtn}
      />
    );
  };

  return (
    <Form form={form} layout="vertical" style={{ width: "100%" }} initialValues={formValues}>
      <h3>Thông tin EPIRB (EPIRB Information)</h3>
      <Item name="IdChar" rules={[{ required: true, message: '15 ký tự ID không được để trống' }]}>
        {createTextInput(
          "15 ký tự ID (15 Digit Character ID)",
          "IdChar",
          formValues.IdChar
        )}
      </Item>
      <RadioGroupOwner
        label="Loại tàu (Type of vessel)"
        name="Category"
        value={formValues.Category}
        disabled={dataBanDau && !changeBtn}
        options={[
          { label: "Loại 1 (Phát tự động hoặc thủ công)", value: "1" },
          { label: "Loại 2 (Phát thủ công)", value: "2" },
        ]}
        onChange={(e) => saveInput("Category", e.target.value)}
      />
      {createTextInput(
        "Nhà xuất bản EPIRB (EPIRB Manufacturer)",
        "NXB",
        formValues.NXB
      )}
      {createTextInput("Mẫu (Model)", "Model", formValues.Model)}
      {createTextInput("Số Serial (Serial No)", "Serial", formValues.Serial)}
      <RadioGroupOwner
        label="Thiết bị phụ trợ (Supporting Equipment)"
        name="ThietBiPhuTro"
        value={formValues.ThietBiPhuTro}
        disabled={dataBanDau && !changeBtn}
        options={[
          { label: "121.5 MHz", value: "1" },
          { label: "SART", value: "2" },
          { label: "Không có (None)", value: "3" },
          { label: "Khác (Other)", value: "4" },
        ]}
        onChange={(e) => saveInput("ThietBiPhuTro", e.target.value)}
      />
      {createTextInput(
        "Thông tin khác (Other Information)",
        "ThongTinKhac",
        formValues.ThongTinKhac
      )}
    </Form>
  );
}

EpirbInfo.propTypes = {
  dataBanDau: PropTypes.bool.isRequired,
  validateStatus: PropTypes.bool.isRequired,
  formValues: PropTypes.shape({
    IdChar: PropTypes.string,
    Category: PropTypes.string,
    NXB: PropTypes.string,
    Model: PropTypes.string,
    Serial: PropTypes.string,
    ThietBiPhuTro: PropTypes.string,
    ThongTinKhac: PropTypes.string,
  }).isRequired,
  saveInput: PropTypes.func.isRequired,
  changeBtn: PropTypes.bool.isRequired,
};
