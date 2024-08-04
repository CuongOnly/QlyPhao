import React from "react";
import { Radio, Form } from "antd";

export default function RadioGroupOwner({
  label,
  name,
  value,
  options,
  onChange,
  disabled,
}) {
  return (
    <Form.Item label={label} name={name}>
      <Radio.Group
        value={value}
        onChange={onChange}
        options={options}
        disabled={disabled}
      />
    </Form.Item>
  );
}
