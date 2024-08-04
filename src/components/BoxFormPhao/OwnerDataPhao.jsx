import React from "react";
import { Form, Input } from "antd";
import RadioGroupOwner from "./RadioGroupOwner";

export default function OwnerDataPhao({
  validateStatus,
  formValues,
  saveInput,
  changeBtn,
  dataBanDau,
}) {
  const [form] = Form.useForm();
  return (
    <Form form={form} layout="vertical" style={{ width: "100%" }}>
      <h3>Dữ liệu phao EPIRB (EPIRB’S data):</h3>
      <RadioGroupOwner
        label=""
        name="DuLieuCungCap"
        value={formValues.DuLieuCungCap}
        options={[
          { label: "Cung cấp mới (New Supply)", value: "1" },
          {
            label:
              "Thay đổi thông tin EPIRB hoặc chủ tàu (Change of EPIRB Information or Ship Owner Infomation)",
            value: "2",
          },
        ]}
        onChange={(e) => saveInput("DuLieuCungCap", e.target.value)}
        disabled={dataBanDau && !changeBtn ? true : false}
      />
    </Form>
  );
}
