import React from "react";
import {
  FormLabel,
  MenuItem,
  TextField,
  IconButton,
  Box,
  Autocomplete,
} from "@mui/material";
import {
  Badge,
  Button,
  Col,
  Dropdown,
  div,
  Input,
  Menu,
  Row,
  Select,
  Tag,
  Tooltip,
  Form,
} from "antd";
import moment from "moment";

import { createTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/base.css";
import "@inovua/reactdatagrid-community/theme/blue-light.css";
import "@inovua/reactdatagrid-community/theme/blue-dark.css";
import "@inovua/reactdatagrid-community/theme/amber-light.css";
import "@inovua/reactdatagrid-community/theme/amber-dark.css";
import "@inovua/reactdatagrid-community/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  componentOptions,
  setupStyles,
} from "../../Assets/styles/theme/ComponentOptions/ComponentOptions";
import { themeOptions } from "../../Assets/styles/theme/ThemeOptions/ThemeOptions";
import { styled, textAlign, width } from "@mui/system";
import "../../Assets/styles/global.css";
import {
  NotePencil,
  Trash,
  ArrowClockwise,
  Copy,
  Export,
  PlusCircle,
  ProjectorScreen,
  ArrowLeft,
} from "@phosphor-icons/react";
import "../../Assets/styles/theme/antd.css";
import { StepForwardOutlined } from '@ant-design/icons';
import ConfirmDialog from "../../components/ConfirmDialog";
import PhanMemExportEx from "../../components/PhanMemExportEx";
import {
  loadDataError,
  handleServerError,
  ReactDataGrid_i18n,
  showSuccess,
  showError,
} from "../../lib/common";
import ParticipantAvatarDialog from "../../components/ParticipantAvatarDialog";
import InsertPhaoEPIRB from "../Cospas/InsertPhaoEPIRB";
import ModalUpdateStatus from "../Cospas/ModalUpdateStatus";
import DateRangePicker from "../../components/DateRangePicker";
import CreateRedirect from "./CreateRedirect";

const myLib = require("../../lib/MyLib");
const server = require("../../lib/server");
const theme = createTheme({ ...themeOptions });

// Styled component using componentOptions and setupStyles

const default_columns_grid = [
  {
    name: "_STT",
    header: "STT",
    headerAlign: "center",
    defaultWidth: 70,
    textAlign: "center",
    render: ({ rowIndex }) => rowIndex + 1,
    // render: ({ data, rowIndex }) => (pageIndex - 1) * pageSize + rowIndex + 1,
  },
  {
    name: "TypePhao",
    header: "Loại phao",
    headerAlign: "center",
    textAlign: "center",
    defaultWidth: 100,
    render: ({ value }) => {
      switch (value) {
        case "1":
          return "EPIRB";
        case "2":
          return "ELT";
        case "3":
          return "PLB";
        default:
          return value;
      }
    },
  },
  {
    name: "IdChar",
    header: "ID Phao",
    headerAlign: "center",
    defaultWidth: 180,
    textAlign: "center",
  },
  {
    name: "O_Name",
    header: "Chủ sở hữu",
    headerAlign: "center",
    textAlign: "center",
    defaultWidth: 280,
  },
  {
    name: "O_WorkPhone",
    header: "Số điện thoại cơ quan",
    headerAlign: "center",
    textAlign: "center",
    defaultWidth: 180,
    autoHeight: true,
    cellClass: "normalLineHeight",
  },
  {
    name: "O_Email",
    header: "Email chủ sở hữu",
    headerAlign: "center",
    textAlign: "center",
    defaultWidth: 280,
    autoHeight: true,
    cellClass: "normalLineHeight",
  },
  {
    name: "NgayCN",
    header: "Ngày cập nhật",
    // description: "This column has a value getter and is not sortable.",
    // sortable: false,
    width: 180,
    headerAlign: "center",
    render: (params) => moment(params.NgayCN).format("HH:mm DD/MM/YYYY"),
  },

  {
    name: "XuLy",
    header: "Trạng thái",
    width: 180,
    headerAlign: "center",
    textAlign: "center",
    render: ({ value }) => {
      switch (value) {
        case "0":
          return (
            <Tag
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
              color="magenta"
            >
              Chờ xử lý
            </Tag>
          );
        case "1":
          return (
            <Tag
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
              color="gold"
            >
              Đã xử lý
            </Tag>
          );
        default:
          return value;
      }
    },
  },
];
const defaultSortInfo = {
  id: "TenDeTai",
  name: "TenDeTai",
  dir: 1,
  type: "string",
};
//tra ve index column tuy theo sort infor
const getSortColumnIndex = (columns, sortInfor) => {
  var find_index = 0;
  for (var i = 0; i < columns.length; i++) {
    var item = columns[i];
    if (item.name == sortInfor.name) {
      find_index = i;
      break;
    }
  }
  return find_index;
};

