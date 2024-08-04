import { fontFamily } from "@mui/system";

export const themeOptions = {
  palette: {
    type: "dark",
    primary: {
      main: "#2366c4",
    },
    secondary: {
      main: "#6C757D",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  typography: {
    body1: {
      lineHeight: 0.75,
      letterSpacing: "0.02em",
      fontSize: "0.8rem",
      fontWeight: 400,
    },
    caption: {
      lineHeight: 0.9,
    },
    body2: {
      fontSize: "12px", // size dòng datagrid
      // fontFamily: "Roboto, Helvetica,Arial, sans-serif",
      fontFamily: "Quicksand, sans-serif",
    },
    h6: {
      fontSize: "1.2rem",
    },
    h4: {
      letterSpacing: "0.05em",
    },
    subtitle1: {
      lineHeight: 1.09,
    },
    overline: {
      lineHeight: 0.92,
    },
  },
  spacing: 4,
};

export const styles = (theme) => ({
  timkiem: {
    backgroundColor: "red",
  },
  grow: {
    flexFlow: 1,
  },
  grid: {
    height: `${window.innerHeight - 150}px`,
    backgroundColor: "red",
  },
  alternateRow: {
    backgroundColor: "red",
  },
  iconLabelWrapper: {
    flexDirection: "row",
  },
  labelContainer: {
    width: "auto",
    padding: 0,
  },
  smallRadioButton: {
    "& svg": {
      width: "1.em",
      height: "0.6em",
    },
  },
});

export const boxCenter = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderTop: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
};

export const formHelperText = {
  height: "3px",
  display: "flex",
  justifyContent: "flex-end",
  fontSize: "12px",
};
