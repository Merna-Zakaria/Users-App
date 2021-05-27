import React, { useEffect, useState } from "react";


const ExportToExcelFile = () => {
  const [exportedData, setExportedData] = useState('')
  const data_exported = [{id: 1, customer_name: 'merna', customer_phone: '012345', created_at: '12-21-1994', shift: 'shift'}, {id: 1, customer_name: 'merna', customer_phone: '012345', created_at: '12-21-1994', shift: 'shift'}, {id: 1, customer_name: 'merna', customer_phone: '012345', created_at: '12-21-1994', shift: 'shift'}];

  useEffect(() => {
    let data_exported_arr = ["<table><tbody>"];
    let tableHeader = `<tr><td>${'id'}</td><td style="width:200px;">&emsp${'customer_name'}&emsp</td><td>${'customer_phone'}</td><td>${'created_at'}</td><td>${'shift'}</td></tr>`;
    data_exported_arr.push(tableHeader);
    if (data_exported) {
      data_exported.map((data, index) => {
        console.log('data', data)
        let tableRow = `<tr><td>${data.id}</td><td>${
          data.customer_name
        }</td><td>${data.customer_phone}</td><td><p>${'date'}: ${
          data.created_at
        }</p></td><td>${data.shift}</td></tr>`;
        data_exported_arr.push(tableRow);
        if (index === data_exported.length - 1) {
          data_exported_arr.push("<tbody><table>");
          handelExportExcel(data_exported_arr.join(""), 'fileName');
        }

      });
    }
    setExportedData(data_exported_arr)
  }, []);

  const handelExportExcel = (tableText, filename, worksheetName) => {
    let dt = new Date();
    let day = dt.getDate();
    let month = dt.getMonth() + 1;
    let year = dt.getFullYear();
    let postfix = day + "." + month + "." + year;
    let downloadLink = document.createElement("a");
    let uri = "data:application/vnd.ms-excel;base64,",
      template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>' +
        tableText +
        "</body></html>",
      base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
      },
      format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        });
      };
    let ctx = { worksheet: worksheetName || "Worksheet", table: tableText };
    downloadLink.href = uri + base64(format(template, ctx));
    downloadLink.download =
      ('filename' || "exportedTable") + " _ " + postfix + ".xls";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <button
        type="button"        
        onClick={() => handelExportExcel(exportedData.join(""), 'fileName')}
      >
        Export To Excel File
      </button>
    </div>
  );
};
export default ExportToExcelFile;
