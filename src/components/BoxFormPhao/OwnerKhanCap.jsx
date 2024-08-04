import React, { useEffect } from "react";
import { Form, Col, Row, Typography } from "antd";
import "../../Assets/styles/global.css";
import TextInputOwner from "./TextInputOwner";
import TextInputOwnerKC from "./TextInputOwnerKC";

const { Text } = Typography;

export default function OwnerKhanCap({
  validateStatus,
  formValues,
  saveInput,
  dataBanDau,
  changeBtn,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues]);

  const createTextInput = (label, name) => {
    const fieldsToValidate = ["E_Name1", "E_Name2", "E_Mobile1", "E_Mobile2"];
    const isEmpty = validateStatus && fieldsToValidate.includes(name) && !formValues[name];
    return (
      <Form.Item
        name={name}
        rules={
          isEmpty
            ? [{ required: true, message: `${label} không được để trống` }]
            : []
        }
        validateStatus={isEmpty ? "error" : ""}
        help={isEmpty ? `${label} không được để trống` : ""}
      >
        <TextInputOwnerKC
          label={label}
          value={formValues[name]}
          onChange={(e) => saveInput(name, e.target.value)}
          placeholder={`Nhập ${label.toLowerCase()}`}
          disabled={dataBanDau && !changeBtn}
        />
      </Form.Item>
    );
  };

  return (
    <>
      <h3>
        Thông tin liên hệ trong trường hợp khẩn cấp 24h (24-hour Emergency
        Contact Information):
      </h3>
      <Form form={form} layout="vertical" initialValues={formValues}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>Thông tin</Text>
          </Col>
          <Col span={8}>
            <Text strong>Đầu mối chính</Text>
          </Col>
          <Col span={8}>
            <Text strong>Đầu mối dự phòng</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong type="danger">
              <span style={{ color: "red" }}>*</span> Tên
            </Text>
          </Col>
          <Col span={8}>
            {createTextInput("Tên", "E_Name1")}
          </Col>
          <Col span={8}>
            {createTextInput("Tên", "E_Name2")}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
          <Text strong type="danger">
              <span style={{ color: "red" }}>*</span> Di động
            </Text>
          </Col>
          <Col span={8}>
            {createTextInput("Di động", "E_Mobile1")}
          </Col>
          <Col span={8}>
            {createTextInput("Di động", "E_Mobile2")}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
          <Text>Điện thoại cơ quan</Text>
          </Col>
          <Col span={8}>
            {createTextInput("Điện thoại cơ quan", "E_WorkPhone1")}
          </Col>
          <Col span={8}>
            {createTextInput("Điện thoại cơ quan", "E_WorkPhone2")}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text>Điện thoại nhà riêng</Text>
          </Col>
          <Col span={8}>
            {createTextInput("Điện thoại nhà riêng", "E_HomePhone1")}
          </Col>
          <Col span={8}>
            {createTextInput("Điện thoại nhà riêng", "E_HomePhone2")}
          </Col>
        </Row>
        
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text>Fax</Text>
          </Col>
          <Col span={8}>
            {createTextInput("Fax", "E_Fax1")}
          </Col>
          <Col span={8}>
            {createTextInput("Fax", "E_Fax2")}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text>Email</Text>
          </Col>
          <Col span={8}>
            {createTextInput("Email", "E_Email1")}
          </Col>
          <Col span={8}>
            {createTextInput("Email", "E_Email2")}
          </Col>
        </Row>
      </Form>
    </>
  );
}
