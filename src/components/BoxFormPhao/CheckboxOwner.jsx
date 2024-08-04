import React from 'react';
import { Checkbox, Form } from 'antd';

const CheckboxOwner = ({disabled, label,name, value, options, onChange }) => {
  return (
    <Form.Item label={label} name={name}>
      <Checkbox.Group
        value={value}
        onChange={onChange}
        options={options}
        disabled={disabled}
      />
    </Form.Item>
  );
};

export default CheckboxOwner;
