import { styled } from "@mui/system";
import { tableCellClasses } from "@mui/material/TableCell";

export const componentOptions = {
  components: {
    MuiAutocomplete:{
      styleOverrides: {
        root :{
          width: "100%",
          '& .MuiAutocomplete-inputRoot': {
            padding: '0px !important',
            fontSize: '13px',
            // color: '#00000061', 
            fontWeight: 500,
          },
          '& .MuiAutocomplete-inputRoot .MuiOutlinedInput-notchedOutline': {
            // borderColor: '#00000061', 

          },
          '& .MuiAutocomplete-endAdornment': {
            right: '0px !important',
          },
          '&:hover .MuiAutocomplete-inputRoot .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00000061', 
          },
          '& .MuiAutocomplete-inputRoot.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00000061', 
          }
        },
        option: {
          '&[aria-selected="true"]': {
            // backgroundColor: '#e3abed',
            height: "30px"
          },

          '&:hover': {
            // backgroundColor: '#9c27b0',
          },
          // backgroundColor: '#fff',
        },
        tag: {
          // backgroundColor: "#a0a",
          height: 20,
          position: "relative",
          zIndex: 0,
          "& .MuiChip-label": {
            // color: "#fff"
          },
          "& .MuiChip-deleteIcon": {
            // color: "red"
          },
          "&:after": {
            // content: '""',
            // right: 10,
            // top: 6,
            // height: 12,
            // width: 12,
            // position: "absolute",
            backgroundColor: "black",
            // zIndex: -1
          }
        },
        dropdown: {
          "&.MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot":
            {
              padding: "0px !important",
              fontSize: "14px",
              color: "black",
              fontWeight: 500,
            },
          "& .MuiAutocomplete-endAdornment": {
            right: "0px !important",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1E5EF3",
          },
        },
      },
      MuiChip:{
        backgroundColor:"red"
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          [`& .${tableCellClasses.root}`]: {
            backgroundColor: "var(--mui-palette-background-level1)",
            color: "var(--mui-palette-text-secondary)",
            lineHeight: 1,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "black",
          fontSize: 14,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 2,
          "&-MuiAccordion-root.Mui-expanded": {
            marginBottom: 2,
            backgroundColor: "red",
          },
          backgroundImage: `url('/images/bgPageSub.jpg')`,
          color: "black !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: 1,
          fontsize: 13,
          height:"30px",
          backgroundColor: "info",
        },
        startIcon: {
          "& > *:first-of-type": {
            fontSize: 15,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          lineHeight: 1,
          fontsize: 13,
          backgroundColor: "info",
          "&.Mui-selected": {
            backgroundColor: "#42b6f5",
          },
        },
        startIcon: {
          "& > *:first-of-type": {
            fontSize: 14,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontsize: 13,
          padding: 0,
          borderColor: "#FFFF00",
        },
        input: {
          padding: 8,
          fontsize: 13,
          "&.Mui-disabled": {
            backgroundColor: "#edebeb",
          },
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 4,
          minHeight: 36,
          "&.Mui-selected": {
            color: "white",
          },
        },
        labelIcon: {
          flexDirection: "row",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 132,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 4,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {},
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          backgroundImage: `url('/images/bgPageSub.jpg')`,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: `url('/images/caption.jpg')`,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        region: {
          backgroundImage: `url('/images/bgPageSub.jpg')`,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "#5781de",
          color: "white",
          minHeight: 24,
          "&.Mui-expanded": {
            minHeight: 0,
          },
          "&-MuiAccordionSummary-root.Mui-expanded": {
            minHeight: 24,
          },
          backgroundImage: `url('/images/caption.gif')`,
          backgroundPosition: `0px -31px`,
        },
        content: {
          "&.Mui-expanded": {
            margin: 0,
          },
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          lineHeight: 1.2,
        },
      },
    },
    "& .MuiDataGrid-cell": {
      border: 1,
      borderRight: 0,
      borderTop: 0,
      overflowWrap: "break-word",
    },

    MuiDataGrid: {
      styleOverrides: {
        virtualScroller: {
          "& webkit-.scrollbar": {
            width: "0.4em",
            height: "0.4em",
            backgroundColor: "#f1f1f1", // Change scrollbar color
          },
          "& webkit-.scrollbar-thumb": {
            backgroundColor: "#888",
            "&:hover": {
              backgroundColor: "#555",
            },
          },
        },
        root: {
          // backgroundColor: "white",
          // padding: 6,
        },
        row: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#e0f4ffa3", //màu đầu
          },
          "&:nth-of-type(even)": {
            backgroundColor: "#ffffff", // màu 2
          },
          "&:hover, &.Mui-hovered": {
            backgroundColor: "", // hover màu
            "@media (hover: none)": {
              backgroundColor: "",
            },
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            width: "0.4em",
            height: "0.4em",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "&.Mui-selected": {
            backgroundColor: "#50a6a15e", // màu khi click
            // backgroundColor: "#f6f4ff", // màu khi click

            "&:hover, &.Mui-hovered": {
              backgroundColor: "#50a6a15e", // màu khi hover
              "@media (hover: none)": {
                backgroundColor: "#50a6a15e",
              },
            },
          },
        },
        columnHeaders: {
          backgroundColor: "#75829B",
        },
        columnHeader: {
          borderRight: "1px solid rgba(224, 224, 224, 1)",
          backgroundColor: "#75829B",
        },
        columnHeaderRow: {
          backgroundColor: "#75829B",
        },
        columnHeaderDraggableContainer: {
          fontSize: "12px",
          fontWeight: "800",
          fontFamily: "Quicksand, sans-serif",
          color: "#ffffff",
        },
        footerContainer: {
          minHeight: "30px",
          height: "30px",
        },
      },
    },
  },
};


export const setupStyles = styled('div')({
  root: {
    width: 500,
    '& .MuiAutocomplete-inputRoot': {
      padding: '0px !important',
      fontSize: '14px',
      color: '#1E5EF3',
      fontWeight: 500,
    },
    '& .MuiAutocomplete-inputRoot .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1E5EF3',
    },
    '& .MuiAutocomplete-endAdornment': {
      right: '0px !important',
    },
    '&:hover .MuiAutocomplete-inputRoot .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1E5EF3',
    },
    '& .MuiAutocomplete-inputRoot.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1E5EF3',
    },
  },
});
