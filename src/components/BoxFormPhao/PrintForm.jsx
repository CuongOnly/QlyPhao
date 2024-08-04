import { Modal } from "antd";
import React from "react";
import "../BoxFormPhao/PrintForm.css";

export default function PrintForm({ isEditRow, visible, onClose }) {
  console.log(isEditRow.IdChar);
  return (
    <Modal
      visible={visible}
      title="BẢN KHAI DỮ LIỆU PHAO EPIRB"
      onCancel={onClose}
      footer={null}
      width="1200px"
      style={{ backgroundColor: "f5f5f5" }}
    >
      <div className="printForm">
        <div className="container1">
          <div className="BanKhai">
            <h4>BẢN KHAI DỮ LIỆU PHAO EPIRB</h4>
            <span>(EPIRB Data Declaration)</span>
          </div>
          <div className="content">
            <span className="f-s-16 f-w">
              Thông tin EPIRB{" "}
              <span className="f-s-10 italic">(EPIRB Information)</span>
            </span>
            <div>
              <table cellspacing="0">
                <tbody>
                  <tr>
                    <td className="td_Table" align="center">
                      C
                    </td>
                    <td className="td_Table" align="center">
                      7
                    </td>
                    <td className="td_Table" align="center">
                      C
                    </td>
                    <td className="td_Table" align="center">
                      8
                    </td>
                    <td className="td_Table" align="center">
                      D
                    </td>
                    <td className="td_Table" align="center">
                      7
                    </td>
                    <td className="td_Table" align="center">
                      5
                    </td>
                    <td className="td_Table" align="center">
                      0
                    </td>
                    <td className="td_Table" align="center">
                      5
                    </td>
                    <td className="td_Table" align="center">
                      4
                    </td>
                    <td className="td_Table" align="center">
                      3
                    </td>
                    <td className="td_Table" align="center">
                      0
                    </td>
                    <td className="td_Table" align="center">
                      4
                    </td>
                    <td className="td_Table" align="center">
                      D
                    </td>
                    <td className="td_Table" align="center">
                      1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="container1Check">
              <div className="typeCheck">
                <input type="checkbox" checked />
                <span>Loại 1 (Phát tự động hoặc thủ công)</span>
                <br />
                <span class="p_en">
                  (Category 1) (Automatic/Manual Activation)
                </span>
              </div>
              <div>
                <input type="checkbox" checked />
                <span>Loại 2 (Phát thủ công)</span>
                <br />
                <span>(Category 2) (Manual Activation)</span>
              </div>
            </div>

            <span>Nhà sản xuất EPIRB (EPIRB Manufacturer): SAMYUNG</span>
            <div className="model_sri">
              <span className="w-8cm" style={{ float: "left" }}>
                Mẫu (Model): <span className="luachon">{isEditRow.Model}</span>
              </span>
              <span style={{ float: "left" }}>
                Số Serial (Serial No.):{" "}
                <span className="luachon">{isEditRow.Serial}</span>
              </span>
            </div>
            <br />

            <div>
              <span className="w-8cm fl-left">
                Thiết bị định vị phụ trợ{" "}
                <span className="f-s-10 italic">(Homing Beacon Device)</span>:
              </span>
              <div className="fl-left d-flex j-c-bw">
                <div>
                  <input type="checkbox" checked />
                  <span>121.5 MHz</span>
                </div>
                <div>
                  <input type="checkbox" checked />
                  <span>SART</span>
                </div>
                <div>
                  <input type="checkbox" checked />
                  <span>
                    Không có <span className="f-s-10 italic">(None)</span>
                  </span>
                </div>
                <div>
                  <input type="checkbox" checked />
                  <span>
                    Khác <span className="f-s-10 italic">(Other)</span>
                  </span>
                </div>
              </div>
            </div>
            <br />
            <span>
              Thông tin khác{" "}
              <span className="f-s-10 italic">(Other Information)</span>:{" "}
              <span className="luachon">{isEditRow.ThongTinKhac}</span>
            </span>
          </div>
        </div>
        <div className="container1">
          <span className="f-s-16 f-w">
            Dữ liệu phao EPIRB{" "}
            <span className="f-s-10 italic">(EPIRB'S data)</span>
          </span>
          <div className="d-flex t-al-center">
            <div>
              <input type="checkbox" checked />
              <span>
                Cung cấp mới <span className="f-s-10 italic">(New Supply)</span>
              </span>
            </div>
            <div className="mg-l-4rem">
              <input type="checkbox" checked />
              <span>
                Thay đổi thông tin EPIRB hoặc chủ tàu{" "}
                <span className="f-s-10 italic">
                  (Change of EPIRB Information or Ship Owner Information)
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="container1">
          <span className="f-s-16 f-w">
            Thông tin về chủ sở hữu phao{" "}
            <span className="f-s-10 italic">(EPIRB - Owner Information)</span>
          </span>
          <br />
          <span>
            Tên <span className="f-s-10 italic">(Name)</span>:{" "}
            <span className="luachon">{isEditRow.O_Name}</span>
          </span>
          <br />
          <span>
            Tên giao dịch{" "}
            <span className="f-s-10 italic">(International Name)</span>:{" "}
            <span className="luachon">{isEditRow.O_Name_International}</span>
          </span>
          <br />
          <div className="d-flex">
            <span className="w-12cm">
              Địa chỉ <span className="f-s-10 italic">(Address)</span>:{" "}
              <span className="luachon">{isEditRow.O_Address}</span>
            </span>
            <span className="mg-l-10px">
              Tỉnh/ Thành phố{" "}
              <span className="f-s-10 italic">(Province/City)</span>:{" "}
              <span className="luachon">{isEditRow.O_City}</span>
            </span>
          </div>
          {/* ******************** */}
          <div className="d-flex">
            <span className="w-12cm">
              Mã bưu điện <span className="f-s-10 italic">(Postal Code)</span>:{" "}
              <span className="luachon">{isEditRow.O_PostalCode}</span>
            </span>
            <span className="mg-l-10px">
              Nước <span className="f-s-10 italic">(Country)</span>:{" "}
              <span className="luachon">{isEditRow.O_Country}</span>
            </span>
          </div>
          {/* ******************** */}
          <div className="d-flex">
            <span className="w-12cm">
              Điện thoại cơ quan{" "}
              <span className="f-s-10 italic">(Phone Office)</span>:{" "}
              <span className="luachon">{isEditRow.O_WorkPhone}</span>
            </span>
            <span className="">
              Điện thoại Nhà riêng{" "}
              <span className="f-s-10 italic">(Phone Home)</span>:{" "}
              <span className="luachon">{isEditRow.O_HomePhone}</span>
            </span>
          </div>
          {/* ******************** */}
          <div className="d-flex">
            <span className="w-12cm">
              Fax <span className="f-s-10 italic">(Fax No)</span>:{" "}
              <span className="luachon">{isEditRow.O_Fax}</span>
            </span>
            <span className="">
              Email <span className="f-s-10 italic">(Email)</span>:{" "}
              <span className="luachon">{isEditRow.O_Email}</span>
            </span>
          </div>
        </div>
        <div className="container1">
          <span className="f-s-16 f-w">
            Thông tin về tàu/Công trình biển ngoài khơi{" "}
            <span className="f-s-10 italic">
              (Vessel’s / Offshore Installation Information)
            </span>
          </span>

          <span>
            Tên tàu/Công trình biển ngoài khơi{" "}
            <span className="f-s-10 italic">
              (Name of vessel/ Offshore Installation)
            </span>
            : <span className="luachon">{isEditRow._Name}</span>
          </span>
          <br />

          {/* ******************** */}
          <div className="d-flex">
            <span className="w-12cm">
              Số MMSI <span className="f-s-10 italic">(MMSI Number)</span>:{" "}
              <span className="luachon">{isEditRow._SoDangKy}</span>
            </span>
            <span className="">
              Hô hiệu <span className="f-s-10 italic">(Call Sign)</span>:{" "}
              <span className="luachon">{isEditRow._HoHieu}</span>
            </span>
          </div>
          {/* ************** */}
          <span className="w-8cm fl-left">
            Loại tàu <span className="f-s-10 italic">(Type of vessel)</span>:
          </span>
          <div className="fl-left d-flex j-c-bw">
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu cá<span className="f-s-10 italic">(Fishing)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu hàng<span className="f-s-10 italic">(Cargo)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu kéo<span className="f-s-10 italic">(Tug)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu dầu<span className="f-s-10 italic">(Tanker)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Khác<span className="f-s-10 italic">(Other)</span>{" "}
              </span>
            </div>
          </div>
          {/* ??? */}
          <br />
          <br />
          {/* ************** */}
          <div className="d-flex">
            <span className="w-12cm">
              Màu thân tàu <span className="f-s-10 italic">(Vessel Color)</span>
              : <span className="luachon">{isEditRow._Color}</span>
            </span>
            <span className="">
              Chiều dài <span className="f-s-10 italic">(Length)</span>:{" "}
              <span className="luachon">{isEditRow._ChieuDai}</span>
            </span>
          </div>
          {/* ************ */}
          <span className="w-8cm fl-left">
            Loại tàu <span className="f-s-10 italic">(Type of vessel)</span>:
          </span>
          <br />
          <div className="fl-left d-flex j-c-bw">
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu cá<span className="f-s-10 italic">(Fishing)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu hàng<span className="f-s-10 italic">(Cargo)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu kéo<span className="f-s-10 italic">(Tug)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Tàu dầu<span className="f-s-10 italic">(Tanker)</span>{" "}
              </span>
            </div>
            <div>
              <input type="checkbox" checked />
              <span>
                Khác<span className="f-s-10 italic">(Other)</span>{" "}
              </span>
            </div>
          </div>
          <br />
          {/* ************* */}
          <div className="d-flex">
            <span className="w-12cm">
              Số INMARSAT <span className="f-s-10 italic">(INMARSAT No.)</span>:{" "}
              <span className="luachon">{isEditRow._INM}</span>
            </span>
            <span className="">
              Số IMO <span className="f-s-10 italic">(IMO Number)</span>:{" "}
              <span className="luachon">{isEditRow._IMO}</span>
            </span>
          </div>
          {/* ************* */}
          <div className="d-flex">
            <span className="w-12cm">
              Số thuyền viên và hành khách{" "}
              <span className="f-s-10 italic">
                ((Number Of Crew And Passengers))
              </span>
              : <span className="luachon">{isEditRow._SLNguoi}</span>
            </span>
            <span className="">
              Trọng tải <span className="f-s-10 italic">(DWT)</span>:{" "}
              <span className="luachon">{isEditRow._TrongTai}</span>
            </span>
          </div>
          {/* ************** */}
          <span>
            Thông tin khác{" "}
            <span className="f-s-10 italic">(Other Information)</span>:{" "}
            <span className="luachon">{isEditRow._ThongTinKhac}</span>
          </span>
          <br />

          {/* ********* */}
          <div className="Emergency">
            <table className="emergency-contact-table">
              <thead>
                <tr>
                  <th colSpan="3">
                    Thông tin liên hệ trong trường hợp khẩn cấp 24h (24-hour
                    Emergency Contact Information)
                  </th>
                </tr>
                <tr className="t-al-center">
                  <th></th>
                  <th>
                    Đầu mối chính
                    <br />
                    <span className="f-s-10 italic">
                      (Primary Emergency Contact)
                    </span>
                  </th>
                  <th>
                    Đầu mối dự phòng
                    <br />
                    <span className="f-s-10 italic">
                      (Alternative Emergency Contact)
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Tên <span className="f-s-10 italic">(Name)</span>
                  </td>
                  <td>Đinh Xuân Vinh</td>
                  <td>Lê Thị Sương</td>
                </tr>
                <tr>
                  <td>
                    Điện thoại cơ quan{" "}
                    <span className="f-s-10 italic">(Work Phone)</span>
                  </td>
                  <td>0909040456</td>
                  <td>0905785689</td>
                </tr>
                <tr>
                  <td>
                    Điện thoại nhà riêng{" "}
                    <span className="f-s-10 italic">(Home Phone)</span>
                  </td>
                  <td>0909040456</td>
                  <td>0905785689</td>
                </tr>
                <tr>
                  <td className="f-s-10 italic">Di động (Mobile No.)</td>
                  <td>0909040456</td>
                  <td>0905785689</td>
                </tr>
                <tr>
                  <td className="f-s-10 italic">Fax (Fax No.)</td>
                  <td>0909040456</td>
                  <td>0905785689</td>
                </tr>
                <tr>
                  <td className="f-s-10 italic">Email (Email Address)</td>
                  <td>congtyhvgdungquat@gmail.com</td>
                  <td>thanhsuong3001@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* endddddddddd */}
          <div className="SignAndSeal">
      <div className="d-flex j-c-ar">
        <div className="left-section">
          <span>....ngày ....tháng ....năm ....</span>
          <br />
          <span style={{marginLeft:"10px"}}>(Date ...............)</span>
          <br />
          <span className="f-s-8">
            Cơ quan xác nhận <br />
          </span>
            <span className="f-s-8 italic">(Certified by Agency) </span>
        </div>
        <div className="right-section">
          <span className="f-s-10">
            Chúng tôi cam kết thông tin cung cấp trên là hoàn toàn chính
            xác. <br />
            <span className="f-s-10 italic">(We guarantee the correctness of the above mentioned
            declaration)</span>
          </span>
          <br />
          <span>Ngày 21 tháng 03 năm 2024</span>
          <br />
          <span>(Date ...............)</span>
          <br />
          <span className="f-s-10">
            Tổ chức, cá nhân cung cấp dữ liệu <br />
            <span className="f-s-10 italic">(Organizations, Individuals to Provide Data)</span>
          </span>
        </div>
      </div>
      <div className="d-flex j-c-ar sign-seal" style={{ marginTop: "40px" }}>
        <div className="sign-seal-section">
          <span style={{marginLeft:"20px"}} className="f-s-10 italic">
            Ký và đóng dấu<br />
          </span>
          <span style={{marginLeft:"20px"}} className="f-s-10 italic">
          (Sign and Seal)
          </span>
        </div>
        <div className="sign-seal-section">
          <span style={{marginRight:"30px"}} className="f-s-10 italic">
            Ký và đóng dấu<br />
          </span>
          <span style={{marginRight:"30px"}} className="f-s-10 italic">
          (Sign and Seal)
          </span>
        </div>
      </div>
    </div>
        </div>
      </div>
    </Modal>
  );
}
