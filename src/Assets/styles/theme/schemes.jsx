import { tableCellClasses } from '@mui/material/TableCell';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--mui-palette-background-level1)',
        color: 'var(--mui-palette-text-secondary)',
        lineHeight: 1,
      },
    },
  },
}
  export const scrollbarsDataGrid = {
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
  };
