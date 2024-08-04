import React from "react";
import SelectFilter from "react-select";
import {
  filterStyles,

} from "../lib/common";

export default class MySelectFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      inputValue: "",
      options: props.options,
    };
  }
  
  componentDidMount() {
  }
  //call khi user thay doi trang
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      options: nextProps.options,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    return (
      <SelectFilter
        fullWidth = {this.props.fullWidth}
        autoFocus={this.props.autoFocus}
        options={this.state.options}
        getOptionLabel={(item) => item[this.props["optionLabel"]]}
        getOptionValue={(item) => item[this.props["optionValue"]]}
        placeholder={this.props.placeholder}
        // placeholder={""}
        styles={filterStyles}
        // menuPosition={"fixed"}
        value={this.props.value}
        isMulti={this.props.isMulti}
        isClearable
        onChange={(item) => {
          var temp = {};
          if (this.props.isMulti) {
            temp = item;
          } else {
            temp[this.props.optionLabel] = item
              ? item[this.props["optionLabel"]]
              : null;
            temp[this.props.optionValue] = item
              ? item[this.props["optionValue"]]
              : null;
          }
          if (this.props.onChange) {
            this.props.onChange(temp, item);
          }
        }}
        onMenuClose={() => {
          // Kiểm tra nếu giá trị đã thay đổi so với giá trị trước đó
          if (this.props.value !== this.state.value) {
            // Cập nhật state với giá trị mới
            this.setState({ value: this.props.value });
          }
        }}
      ></SelectFilter>
    );
  }
}
