import React, { useState } from 'react';
import './PrintForm.css'

const EPIRBForm = () => {
    const [category1, setCategory1] = useState(true);
    const [category2, setCategory2] = useState(false);
    const [homingBeacon1215MHz, setHomingBeacon1215MHz] = useState(true);
    const [homingBeaconSART, setHomingBeaconSART] = useState(false);
    const [homingBeaconNone, setHomingBeaconNone] = useState(false);
    const [homingBeaconOther, setHomingBeaconOther] = useState(false);
    const [newSupply, setNewSupply] = useState(false);
    const [changeOfInfo, setChangeOfInfo] = useState(true);
    const [radioVHF, setRadioVHF] = useState(true);
    const [radioMF, setRadioMF] = useState(true);
    const [radioHF, setRadioHF] = useState(true);
    const [radioNavtex, setRadioNavtex] = useState(false);
    const [radioOther, setRadioOther] = useState(false);

    return (
        <div className='printForm'>
        <div id="divPrint">
            <div className=" ">
                <div className=" ">BẢN KHAI DỮ LIỆU PHAO EPIRB</div>
                <div className="">(EPIRB Data Declaration)</div>
            </div>

            <div className="content">
                <div className="EpirbInfo">
                    <div className="">Thông tin EPIRB <span className="">(EPIRB Information)</span></div>
                    <div className="">
                        <table cellspacing="0">
                            <tbody>
                                <tr>
                                    <td align="center">C</td><td align="center">7</td><td align="center">C</td><td align="center">8</td><td align="center">D</td><td align="center">7</td><td align="center">5</td><td align="center">0</td><td align="center">5</td><td align="center">4</td><td align="center">3</td><td align="center">0</td><td align="center">4</td><td align="center">D</td><td align="center">1</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="">(15 ký tự ID <span className="">(15 Digit Character ID)</span>)</div>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox" checked={category1} onChange={() => setCategory1(!category1)} />
                                        <span>Loại 1 (Phát tự động hoặc thủ công)</span> <br />
                                        <span className="">(Category 1) (Automatic/Manual Activation)</span>
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={category2} onChange={() => setCategory2(!category2)} />
                                        <span>Loại 2 (Phát thủ công)</span> <br />
                                        <span className="">(Category 2) (Manual Activation)</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>Nhà sản xuất EPIRB <span className="">(EPIRB Manufacturer)</span>: CETC</div>
                    <div>
                        <div className="" style={{ width: '8cm' }}>Mẫu <span className="">(Model)</span>: VEP-8</div>
                        <div className="">Số Serial <span className="">(Serial No.)</span>: 1702-0329</div>
                        <div className=""></div>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td rowspan="2" width="41%" style={{ verticalAlign: 'top' }}>
                                        <div>Thiết bị định vị phụ trợ <span className="">(Homing Beacon Device)</span>:</div>
                                    </td>
                                    <td width="22%">
                                        <input type="checkbox" checked={homingBeacon1215MHz} onChange={() => setHomingBeacon1215MHz(!homingBeacon1215MHz)} />
                                        <span>121.5 MHz</span>
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={homingBeaconSART} onChange={() => setHomingBeaconSART(!homingBeaconSART)} />
                                        <span>SART</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" checked={homingBeaconNone} onChange={() => setHomingBeaconNone(!homingBeaconNone)} />
                                        <span>Không có <span className="">(None)</span></span>
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={homingBeaconOther} onChange={() => setHomingBeaconOther(!homingBeaconOther)} />
                                        <span>Khác <span className="">(Other)</span></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>Thông tin khác <span className="">(Other Information)</span>:</div>
                </div>

                <div className="EpirbData">
                    <div className="">Dữ liệu phao EPIRB <span className="">(EPIRB'S data)</span></div>
                    <div>
                        <table cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td width="24%">
                                        <input type="checkbox" checked={newSupply} onChange={() => setNewSupply(!newSupply)} />
                                        <span>Cung cấp mới<span className="">(New Supply)</span></span>
                                    </td>
                                    <td>
                                        <input type="checkbox" checked={changeOfInfo} onChange={() => setChangeOfInfo(!changeOfInfo)} />
                                        <span>Thay đổi thông tin EPIRB hoặc chủ tàu<span className="">(Change of EPIRB Information or Ship Owner Information)</span></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="OwnerPhao">
                    <div className="">Thông tin về chủ sở hữu phao <span className="">(EPIRB - Owner Information)</span></div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td colspan="2">
                                        Tên <span className="">(Name): </span>LƯƠNG VĂN HÙNG
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        Tên giao dịch <span className="">(International Name): </span>LUONG VAN HUNG
                                    </td>
                                </tr>
                                <tr>
                                    <td width="60%">
                                        Địa chỉ <span className="">(Address):</span> Xóm 9 xã Cồn Thoi, huyện Kim Sơn, tỉnh Ninh Bình
                                    </td>
                                    <td>
                                        Tỉnh/ Thành phố <span className="">(Province/City): </span> NINH BÌNH
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Mã bưu điện <span className="">(Postal Code): </span> 08000
                                    </td>
                                    <td>
                                        Nước <span className="">(Country):</span> Việt Nam
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Điện thoại <span className="">(Phone)</span>: Cơ quan <span className="">(Office):</span> 0913389838
                                    </td>
                                    <td>
                                        Nhà riêng <span className="">(Home):</span> 0913389838
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fax <span className="">(Fax No):</span> 0913389838
                                    </td>
                                    <td>
                                        Email <span className="">(Email):</span> trandung08071989@gmail.com
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="infoTau">
                    <div className="">Thông tin về tàu/Công trình biển ngoài khơi <span className="">(Vessel’s / Offshore Installation Information)</span></div>
                    <div>
                        Tên tàu/Công trình biển ngoài khơi
                        <span className="">(Name of vessel/ Offshore Installation):</span> MẠNH DŨNG 79
                    </div>
                    <div>
                        <div className="" style={{ width: '50%' }}>Số MMSI <span className="">(MMSI Number):</span> 574013695</div>
                        <div className="">Hô hiệu <span className="">(Call Sign):</span> 3WGJ7</div>
                    </div>
                    <div className="">
                        Loại tàu <span className="">(Type of vessel):</span>
                        <input type="checkbox" /><span>Tàu cá <span className="">(Fishing) &nbsp;&nbsp;</span></span>
                        <input type="checkbox" /><span>Tàu hàng <span className="">(Cargo)&nbsp;&nbsp;</span></span>
                        <input type="checkbox" /><span>Tàu kéo <span className="">(Tug)&nbsp;&nbsp;</span></span>
                        <input type="checkbox" /><span>Tàu dầu <span className="">(Tanker)&nbsp;</span></span>
                        <input type="checkbox" /><span>Khác <span className="">(Other)</span></span>
                    </div>
                    <div>
                        <div className="" style={{ width: '65%' }}>Màu thân tàu <span className="">(Vessel Color):</span> XANH</div>
                        <div className="">Chiều dài <span className="">(Length):</span> 73</div>
                    </div>
                    <div className="">
                        Thiết bị vô tuyến <span className="">(Radio Equipment):</span>
                        <input type="checkbox" checked={radioVHF} onChange={() => setRadioVHF(!radioVHF)} /><span>VHF &nbsp;&nbsp;&nbsp;</span>
                        <input type="checkbox" checked={radioMF} onChange={() => setRadioMF(!radioMF)} /><span>MF &nbsp;&nbsp;&nbsp;</span>
                        <input type="checkbox" checked={radioHF} onChange={() => setRadioHF(!radioHF)} /><span>HF &nbsp;&nbsp;&nbsp;</span>
                        <input type="checkbox" checked={radioNavtex} onChange={() => setRadioNavtex(!radioNavtex)} /><span>NAVTEX &nbsp;&nbsp;&nbsp;</span>
                        <input type="checkbox" checked={radioOther} onChange={() => setRadioOther(!radioOther)} /><span>Khác <span className="">(Other)</span></span>
                    </div>
                    <div>
                        <div className="" style={{ width: '65%' }}>Số INMARSAT <span className="">(INMARSAT No.):</span> 000000000</div>
                        <div className="">Số IMO <span className="">(IMO Number):</span> 0000000</div>
                    </div>
                    <div className="">
                        <div className="" style={{ width: '65%' }}>Số thuyền viên và hành khách <span className="">(Number Of Crew And Passengers):</span> 9</div>
                        <div className="">Trọng tải <span className="">(DWT):</span> 3323.7 t?n</div>
                    </div>
                    <div className="">
                        Thông tin khác <span className="">(Other Information):</span>
                    </div>
                </div>
                <div className="khanCap" style={{ border: 'none' }}>
                    <div className="">Thông tin liên hệ trong trường hợp khẩn cấp 24h <span className="">(24- hour Emergency Contact Information):</span></div>
                    <table className="" cellspacing="0">
                        <tbody>
                            <tr>
                                <td style={{ width: '210px' }}></td>
                                <td align="center">
                                    Đầu mối chính <br />
                                    <span className="">(Primary Emergency Contact)</span>
                                </td>
                                <td align="center">
                                    Đầu mối dự phòng <br />
                                    <span className="">(Alternative Emergency Contact)</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Tên <span className="">(Name)</span></td>
                                <td>ĐẶNG THỊ THU HÀ</td>
                                <td>TRẦN VĂN DŨNG</td>
                            </tr>
                            <tr>
                                <td>Điện thoại cơ quan <span className="">(Work Phone)</span></td>
                                <td>0972670852</td>
                                <td>0913389838</td>
                            </tr>
                            <tr>
                                <td>Điện thoại nhà riêng <span className="">(Home Phone)</span></td>
                                <td>0972670852</td>
                                <td>0913389838</td>
                            </tr>
                            <tr>
                                <td>Di động <span className="">(Mobile No.)</span></td>
                                <td>0972670852</td>
                                <td>0913389838</td>
                            </tr>
                            <tr>
                                <td>Fax <span className="">(Fax No.)</span></td>
                                <td>0972670852</td>
                                <td>0913389838</td>
                            </tr>
                            <tr>
                                <td>Email <span className="">(Email Address)</span></td>
                                <td>trandung08071989@gmail.com</td>
                                <td>trandung08071989@gmail.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <table className="kiTen">
                <tbody>
                    <tr>
                        <td width="55%" align="center">
                            <span className="">....ngày.... tháng.... năm....</span> <br />
                            <span className="">(Date..................)</span> <br />
                            <span className="">Cơ quan xác nhận</span> <br />
                            <span className="">(Certified by Agency)</span>
                        </td>
                        <td align="center">
                            <span className="">Chúng tôi cam kết thông tin cung cấp trên là hoàn toàn chính xác.</span> <br />
                            <span className="">(We guarantee the correctness of the above mentioned declaration)</span> <br />
                            <span className="">Ngày 04 tháng 06 năm 2024</span> <br />
                            <span className="">(Date..................)</span> <br />
                            <span className=" p_italic">Tổ chức, cá nhân cung cấp dữ liệu</span> <br />
                            <span className=" p_italic">(Organizations, Individuals to Provide Data)</span>
                        </td>
                    </tr>
                    <tr><td colspan="2" height="20px;"></td></tr>
                    <tr>
                        <td align="center">
                            <span className=" p_italic">Ký và đóng dấu</span> <br />
                            <span className=" p_italic">(Sign and Seal)</span>
                        </td>
                        <td align="center">
                            <span className=" p_italic">Ký và đóng dấu</span> <br />
                            <span className=" p_italic">(Sign and Seal)</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default EPIRBForm;