class PhaoSearchPage extends React.Component {
  selectionCounter = 0; //dem so lan click chon thong tin tau
  constructor(props) {
    super(props);
    this.columns_grid =
      global.grid_columns !== undefined &&
      global.grid_columns[this.constructor.name] !== undefined
        ? global.grid_columns[this.constructor.name]
        : default_columns_grid;
    this.state = {
      canSaved: false, //cho phep save hay khong
      dataChanged: false, //du lieu co su thay doi hay khong
      saving: false, //co dang save du lieu hay khong
      errorMessage: "", //mo ta loi neu co
      errorLog: "", //mo ta chi tiet loi
      loading_coquan: true, // co dang load ding danh muc nguon tin ko
      //searching
      search_loading: false,
      search_result: { data: [], count: 0 }, //ket qua tim kiem
      search_dataSource: [],
      search_error: false, //search co loi khong
      loading_delete: false,
      openDialog_Delete: false,
      lastClick: 0, //danh dau lan click truoc do' cua grid de xu ly double click
      lastSortInfo: defaultSortInfo, //vi grid co trang thai sortinfo = null nen phai co cai nay
      sortInfo: defaultSortInfo,
      after: {
        PageIndex: 1,
        PageSize: 20,
        Ascending: true,
        SortBy: getSortColumnIndex(this.columns_grid, defaultSortInfo), //index column duoc sap xep
        //tieu chi tim kiem
        IdChar: "",
        O_Name: "",
        NgayCNStart: "",
        NgayCNEnd: "",
        XuLy: "",
      },
      checkboxClicked: false,
      checkActive: "",
      dsThamGia: [],
      rowSelected: undefined, //dang lua chon row nao
      showEditDialog: false, // hien thi form cap nhat hay khong
      edittingRecord: undefined, //ban ghi chon de edit
      showConfirmXoa: false, //hien thi dialog xoa
      hasQuyen: true, //global.hasRoles("CVHH.R41")
      hasThem: global.hasRoles("OMS.R51"),
      hasXuly: global.hasRoles("OMS.R51;OMS.R511"),
      updateStatusRow: false,
      openConfirmDialog: false,
    };
    console.log(this.state.batngu);
  }
  componentDidMount() {
    // this.load_DM_NguoiThamGia();
  }
  // Call API
  loadData = ({ skip, limit, sortInfo }) => {
    var serverSortInfo = this.state.sortInfo
      ? this.state.sortInfo
      : this.state.lastSortInfo;
    const startTime = Date.now();
    console.log("Starting API call at:", startTime);

    const dataLoader = server.post("qlmc/dorequest", {
      Function: "Proc_QL_PM_CPMS_Search",
      ThamSo: {
        ...this.state.after,
        PageIndex: skip / limit + 1,
        PageSize: limit,
        SortBy: getSortColumnIndex(this.columns_grid, serverSortInfo),
        Ascending: serverSortInfo.dir == 1,
      },
    });

    // const participantsLoader = server.post("qlkhcn/dorequest", {
    //   Function: "Proc_Table_GetDSNguoiThamGia",
    //   ThamSo: {
    //     TableNames: "UMS_USERS",
    //   },
    // });
    // return Promise.all([dataLoader, participantsLoader])
    return Promise.all([dataLoader])
      .then(([dataResponse, participantsResponse]) => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // duration in seconds
        console.log("API call ended at:", endTime, "Duration (s):", duration);
        const startStt =
          this.state.after.PageIndex * this.state.after.PageSize + 1; // lấy số trang hiện tại * số mục trong trang + 1

        this.setState({
          search_loading: false,
          search_error: false,
          search_result: {
            data: dataResponse.DataList,
            count: dataResponse.DataCount[0].Total,
          },
          rowSelected: undefined,
          // dsThamGia:
          //   participantsResponse && participantsResponse.DS_NguoiThamGia
          //     ? participantsResponse.DS_NguoiThamGia
          //     : [],
        });

        return {
          data: dataResponse.DataList,
          count: dataResponse.DataCount[0].Total,
          // participants: participantsResponse.DS_NguoiThamGia,
        };
      })
      .catch((error) => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000; // duration in seconds
        console.log("API call ended at:", endTime, "Duration (s):", duration);
        showError(error);
        let message = "";
        let log = "";
        try {
          const obj = JSON.parse(error);
          message = obj.message;
          log = obj.traceLog;
        } catch (e) {
          message = error.toString();
        }

        this.setState({
          search_loading: false,
          search_error: true,
          errorMessage: message,
          errorLog: log,
          search_result: { data: [], count: 0 },
          rowSelected: undefined,
          dsThamGia: [],
        });

        return { data: [], count: 0, participants: [] };
      });
  };

  //Thuc hien search
  doSearch = () => {
    var loader = this.loadData({
      skip: (this.state.after.PageIndex - 1) * this.state.after.PageSize,
      limit: this.state.after.PageSize,
      sortInfo: this.state.sortInfo,
    });
    this.setState({
      search_loading: true,
      search_dataSource: loader, //chi load sau khi co danh muc
      selectedRecord: {},
    });
  };

  // Save Data
  saveField = (fieldName, value) => {
    console.log(this.state.after.NgayCNStart);
    console.log(this.state.after.NgayCNEnd);
    var s = this.state;
    s.after[fieldName] = value;
    s.dataChanged = true;
    s.canSaved = s.dataChanged;
    if (fieldName !== "PageIndex") {
      s.after.PageIndex = 1;
    }
    if (
      fieldName !== "PageSize" &&
      fieldName !== "XuLy" &&
      fieldName !== "O_Name" &&
      fieldName !== "IdChar" &&
      // fieldName !== "NgayCNStart" &&
      // fieldName !== "NgayCNEnd" &&
      fieldName !== "PageIndex" &&
      fieldName !== "SortBy"
    ) {
      this.setState(this.state);
    } else {
      //neu lien quan den phan trang, sap xep thi load lai du lieu tu server
      this.setState(this.state, () => {
        this.doSearch();
      });
    }
    this.setState(this.state);
  };
  saveData = (obj) => {
    var old_changed = this.state.dataChanged;
    var s = this.state;
    s = { ...s, after: { ...s.after, ...obj } };
    s.dataChanged = true;
    s.canSaved = s.dataChanged;
    this.setState(s);
  };

  //khi thay doi sap xep cot
  onSortInfoChange = (value) => {
    const newSort = value
      ? { type: value.type, name: value.name, dir: value.dir }
      : value;
    //ghi nhan vao sort by
    this.setState(
      {
        lastSortInfo: this.state.sortInfo
          ? this.state.sortInfo
          : this.state.lastSortInfo,
        sortInfo: newSort,
      },
      () => this.doSearch()
    );
  };

  //call khi user thay doi trang
  static getDerivedStateFromProps(nextProps, prevState) {
    return { open: nextProps.open };
  }
  handleOpenUpdateStatus = () => {
    this.setState({ updateStatusRow: true });
  };
  handleClose(selection) {
    this.props.close(selection);
  }

  render() {
    const menu = (
      <Form
        style={{
          width: "400px",
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #667085",
        }}
      >
        <Form.Item>
          <span>Chủ sở hữu</span>
          <Input
            value={this.state.after.O_Name}
            onChange={(e) => this.saveField("O_Name", e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <span>ID Phao</span>
          <Input
            value={this.state.after.IdChar}
            onChange={(e) => this.saveField("IdChar", e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <span>Từ ngày</span> <br />
          <DateRangePicker
            value={this.state.after.NgayCNStart}
            fullwidth
            saveField={(value) => this.saveField("NgayCNStart", value)}
          />
        </Form.Item>
        <Form.Item>
          <span>Đến ngày</span> <br />
          <DateRangePicker
            value={this.state.after.NgayCNEnd}
            fullwidth
            saveField={(value) => this.saveField("NgayCNEnd", value)}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button onClick={this.doSearch}>Tìm kiếm</Button>
        </Form.Item>
      </Form>
    );
    return (
      <main style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            right: "3rem",
            zIndex: 1,
          }}
        >
          <Button type="primary" className="create-button" onClick={this.props.handleHomeClick}>
          <span>&#8592;</span>
          </Button>
        </div>

        <div>
          <Row
            container
            spacing={1}
            style={{ justifyContent: "space-between", height: "60px" }}
          >
            <div
              style={{
                margin: "0px 40px 5px 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Col
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                }}
              >
                <span style={{ margin: "3px" }}>Trạng thái xử lý</span>
                <Select
                  style={{ width: 200 }}
                  placeholde="Trạng thái xử lý ..."
                  value={this.state.after.XuLy}
                  defaultValue={"0"}
                  onChange={(value) => {
                    console.log(this.state.after.XuLy);
                    this.saveField("XuLy", value);
                  }}
                  options={[
                    { label: <span>Đã xử lý</span>, value: "1" },
                    { label: <span>Chưa xử lý</span>, value: "0" },
                  ]}
                />
              </Col>
              <Dropdown
                arrow={{ pointAtCenter: true }}
                trigger={["click"]}
                overlay={menu}
                placement="bottomLeft"
              >
                <Button style={{ marginLeft: "10px" }}>Lọc</Button>
              </Dropdown>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                marginBottom: "5px",
              }}
            >
              {this.state.hasQuyen ? (
                <Col style={{ marginRight: "5px" }}>
                  <Tooltip
                    title="Export Excel"
                    disabled={this.state.rowSelected === undefined}
                    onClick={() =>
                      PhanMemExportEx(
                        this.state.search_result.data,
                        default_columns_grid
                      )
                    }
                  >
                    <Badge>
                      <Button
                        style={{
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                        }}
                      >
                        <Export size={18} color="#286090" weight="bold" />
                      </Button>
                    </Badge>
                  </Tooltip>
                </Col>
              ) : null}
              {this.state.hasQuyen && this.state.rowSelected ? (
                <Col style={{ marginRight: "5px" }}>
                  <Tooltip
                    title="Cập nhật trạng thái"
                    disabled={this.state.rowSelected === undefined}
                    onClick={() => this.handleOpenUpdateStatus()}
                  >
                    <Badge>
                      <Button
                        style={{
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                        }}
                        onClick={() =>
                          this.setState({ openModalUpdateStatus: true })
                        }
                      >
                        <ProjectorScreen
                          size={18}
                          color="#286090"
                          weight="bold"
                        />
                      </Button>
                    </Badge>
                  </Tooltip>
                </Col>
              ) : null}
              {this.state.hasQuyen && this.state.rowSelected ? (
                <Col style={{ marginRight: "5px" }}>
                  <Tooltip
                    title="Nhân bản"
                    disabled={this.state.rowSelected === undefined}
                    onClick={() => {
                      this.setState({
                        showEditDialog: true,
                        edittingRecord: this.state.rowSelected,
                        checkActive: "Copy",
                      });
                    }}
                  >
                    <Badge>
                      <Button
                        style={{
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                        }}
                      >
                        <Copy size={18} color="#286090" weight="bold" />
                      </Button>
                    </Badge>
                  </Tooltip>
                </Col>
              ) : null}

              {this.state.hasQuyen && this.state.rowSelected ? (
                <Col style={{ marginRight: "5px" }}>
                  <Tooltip
                    title="Sửa demo"
                    disabled={this.state.rowSelected === undefined}
                    onClick={() => {
                      this.setState({
                        showEditDialog: true,
                        edittingRecord: this.state.rowSelected,
                        checkActive: "Edit",
                        openDialogD: true,
                      });
                    }}
                  >
                    <Badge>
                      <Button
                        style={{
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                        }}
                      >
                        <NotePencil size={18} color="#286090" weight="bold" />
                      </Button>
                    </Badge>
                  </Tooltip>
                </Col>
              ) : null}
              {this.state.hasQuyen && this.state.rowSelected ? (
                <Col style={{ marginRight: "5px" }}>
                  <Tooltip
                    title="Xóa"
                    disabled={this.state.rowSelected === undefined}
                    onClick={() => {
                      this.setState({ showConfirmXoa: true });
                    }}
                  >
                    <Badge>
                      <Button
                        style={{
                          width: "40px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                        }}
                      >
                        <Trash size={18} color="#286090" weight="bold" />
                      </Button>
                    </Badge>
                  </Tooltip>
                </Col>
              ) : null}
              <Col>
                <Tooltip title="Tải lại" onClick={this.doSearch}>
                  <Badge>
                    <Button
                      style={{
                        width: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "5px",
                      }}
                    >
                      <ArrowClockwise size={18} color="#286090" weight="bold" />
                    </Button>
                  </Badge>
                </Tooltip>
              </Col>
            </div>
          </Row>
        </div>
        <div style={{ height: 2 }}></div>
        <div container spacing={1}>
          <div item xs={12}>
            <ReactDataGrid
              style={{ height: "calc(100vh - 147px)", fontSize: 12 }}
              showZebraRows={true}
              i18n={ReactDataGrid_i18n}
              columns={this.columns_grid}
              pagination={true}
              multiSelect={false}
              checkboxColumn={{
                render: (props) => (
                  <input
                    type="checkbox"
                    readOnly
                    checked={props.rowSelected}
                  ></input>
                ),
              }}
              defaultLimit={25}
              limit={this.state.after.PageSize}
              skip={
                (this.state.after.PageIndex - 1) * this.state.after.PageSize
              }
              onSkipChange={(skip) => {
                this.saveField(
                  "PageIndex",
                  skip / this.state.after.PageSize + 1
                );
              }}
              dataSource={this.state.search_dataSource}
              idProperty="IDDeTai"
              rowHeight={40}
              defaultSortInfo={defaultSortInfo}
              onSortInfoChange={this.onSortInfoChange}
              onLimitChange={(v) => this.saveField("PageSize", v)}
              emptyText={loadDataError(
                this.state.search_error,
                this.state.search_result.data.length === 0,
                this.state.errorMessage,
                this.state.errorLog
              )}
              skipLoadOnMount={true}
              enableSelection
              onSelectionChange={({ data, selected, unselected }) => {
                var now = new Date().getTime();
                var diff = now - this.state.lastClick;
                if (diff < 300) {
                  this.setState({
                    rowSelected: data,
                    edittingRecord: data,
                    showEditDialog: true, // Hiển thị hộp thoại chỉnh sửa khi nhấp đúp
                  });
                  console.log(this.state.rowSelected);
                  console.log(this.state.edittingRecord);
                } else {
                  this.setState({ rowSelected: data });
                  console.log(this.state.rowSelected);
                }
                this.setState({ lastClick: now });
              }}
            ></ReactDataGrid>
          </div>
          <div item xs={12}></div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={false}
          hideProgressBar
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          style={{ fontSize: 12, width: 750 }}
          limit={5}
        />

        {this.state.showEditDialog &&
        this.state.rowSelected.TypePhao === "1" ? (
          <InsertPhaoEPIRB
            edittingRecord={this.state.edittingRecord}
            openPhaoEPIRB={true}
            onPrint={this.props.onPrint}
            CNTrangThai={this.handleOpenUpdateStatus}
            doSearch={this.doSearch}
            onDelete={this.state.showConfirmXoa}
            checkActive={this.state.checkActive}
            closePhaoEPIRB={(record) => {
              this.setState(
                {
                  showEditDialog: false,
                  edittingRecord: undefined,
                  rowSelected: undefined,
                  checkActive: "",
                }
                //() => this.doSearch()
              );
            }}
          />
        ) : null}
        {this.state.showConfirmXoa ? (
          <ConfirmDialog
            handleDeleteConfirmed={(ok) => {
              if (!this.state.saving) {
                if (ok) {
                  console.log(this.state.rowSelected);
                  //thuc hien xoa
                  this.setState({ saving: true });
                  this.setState({ loading_delete: true });
                  server
                    .post("qlmc/dorequest", {
                      Function: "Proc_QL_PM_CPMS_Delete",
                      ThamSo: this.state.rowSelected,
                    })
                    .then((response) => {
                      this.setState({ showConfirmXoa: false, saving: false });
                      //reload
                      this.doSearch();
                      this.setState({ loading_delete: false });
                      showSuccess("Xóa thành công !");
                      this.setState({ openDialog_Delete: false });
                    })
                    .catch((error) => {
                      this.setState({ saving: false, showConfirmXoa: false });
                      handleServerError(error);
                      this.setState({ loading_delete: false });
                    });
                } else {
                  this.setState({ showConfirmXoa: false });
                }
              }
            }}
            dataRow={this.state.rowSelected}
            title="Thông báo"
            content="Bạn có chắc chắn muốn xóa dữ liệu này ?"
            onOpenConfirm={() => this.setState({ showConfirmXoa: true })}
            onCloseDialog={() => this.setState({ showConfirmXoa: false })}
            isDeleting={this.state.loading_delete}
          />
        ) : null}
        {/* <div
          item
          xs={2}
          sx={{ position: "absolute", bottom: "10px", right: "3rem" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              this.setState({
                showEditDialog: true,
                rowSelected: undefined,
                checkActive: "Create",
              });
            }}
          >
            <PlusCircle size="medium" />
          </Button>
        </div> */}
        {this.state.updateStatusRow ? (
          <ModalUpdateStatus
            onClose={() => this.setState({ updateStatusRow: false })}
            onOpen={this.handleOpenUpdateStatus}
          />
        ) : null}
      </main>
    );
  }
}
export default PhaoSearchPage;
