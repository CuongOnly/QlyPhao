import React from "react";
import PropTypes from "prop-types";
import { Input, Form } from "antd";

const TextInputOwner = ({
  label,
  value,
  onChange,
  name,
  rules,
  placeholder,
  validateStatus,
  help,
  disabled,
}) => {
  console.log(value);
  console.log(onChange);
  return (
    <Form.Item
      label={label}
      name={name}
      validateStatus={validateStatus}
      help={help}
      rules={rules}
    >
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </Form.Item>
  );
};

TextInputOwner.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  rules: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  placeholder: PropTypes.string,
  validateStatus: PropTypes.string,
  help: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInputOwner.defaultProps = {
  name: "",
  rules: false,
  placeholder: "",
  validateStatus: "",
  help: "",
  disabled: false,
};

export default TextInputOwner;
