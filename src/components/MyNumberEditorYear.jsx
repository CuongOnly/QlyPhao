import React from "react";
import { OutlinedInput } from "@mui/material";
import {NumericFormat} from "react-number-format";

export default class MyNumberEditorYear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  componentDidMount() {}
  //call khi user thay doi trang
  static getDerivedStateFromProps(nextProps, prevState) {
    return { value: nextProps.value };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    return (
      <NumericFormat
        fullWidth
        autoFocus={this.props.autoFocus}
        inputProps={{
          style: {
            textAlign: "start",
          },
          maxLength: 4,
        }}
        disabled={this.props.disabled}
        // thousandSeparator=","
        // decimalSeparator ="."
        // allowedDecimalSeparators={[","]}
        customInput={OutlinedInput}
        decimalScale={this.props.decimalScale !== undefined ? this.props.decimalScale : 2}
        readOnly={this.props.readOnly}
        placeholder={this.props.placeholder}
        value={this.props.value === null || this.props.value === undefined ? '' : this.props.value}
        onValueChange={(value) => {
          if (this.props.onValueChange) {
            this.props.onValueChange(value.floatValue);
          }
          if (this.props.onChange) {
            this.props.onChange(value.floatValue);
          }
        }}
        error={this.props.error}
      />
    );
  }
}
