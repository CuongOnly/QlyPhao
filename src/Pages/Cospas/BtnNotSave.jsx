import React, { useState } from "react";
import PrintForm from "../../components/BoxFormPhao/PrintForm";
import { Button } from "antd";

export default function BtnNotSave({
  handleChangeBtnSave,
  handleSave,
  loadingBtn,
  onClose,
  isEditRow
}) {
    console.log(isEditRow)
    const [openPrint, setOpenPrint] = useState(false);

    const handlePrint = () => {
        setOpenPrint(true);
    };

    const handleClosePrint = () => {
        setOpenPrint(false);
    };

    return (
        <div className="drawer-footer">
            {!openPrint ? (
                <>
                    <Button
                        onClick={handleChangeBtnSave}
                        type="primary"
                        loading={loadingBtn}
                        style={{ marginRight: 10 }}
                    >
                        Sửa
                    </Button>
                    <Button type="primary" onClick={handlePrint} style={{ marginRight: 10 }}>
                        In
                    </Button>
                    <Button onClick={onClose} style={{ marginRight: 10 }}>
                        Thoát
                    </Button>
                </>
            ) : (
                <PrintForm isEditRow={isEditRow} visible ={handlePrint} onClose={handleClosePrint} />
            )}
        </div>
    );
}
