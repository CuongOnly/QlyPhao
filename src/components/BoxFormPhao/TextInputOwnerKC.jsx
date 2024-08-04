import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const TextInputOwnerKC = ({ value, onChange, placeholder, disabled }) => (
  <Input 
    value={value} 
    onChange={onChange} 
    placeholder={placeholder} 
    disabled={disabled} 
  />
);

TextInputOwnerKC.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default TextInputOwnerKC;
