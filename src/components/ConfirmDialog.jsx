import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  InputBase,
  DialogTitle,
  CircularProgress,
  LinearProgress,
  Grid,
} from "@mui/material";
export default function ConfirmDialog({
  handleDeleteConfirmed,
  dataRow,
  onOpenConfirm,
  onCloseDialog,
  content,
  title,
  isDeleting,
  onConfirmSave
}) {
  return (
    <Dialog
      open={onOpenConfirm}
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        style={{
          cursor: "move",
          backgroundColor: "#75829B",
          color: "white",
          padding: " 5px 10px",
          display: "flex",
          alignItems: "center",
        }}
        id="draggable-dialog-title"
      >
        {title}
      </DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            minWidth: 450,
            minHeight: 30,
            padding: 5,
            fontSize: 10,
            wordWrap: "break-word",
          }}
        >
          <InputBase multiline fullWidth value={content} />
          {/* <span>{dataRow.MaPhanMem}</span> */}
        </div>
      </DialogContent>
      {isDeleting ? <LinearProgress size={24} color="success" /> : null}

      <DialogActions>
        
          <Button
            onClick={!isDeleting && handleDeleteConfirmed ? handleDeleteConfirmed : onOpenConfirm}
            variant="contained"
            autoFocus
          >
            {isDeleting ? "Đang xử lý" : "Xác nhận"}
          </Button>
        
          <Button
            onClick={!isDeleting ? onCloseDialog : null}
            variant="outlined"
          >
            Đóng
          </Button>
        
      </DialogActions>
    </Dialog>
  );
}
