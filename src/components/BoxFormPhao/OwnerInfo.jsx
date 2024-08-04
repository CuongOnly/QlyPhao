import React from "react";
import PropTypes from "prop-types";
import TextInputOwner from "./TextInputOwner";
import { Form } from "antd";

export default function OwnerInfo({ changeBtn, validateStatus, formValues, saveInput, dataBanDau }) {
  const [form] = Form.useForm();

  const createTextInput = (label, name, value) => {
    const fieldsToValidate = ["O_Name", "O_WorkPhone", "O_Email"];
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
        rules={isEmpty ? [{ required: true, message: `${label} không được để trống` }] : false}
        disabled = {dataBanDau && !changeBtn ? true : false}
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
      <h3>Owner Information</h3>
      {createTextInput("Tên (Name)", "O_Name", formValues.O_Name)}
      {createTextInput("Tên giao dịch quốc tế (International Name)", "O_Name_International", formValues.O_Name_International)}
      {createTextInput("Địa chỉ (Address)", "O_Address", formValues.O_Address)}
      {createTextInput("Tỉnh/ Thành phố (Province/City)", "O_City", formValues.O_City)}
      {createTextInput("Mã bưu điện (Postal Code)", "O_PostalCode", formValues.O_PostalCode)}
      {createTextInput("Quốc gia (Country)", "O_Country", formValues.O_Country)}
      {createTextInput("Điện thoại cơ quan", "O_WorkPhone", formValues.O_WorkPhone)}
      {createTextInput("Điện thoại nhà riêng", "O_HomePhone", formValues.O_HomePhone)}
      {createTextInput("Fax (Fax No)", "O_Fax", formValues.O_Fax)}
      {createTextInput("Email (E-mail)", "O_Email", formValues.O_Email)}
    </Form>
  );
}

OwnerInfo.propTypes = {
  validateStatus: PropTypes.bool.isRequired,
  formValues: PropTypes.object.isRequired,
  saveInput: PropTypes.func.isRequired,
};
