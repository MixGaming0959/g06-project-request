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
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={histories}
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

export default History;