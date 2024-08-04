import React from "react";
import { OutlinedInput, TextField } from "@mui/material";
import NumericFormat from "react-number-format";

import moment from "moment";
import DateTimePicker from "@mui/lab/DateTimePicker";

export default class MyDateTimeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      inputValue: "",
    };
  }
  setValue(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    } else {
      this.setState({ value: value });
    }
  }
  componentDidMount() {}
  //call khi user thay doi trang
  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log("get from props...." + nextProps.value);
    var value = nextProps.value;
    if (value == null || value == undefined || value == "Invalid Date") {
      //console.log("setnulllllll");
      return { value: null };
    }
    return { value: nextProps.value };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    return (
      <DateTimePicker
        autoFocus={this.props.autoFocus}
        disableOpenPicker
        mask={"__:__ __/__/____"}
        inputFormat={"HH:mm dd/MM/y"}
        value={this.state.value}
        onChange={(newValue) => {
          //console.log("onChange dateime:" + newValue);
          if (newValue === "Invalid Date") {
            this.setValue(null);
          } else {
            this.setValue(newValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            
            autoFocus={this.props.autoFocus}
            error={this.props.error}
            onChange={(event) => {
              //console.log("onChange input:" + event.target.value);
              this.setState({ inputValue: event.target.value });
            }}
            onBlur={() => {
              //console.log("sssssssssssssssss" + this.state.inputValue + "/");
              if (
                this.state.inputValue !== "" &&
                (this.state.value == null ||
                this.state.value == '' ||
                  this.state.value == undefined ||
                  this.state.value == "Invalid Date")
              ) {
                var now = new Date();
                var text = moment(now).format("HH:mm DD/MM/YYYY");
                //console.log("now=" + text);
                text =
                  this.state.inputValue +
                  text.substring(this.state.inputValue.length);
                //console.log("date=" + text);
                this.setState({ inputValue: text });
                var date = moment(text, "HH:mm DD/MM/YYYY");
                //console.log("set date=" + date);
                if (!isNaN(date)) {
                  //console.log("set date=" + new Date(date));
                  this.setValue(new Date(date));
                } else {
                  //console.log("set date=null");
                  this.state.inputValue = "";
                  this.setValue(null);
                }
              }
            }}
          />
        )}
        clearable={true}
        readOnly={this.props.readOnly}
      />
    );
  }
}
