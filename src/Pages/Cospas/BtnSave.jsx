import { Button } from 'antd'
import React from 'react'


export default function BtnSave({handleChangeBtnSave, handleSave, loadingBtn, onClose}) {
  return (
    <div className="drawer-footer">
        <Button
          onClick={handleSave}
          type="primary"
          loading={loadingBtn}
          style={{ marginRight: 10 }}
        >
          Lưu
        </Button>
        <Button onClick={handleChangeBtnSave}>Hủy bỏ</Button>
      </div>
  )
}
