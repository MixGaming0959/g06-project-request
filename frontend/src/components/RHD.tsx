import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RHDsInterface } from "../models/IRHD";
import { ListRHDs } from "../services/HttpClientService";

function RHDs() {
  const [rhd, setRHD] = useState<RHDsInterface[]>([]);

  const getRHD = async () => {
    let res = await  ListRHDs();
    if (res != null) {
      setRHD(res);
      console.log(res)
    }
  };  

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    {
      field: "Room",
      headerName: "ห้อง",
      width: 250,
      valueFormatter: (params) => params.value.Name,
    },
   {
      field: "Device",
      headerName: "รหัสอุปกรณ์",
      width: 250,
      valueFormatter: (params) => params.value.ID,
    },
    {
      field: "User",
      headerName: "ชื่อผู้ระบุ",
      width: 150,
      valueFormatter: (params) => params.value.Name,
    },
    
  ];
  useEffect(() => {
    getRHD();
    console.log(rhd);
  }, []); 

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
              ข้อมูลการระบุอุปกรณ์เข้าห้อง
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/room_has_device/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={rhd}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}
export default RHDs;
