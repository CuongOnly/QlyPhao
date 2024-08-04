import React from 'react';
import { SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

export default function ReportXuLy({ formValues }) {
  return (
    <div style={{marginTop:"5rem", textAlign:"right"}}>
      {formValues.XuLy === 0 ? (
        <Tag style={{fontSize:"20px", padding:"5px"}} icon={<SyncOutlined spin />} color="volcano">

          Chờ xử lý
        </Tag>
      ) : null}
    </div>
  );
}
