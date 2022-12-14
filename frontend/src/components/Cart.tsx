import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListCarts } from "../services/HttpClientService";
import { CartsInterface } from "../models/ICart";
function Carts() {
  const [carts, setcarts] = useState<CartsInterface[]>([]);

  const getCarts = async () => {
    let res = await ListCarts();
    if (res) {
      setcarts(res);
      console.log(res);
    }
  };
  

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    { 
      field: "Work_Date", headerName: "รายการจองเวลางาน", width: 300, 
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "User",
      headerName: "ชื่อช่าง",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },
    {
      field: "Estimate",
      headerName: "ประเภทการซ่อมบำรุง",
      width: 200,
      valueFormatter: (params) => params.value.Name,
    },

  ];

  useEffect(() => {
    getCarts();
    console.log(carts);

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
              บันทึกการจองตารางงาน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/cart/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={carts}
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

export default Carts;