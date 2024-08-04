import * as XLSX from 'xlsx';

const PhanMemExportEx = (gridData, defaultColumns)=>{
    const wb = XLSX.utils.book_new();
    const excelData =[];

    const headers = defaultColumns.map(column => column.header);
    // const headers = ['STT', 'Năm', 'Mã đề tài','Tên đề tài', 'Chủ Nhiệm', 'Đơn vị chủ trì', 'Người tham gia', 'Kinh phí', 'KQNghiemThu']
    excelData.push(headers)
    
    gridData.forEach((item, index) => {
        const rowData = defaultColumns.map(column => item[column.name]); // ***
        excelData.push([index + 1, ...rowData]);
    });
  
    // Chuyển đổi mảng dữ liệu thành sheet Excel
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Tạo một đối tượng style
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      width: 24
  };

    // Thiết lập style cho header
    ws['!cols'] = [];
    headers.forEach(() => {
        ws['!cols'].push(headerStyle);
    });
  
    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
  
    // Xuất file Excel
    XLSX.writeFile(wb, 'datagrid.xlsx');
  }
  export default PhanMemExportEx;