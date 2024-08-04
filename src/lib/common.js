import { toast } from "react-toastify";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import 'react-toastify/dist/ReactToastify.css';

const myLib = require("./MyLib");
const server = require("./server");
/**Cac dinh nghia dung chung */
export const filterStyles = {
  option: (base, state) => ({
    ...base,
    fontSize: 12,
    padding: 2,
  }),
  control: (base, state) => {
    return {
      // none of react-select's styles are passed to <Control />
      ...base,
      minHeight: 20,
      border: state.selectProps.error ? "1px solid red" : undefined,
    };
  },
  input: (base) => ({ ...base, fontSize: 12 }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    fontSize: 13,
  }),
  indicatorsContainer: (base, state) => ({ ...base, maxHeight: 24 }),
  indicatorContainer: (base, state) => {
    return {
      paddingTop: 0,
      paddingBottom: 0,
      backgroundColor: "yellow",
    };
  },
};
export const formStyles = (theme) => ({
  red: {
    color: "white",
    backgroundColor: "#fc9003",
  },
  blue: {
    color: "white",
    backgroundColor: "#0384fc",
  },
  uppercaseText: {
    textTransform: "uppercase",
  },
  quantrong: {
    fontWeight: "bold !important",
  },
  colorBlue: {
    color: "blue",
  },
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

export const loadDataError = (error, empty, log, trace) => {
  return !error ? (
    <b
      style={{
        padding: 8,
        border: "1px solid #7986cb",
        color: "#0000ff",
        borderRadius: 4,
      }}
    >
      {error ? log : empty ? "Không có bản ghi nào!" : ""}
    </b>
  ) : (
    <a
      href="#"
      style={{ textDecoration: "none" }}
      onClick={() =>
        toast.error(trace, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        })
      }
    >
      <b
        style={{
          padding: 8,
          border: "1px solid #7986cb",
          color: "red",
          borderRadius: 4,
        }}
      >
        {error ? log : empty ? "Không có bản ghi nào!" : ""}
      </b>
    </a>
  );
};
export const handleServerError = (error) => {
  var message = "";
  var log = "";
  try {
    var obj = JSON.parse(error);
    message = obj.message;
    log = obj.traceLog;
    var log_detail = JSON.parse(log);
    /*
    if (log_detail && log_detail.Message) {
      message += "\n<br>" + log_detail.Message;
      if (log_detail.ExceptionMessage) {
        message = log_detail.ExceptionMessage + "\n" + message;
      }
    }*/
    if (log_detail && log_detail.Error) {
      message += ":" + log_detail.Error.Message;
    }
  } catch (e) {
    message = error + "";
  }
  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
export const showError = (error) => {
  toast.error(error + "", {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
export const showSuccess = (error) => {
  toast.success(error + "", {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
export const showWarning = (error) => {
  toast.warning(error + "", {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
export const showDone = (error) => {
  toast.info(error + "", {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  });
};
//thong tin label tren phan trang grid
export const ReactDataGrid_i18n = Object.assign(
  {},
  ReactDataGrid.defaultProps.i18n,
  {
    showingText: "Đang hiển thị bản ghi ",
    pageText: "Trang:",
    ofText: "/",
    perPageText: "Bản ghi mỗi trang:",
  }
);
//cau hinh mac dinh cua grid
export const ReactDataGrid_default = (english) => {
  return {
  showColumnMenuTool: false,
  showZebraRows: true,
  i18n: english ? undefined : ReactDataGrid_i18n,
  multiSelect: false,
  showHoverRows: false,
  checkboxColumn: {
    render: (props) => (
      <input type="checkbox" readOnly checked={props.rowSelected}></input>
    ),
  },
  defaultLimit: 20,
  headerHeight: 30,
  rowHeight: 30,
  allowUnsort: true,
  skipLoadOnMount: false,
};}


