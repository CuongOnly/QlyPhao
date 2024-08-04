import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  FormLabel,
  useMediaQuery,
  InputBase
} from "@mui/material";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import { useTheme } from '@mui/material/styles';
//Dialog Delete
export default function SimpleDialogCg({
  onConfirm,
  dataRow,
  open,
  onClose,
  content,
  title
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"

    >
      <DialogTitle>{title}</DialogTitle>
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
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained" >
          Đồng ý
        </Button>
        <Button onClick={onConfirm} variant="contained" autoFocus>
          Không
        </Button>
      </DialogActions>
    </Dialog>
  );
}

