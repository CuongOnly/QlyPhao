// DateRangePicker.js
import React, { useState } from 'react';
import { DatePicker, Space, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

const { RangePicker } = DatePicker;

const DateRangePicker = ({value, saveField }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateChange = (dates) => {
    if (dates) {
      setDateRange(dates);
      const NgayCNStart = dates[0] ? dates[0].format('HH:mm DD/MM/YYYY') : "";
      const NgayCNEnd = dates[1] ? dates[1].format('HH:mm DD/MM/YYYY') : "";
    } else {
      setDateRange([null, null]);
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        showTime={{ format: 'HH:mm' }}
        format="HH:mm DD/MM/YYYY"
        locale={locale}
        value={value}
        onChange={saveField}
      />
    </Space>
  );
};

export default DateRangePicker;
