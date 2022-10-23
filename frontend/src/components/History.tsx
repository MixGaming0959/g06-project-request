import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListHistories } from "../services/HttpClientService";
import { HistorysInterface } from "../models/IHistory";

function History() {
  const [histories, setHistories] = useState<HistorysInterface[]>([]);
  const header = [ "ID", "ชื่อคนบันทึก", "ชื่อช่าง", "ชื่อคนแจ้ง", "ระดับความเสียหาย", "ประเภทงาน", "ตึก", "ห้อง", "ประเภทอุปกรณ์", "ยี่ห้อ", "ร้านที่ซื้อ"];
  const listHistory = async () => {
    let res = await ListHistories();
    if (res) {
      setHistories(res);
      console.log("Load History Complete");
    }
    else{
      console.log("Load History InComplete!!!");
    }
  };
  

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
        field: "User",
        headerName: "คนบันทึก",
        width: 200,
        valueFormatter: (params) => params.value.Name,
    },
    {
      field: "DMGLevel",
      headerName: "ระดับความเสียหาย",
      width: 200,
      valueFormatter: (params) => params.value.DMGLevel,
    },
    {
      field: "Cart.Request.User",
      headerName: "ชื่อผู้แจ้ง",
      width: 200,
      valueFormatter: (params) => {
        //console.log(params);
        return params.value;
      },
    },
    {
      field: "Cart",
      headerName: "ปัญหา",
      width: 200,
      valueFormatter: (params) => {
        //console.log(params);
        return params.value;
      },
    },

  ];

  useEffect(() => {
    listHistory();
  }, []);

  const DisplayData=histories?.map(
    (info)=>{
        return(
            <tr>
                <td>{info.ID}</td>
                <td>{info?.User?.Name}</td> {/*ชื่อคนบันทึก*/}
                <td>{info?.Cart?.User?.Name}</td> {/*ชื่อช่าง*/}
                <td>{info?.Cart?.Request?.User?.Name}</td> {/*ชื่อคนแจ้ง*/}
                <td>{info?.DMGLevel?.DMGLevel}</td>
                <td>{info?.Cart?.Request?.JobType?.Name}</td> {/*ประเภทงาน*/}
                <td>{info?.Cart?.Request?.Room_has_Device?.Room?.Building?.Name}</td>
                <td>{info?.Cart?.Request?.Room_has_Device?.Room?.Name}</td>
                <td>{info?.Cart?.Request?.Room_has_Device?.Device?.Type?.Name}</td>
                <td>{info?.Cart?.Request?.Room_has_Device?.Device?.Brand?.Name}</td>
                <td>{info?.Cart?.Request?.Room_has_Device?.Device?.Distributor?.Name}</td>
                
            </tr>
        )
    }
)


    
  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ประวัติ
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/history/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        {/* <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={histories}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div> */}
  <style>{`
    table {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    td, th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    tr:nth-child(even){background-color: #bebebe;}
    tr:hover {background-color: #ddd;}

    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #666;
      color: white;
    }

  `}</style>
        <table>
          <thead>
              <tr>
                {header.map(head => <th>{head}</th>)}
                {/* <th>ID</th>
                <th>ชื่อคนบันทึก</th>
                <th>ชื่อช่าง</th>
                <th>ชื่อคนแจ้ง</th>
                <th>ระดับความเสียหาย</th>
                <th>ประเภทงาน</th>
                <th>ตึก</th>
                <th>ห้อง</th> 
                <th>ประเภทอุปกรณ์</th>
                <th>ยี่ห้อ</th>
                <th>ร้านที่ซื้อ</th> */}
              </tr>
          </thead>
          <tbody>
              {DisplayData}
          </tbody>
        </table>

      </Container>
    </div>
  );
}

export default History;