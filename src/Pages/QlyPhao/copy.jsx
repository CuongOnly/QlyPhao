import React from "react";
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
import { styled } from "@mui/system";
import "../../Assets/styles/global.css";
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
import {
  NotePencil,
  Trash,
  ArrowClockwise,
  Copy,
  Export,
  PlusCircle,
  MagnifyingGlass,
} from "@phosphor-icons/react";

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
import MyDateTimeEditor from "../../components/MyDateTimeEditor";
import InsertPhaoEPIRB from "../Cospas/InsertPhaoEPIRB";

const myLib = require("../../lib/MyLib");
const server = require("../../lib/server");
const theme = createTheme({ ...themeOptions });

// Styled component using componentOptions and setupStyles
const default_data_grid = [
  {
    loaiPhao: "Type A",
    idPhao: "A001",
    model: "Model 1",
    ChuSoHuu: "Owner A",
    dateStart: "2024-05-15",
    ttXuLy: "Đã xử lý",
  },
  {
    loaiPhao: "Type B",
    idPhao: "B002",
    model: "Model 2",
    ChuSoHuu: "Owner B",
    dateStart: "2024-05-16",
    ttXuLy: "Chưa xử lý",
  },
  {
    loaiPhao: "Type C",
    idPhao: "C003",
    model: "Model 3",
    ChuSoHuu: "Owner C",
    dateStart: "2024-05-17",
    ttXuLy: "Đã xử lý",
  },
  {
    loaiPhao: "Type D",
    idPhao: "D004",
    model: "Model 4",
    ChuSoHuu: "Owner D",
    dateStart: "2024-05-18",
    ttXuLy: "Chưa xử lý",
  },
  {
    loaiPhao: "Type E",
    idPhao: "E005",
    model: "Model 5",
    ChuSoHuu: "Owner E",
    dateStart: "2024-05-19",
    ttXuLy: "Đã xử lý",
  },
  {
    loaiPhao: "Type F",
    idPhao: "F006",
    model: "Model 6",
    ChuSoHuu: "Owner F",
    dateStart: "2024-05-20",
    ttXuLy: "Chưa xử lý",
  },
  {
    loaiPhao: "Type G",
    idPhao: "G007",
    model: "Model 7",
    ChuSoHuu: "Owner G",
    dateStart: "2024-05-21",
    ttXuLy: "Đã xử lý",
  },
  {
    loaiPhao: "Type H",
    idPhao: "H008",
    model: "Model 8",
    ChuSoHuu: "Owner H",
    dateStart: "2024-05-22",
    ttXuLy: "Chưa xử lý",
  },
  {
    loaiPhao: "Type I",
    idPhao: "I009",
    model: "Model 9",
    ChuSoHuu: "Owner I",
    dateStart: "2024-05-23",
    ttXuLy: "Đã xử lý",
  },
  {
    loaiPhao: "Type J",
    idPhao: "J010",
    model: "Model 10",
    ChuSoHuu: "Owner J",
    dateStart: "2024-05-24",
    ttXuLy: "Chưa xử lý",
  },
];

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
    name: "loaiPhao",
    header: "Loại Phao",
    headerAlign: "center",
    defaultWidth: 150,
  },
  {
    name: "idPhao",
    header: "ID",
    headerAlign: "center",
    defaultWidth: 80,
    textAlign: "center",
  },
  {
    name: "model",
    header: "Model",
    headerAlign: "center",
    defaultWidth: 80,
    textAlign: "center",
  },
  {
    name: "ChuSoHuu",
    header: "Chủ sở hữu",
    headerAlign: "center",
    defaultWidth: 450,
    autoHeight: true,
  },
  {
    name: "dateStart",
    header: "Ngày gửi",
    headerAlign: "center",
    defaultWidth: 450,
    autoHeight: true,
  },

  {
    name: "ttXuLy",
    header: "Trạng thái xử lý",
    headerAlign: "center",
    textAlign: "center",
    defaultWidth: 120,
    render: (props) => {
      const result = props.data.ttXuLy;
      let color = "";
      if (result === "Đã xử lý") {
        color = "magenta";
      } else if (result === "Chưa xử lý") {
        color = "gold";
      } else {
        color = "cyan";
      }
      return (
        <Tag
          style={{ display: "div", width: "100%", justifyContent: "center" }}
          color={color}
        >
          {result}
        </Tag>
      );
    },
  },
];
const defaultSortInfo = {
  id: "idPhao",
  name: "idPhao",
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

class PMSearchPage extends React.Component {
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
      search_dataSource: default_data_grid || [],
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
        ttXuLy: "",
        ChuSoHuu: "",
        idPhao: "",
        loaiPhao: "",
        dateStart: "",
        dateEnd: "",
      },
      openDialogD: false,
      checkActive: "",
      dsThamGia: [],
      rowSelected: undefined, //dang lua chon row nao
      showEditDialog: false, // hien thi form cap nhat hay khong
      edittingRecord: undefined, //ban ghi chon de edit
      showConfirmXoa: false, //hien thi dialog xoa
      hasQuyen: true, //global.hasRoles("CVHH.R41")
      hasThem: global.hasRoles("OMS.R51"),
      hasXuly: global.hasRoles("OMS.R51;OMS.R511"),
    };
  }
  componentDidMount() {
    // this.load_DM_NguoiThamGia();
  }
  // Call API
  loadData = ({ skip, limit, sortInfo }) => {
    var serverSortInfo = this.state.sortInfo
      ? this.state.sortInfo
      : this.state.lastSortInfo;

    var loader = new Promise((resolve, eject) => {
      server
        .post("qlkhcn/dorequest", {
          Function: "Proc_QL_DETAI_KHCN_Search",
          ThamSo: {
            ...this.state.after,
            PageIndex: skip / limit + 1,
            PageSize: limit,
            SortBy: getSortColumnIndex(this.columns_grid, serverSortInfo),
            Ascending: serverSortInfo.dir == 1,
          },
        })
        .then((response) => {
          const startStt =
            this.state.after.PageIndex * this.state.after.PageSize + 1; // lấy số trang hiện tại * số mục trong trang + 1
          this.setState({
            search_loading: false,
            search_error: false,
            search_result: {
              data: response.DataList,
              count: response.DataCount[0].Total,
            },
            rowSelected: undefined,
          });
          resolve({
            data: response.DataList,
            count: response.DataCount[0].Total,
          });
        })
        .catch((error) => {
          var message = "";
          var log = "";
          try {
            var obj = JSON.parse(error);
            message = obj.message;
            log = obj.traceLog;
          } catch (e) {
            message = error + "";
          }
          this.setState({
            search_loading: false,
            search_error: true,
            errorMessage: message,
            errorLog: log,
            search_result: { data: [], count: 0 },
            rowSelected: undefined,
          });
          resolve({ data: [], count: 0 });
        });
    });
    return loader;
  };

  load_DM_NguoiThamGia = () => {
    server
      .post("qlkhcn/dorequest", {
        // apim
        Function: "Proc_Table_GetDSNguoiThamGia",
        ThamSo: {
          TableNames: "UMS_USERS",
        },
      })
      .then((response) => {
        if (response && response.DS_NguoiThamGia) {
          this.setState({ dsThamGia: response.DS_NguoiThamGia });
        } else {
          this.setState({ dsThamGia: [] });
          showError("Lỗi load Danh mục ");
        }
      })
      .catch((error) => {
        showError(error);
        this.setState({ dsThamGia: [] });
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
    var s = this.state;
    s.after[fieldName] = value;
    s.dataChanged = true;
    s.canSaved = s.dataChanged;
    if (fieldName !== "PageIndex") {
      s.after.PageIndex = 1;
    }
    if (
      fieldName !== "PageSize" &&
      fieldName !== "ChuSoHuu" &&
      fieldName !== "idPhao" &&
      fieldName !== "ttXuLy" &&
      fieldName !== "MaDeTai" &&
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
          border:"1px solid #667085"
        }}
      >
        <Form.Item>
          <span>Chủ sở hữu</span>
          <Input />
        </Form.Item>
        <Form.Item>
          <span>ID Phao</span>
          <Input />
        </Form.Item>
        <Form.Item>
          <span>Loại phao</span>
          <Input />
        </Form.Item>
        <Form.Item>
          <span>Từ ngày</span>
          <Input />
        </Form.Item>
        <Form.Item>
          <span>Đến ngày</span>
          <Input />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }}>
          <Button>Tìm kiếm</Button>
        </Form.Item>
      </Form>
    );
    return (
      <main>
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
              <Col style={{ display: "flex", flexDirection: "column", marginLeft:"20px" }}>
                <span style={{margin:"3px"}}>Trạng thái xử lý</span>
                <Select
                  style={{ width: 200 }}
                  placeholder="Trạng thái xử lý ..."
                  // onChange={handleChange}
                  options={[
                    { label: <span>Đã xử lý</span>, value: "Đã xử lý" },
                    { label: <span>Chưa xử lý</span>, value: "Chưa xử lý" },
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
                marginBottom:"5px"
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
                          padding:"5px"
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
                          padding:"5px"
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
                          padding:"5px"
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
                          padding:"5px"
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
                        padding:"5px"
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
        <div container spacing={1}>
          <div item xs={12}>
            <ReactDataGrid
              style={{ height: "calc(100vh - 106px)", fontSize: 12 }}
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
              enableSelection = {false}
              onSelectionChange={({ data, selected, unselected }) => {
                var now = new Date().getTime();
                var diff = now - this.state.lastClick;
                if (diff < 300) {
                  this.setState({
                    rowSelected: data,
                    edittingRecord: data,
                    showEditDialog: true, // Hiển thị hộp thoại chỉnh sửa khi nhấp đúp
                  });
                } else {
                  this.setState({ rowSelected: data });
                }
                this.setState({ lastClick: now });
              }}
            ></ReactDataGrid>
          </div>
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
{this.state.showEditDialog ? (
          <InsertPhaoEPIRB
            edittingRecord={this.state.edittingRecord}
            openPhaoEPIRB={this.state.openPhaoEPIRB}
            // onOpen={true}
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
                  openPhaoEPIRB: false 
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
                  //thuc hien xoa
                  this.setState({ saving: true });
                  this.setState({ loading_delete: true });
                  server
                    .post("qlkhcn/dorequest", {
                      Function: "Proc_QL_DETAI_KHCN_Delete",
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
      </main>
    );
  }
}
export default PMSearchPage;
