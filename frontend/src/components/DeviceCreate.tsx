import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import { Link as RouterLink } from "react-router-dom";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { DevicesInterface } from "../models/IDevice";
import { TypesInterface } from "../models/IType";
import { BrandsInterface } from "../models/IBrand";
import { DistributorsInterface } from "../models/IDistributor";

import { ListTypes, ListBrands, ListDistributors,CreateDevice} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function DeviceCreate() {
    const [device, setDevice] = React.useState<Partial<DevicesInterface>>({});
    const [types, setTypes] = React.useState<TypesInterface[]>([]);
    const [brands, setBrands] = React.useState<BrandsInterface[]>([]);
    const [distributors, setDistributors] = React.useState<DistributorsInterface[]>([]);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setSuccess(false);
      setError(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof device;
      const value = event.target.value;
      setDevice({
        ...device,
        [name]: value,
      });
      console.log(`[${name.toString()}]: ${value}`);
    };
    //ดึงข้อมูล Types
    const getTypes = async () => {
      let res = await ListTypes();
      if (res) {
        setTypes(res);
        console.log("Load Type Complete");
      }
      else{
        console.log("Load Type InComplete!!!!");
      }
    };
    //ดึงข้อมูล Brands
    const getBrands = async () => {
      let res = await ListBrands();
      if (res) {
        setBrands(res);
        console.log("Load Brand Complete");
      }
      else{
        console.log("Load Brand InComplete!!!!");
      }
    };
    //ดึงข้อมูล Distributors
    const getDistributors = async () => {
      let res = await ListDistributors();
      if (res) {
        setDistributors(res);
        console.log("Load Distributor Complete");
      }
      else{
        console.log("Load Distributor InComplete!!!!");
      }
    };

    React.useEffect(() => {
      getTypes();
      getBrands();
      getDistributors();
    }, []);

async function submit() {
    let res = await CreateDevice(device);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

return (
    <Container maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="success"> บันทึกข้อมูลอุปกรณ์สำเร็จ </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error"> บันทึกข้อมูลอุปกรณ์ไม่สำเร็จ </Alert>
      </Snackbar>

      <Paper>
        <Box display="flex" sx={{ marginTop: 2, }}>
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom > เพิ่มอุปกรณ์คอมพิวเตอร์ </Typography>
          </Box>
        </Box>

        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">   
              <p>ประเภทอุปกรณ์</p>
              <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "TypeID", }}>
                <MenuItem value={"0"}>กรุณาเลือกประเภทอุปกรณ์</MenuItem>
                  {types?.map((item: TypesInterface) => 
                    <MenuItem key={item.ID} value={item.ID} > {item.Name} </MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>ยี่ห้อ</p>
            <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "BrandID", }}>
              <MenuItem value={"0"}>กรุณาเลือกยี่ห้อ</MenuItem>
              {brands?.map((item: BrandsInterface) => 
                <MenuItem key={item.ID} value={item.ID}> {item.Name} </MenuItem>)}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <p>ร้าน</p>
            <Select required defaultValue={"0"} onChange={handleChange} inputProps={{ name: "DistributorID",}}>
              <MenuItem value={"0"}>กรุณาเลือกร้าน</MenuItem>
              {distributors?.map((item: DistributorsInterface) => 
                <MenuItem key={item.ID} value={item.ID}> {item.Name} </MenuItem>)}
            </Select>
          </Grid>

          <Grid item xs={12}>
            <Button component={RouterLink} to="/device" variant="contained"> กลับ </Button>
            <Button style={{ float: "right" }} onClick={submit} variant="contained" color="success" > บันทึก </Button>
          </Grid>
          
        </Grid>
      </Paper>
    </Container>
);
}
export default DeviceCreate;

