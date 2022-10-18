import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";

import { RequestsInterface } from "../models/IRequest";
import { BuildingsInterface } from "../models/IBuilding";
import { RoomsInterface } from "../models/IRoom";
import { UsersInterface } from "../models/IUser";

import {
  GetBuildings,
  GetUser,
  GetRooms,
} from "../services/HttpClientService";
import NativeSelect from "@mui/material/NativeSelect/NativeSelect";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props, ref ) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RequestCreate() {
  const [user, setUser] = useState<UsersInterface>();

  const [request, setRequest] = useState<RequestsInterface>();

  const [building, setBuilding] = useState<BuildingsInterface[]>([]);
  const [bid, setBid] = useState<number>();

  const [room, setRoom] = useState<RoomsInterface[]>([]);
  const [rid, setRid] = useState<number>();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);



  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

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

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof request;
    const { value } = event.target;
    // setRequest({ ...request, [id]: value });
  };

  const onChangeBuilding = async (bid: any) =>{
    setBid(convertType(bid));
    let res = await GetRooms(bid);
    if (res) {
      setRoom(res);
    }
    
  }

  const getUser = async () => {
    let res = await GetUser();
    if (res) {
      setUser(res);
    }
  };

  const getRooms = async (bid: any) => {
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    let command = ``;
    if(bid == null) {
      command = `${apiUrl}/rooms`;
    }
    else{
      command = `${apiUrl}/rooms/building/${bid}`;
    }
    console.log(`${command} , ${bid}`);
    let res = await fetch(command, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setRoom (res.data);
        } 

      });
  };

  const getBuilding = async () => {
    let res = await GetBuildings();
    if (res) {
      setBuilding(res);
    }
    console.log("building");
    console.log(building);
  };

  useEffect(() => {
    getBuilding();
    getRooms(bid);
    getUser();
  }, []);

  function submit() {}


  return (
  <Container maxWidth="md">
           <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}
             anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
           >
             <Alert onClose={handleClose} severity="success">
               บันทึกข้อมูลสำเร็จ
             </Alert>
           </Snackbar>

           <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="error">
               บันทึกข้อมูลไม่สำเร็จ
             </Alert>
           </Snackbar>

    <Paper>
      {/* <Box display="flex" sx={{ marginTop: 2, }} >
        <Box sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom >
           Create Request
          </Typography>
        </Box>
      </Box> */}

      <Divider />
      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
          <p>ชื่อผู้แจ้ง</p>
            <TextField
              id="Name"
              disabled
              inputProps={{
                name: "UserID",
              }}
              defaultValue={"${user.Name}"}
              // onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
       
          
        
        <Grid item xs={6}>
          {/* <p>สถานที่ที่อุปกรณ์ชำรุด </p> */}
          <FormControl fullWidth variant="outlined">
            <p>ตึก</p>
            <Select
              defaultValue={0}
              onChange={(e) => (onChangeBuilding)}
            >
              <MenuItem  value={0}>กรุณาเลือกตึก</MenuItem>
                {building.map((item: BuildingsInterface) => (
                  <MenuItem 
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">   
            <p>ห้อง</p>
            <Select
              defaultValue={0}
              label="ห้อง"
              // onChange={(e) => {onChangeBuilding(e.target.value)}}
            >
              <MenuItem value={0}>กรุณาเลือกห้อง</MenuItem>
                {room?.map((item: RoomsInterface) => 
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Name}
                  </MenuItem>
                )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">   
            <p>รหัสอุปกรณ์</p>
            <Select
              defaultValue={0}
              label="รหัสอุปกรณ์"
              // onChange={(e) => {onChangeBuilding(e.target.value)}}
            >
              <MenuItem value={0}>กรุณาเลือกรหัสอุปกรณ์</MenuItem>
                {/* {room?.map((item: RoomsInterface) => 
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {item.Name}
                  </MenuItem>
                )} */}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button component={RouterLink} to="/" variant="contained">
            Back
          </Button>
          <Button
            style={{ float: "right" }}
            onClick={submit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Grid>

      </Grid>
    </Paper>
  </Container>

  );
}




export default RequestCreate;