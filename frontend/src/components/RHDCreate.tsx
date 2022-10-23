import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import FormControl from "@mui/material/FormControl";
import Grid from '@mui/material/Grid';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";


import { BuildingsInterface } from "../models/IBuilding";
import { RoomsInterface } from "../models/IRoom";
import { DevicesInterface } from "../models/IDevice";
import { UsersInterface } from "../models/IUser";
import {RHDsInterface } from "../models/IRHD";

import {
  ListBuildings,
  ListRoombyBuildings,
  CreateRHD,
  GetUser,
  ListDevices,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RHDCreate() { 
  const [buildings, setBuildings] = useState<BuildingsInterface[]>([]);
  const [rooms, setRoom] = useState<RoomsInterface[]>([]);
  const [device, setDevice] = useState<DevicesInterface[]>([]);
  const [rhd, setRHD] = useState<RHDsInterface>({});
  const [user, setUser] = useState<UsersInterface>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  
  async function submit() {
    let data = {         
      RoomID: convertType(rhd.RoomID),
      DeviceID:convertType(rhd.DeviceID),
      UserID: convertType(localStorage.getItem("uid")+""),
    };

    let res = await CreateRHD(data);
    console.log(res);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

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

  const onChangeBuilding = async (e: SelectChangeEvent) =>{
    const bid = e.target.value;
    let res = await ListRoombyBuildings(bid);
    console.log(bid);
    if (res != null) {
      setRoom(res);      
      console.log("Load Room Complete!!!");      
    }
    else{
      console.log("Load Room Incomplete!!!");
    }
    
  } ; 

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof rhd;
    setRHD({
      ...rhd,
      [name]: event.target.value,
    });
  };

  const listDevices = async () => {
    let res = await ListDevices();
    if (res) {
      setDevice(res);
      console.log("Load Device Complete");
    }
    else{
      console.log("Load Device InComplete!!!!");
    }
  };

  const getUser = async () => {
    let res = await GetUser();
    if (res) {
      setUser(res);
      console.log("Load User Complete");
    }
    else{
      console.log("Load User InComplete!!!!");
    }
  };

  const listBuildings = async () => {
    let res = await ListBuildings();
    if (res) {
      setBuildings(res);
      console.log("Load Building Complete");
    }
    else{
      console.log("Load Building InComplete!!!!");
    }
  };
  
  useEffect(() => {
    listBuildings();    
    listDevices();  
    getUser();
  }, []);
  
  return (    
   <div>    
  <Box sx={{ flexGrow: 1 }}>
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
         { /*<Box sx={{ bgcolor: '', height: '100vh' }} />*/}
         <Paper /*elevation={0}*/ />
          <Box display={"flex"} 
              sx = {{
                marginTop: 2 ,
                marginX:2,
                paddingX:2,
                paddingY:2

              } }>
            <h2> ระบบระบุอุปกรณ์เข้าห้อง </h2>
          </Box>
          <hr/>
          <Grid container spacing={3} sx={{ padding: 2 }}>       
        <Grid item xs={6}>          
          <FormControl fullWidth variant="outlined">
            <p>ตึก</p>
            <Select
              required
              defaultValue={"0"}
              onChange={ (onChangeBuilding) }
              inputProps={{
                name: "BuildingID",
              }}
            >
              <MenuItem  value={"0"}>กรุณาเลือกตึก</MenuItem>
                {buildings.map((item: BuildingsInterface) => (
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
              required
              defaultValue={"0"}
              onChange={handleChange}
              inputProps={{
                name: "RoomID",
              }}
            >
              <MenuItem value={"0"}>กรุณาเลือกห้อง</MenuItem>
                {rooms?.map((item: RoomsInterface) => 
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
            <p>อุปกรณ์</p>
            <Select
              required
              defaultValue={"0"}
              onChange={handleChange}
              inputProps={{
                name: "DeviceID",
              }}
            >
              <MenuItem value={"0"}>กรุณาเลือกอุปกรณ์</MenuItem>
                {device?.map((item: DevicesInterface) => 
                  <MenuItem
                    key={item.ID}
                    value={item.ID}
                  >
                    {`รหัส:${item.ID}, ประเภท:${item.Type?.Name}, ยี่ห้อ:${item.Brand?.Name}`}
                  </MenuItem>
                )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อผู้ระบุ</p>
              <Select
                native
                value={user?.ID + ""}
                onChange={handleChange}
                disabled
                inputProps={{
                  name: "UserID",
                }}
              >               
                <option aria-label="None" value={user?.ID} key={user?.ID}>
                  {user?.Name}
                </option>
              </Select>
            </FormControl>
          </Grid>
    <Grid item xs={12}>
    <Button 
    variant="contained"
    component={RouterLink}to="/room_has_devices"           
    color='inherit'>กลับ
      </Button>
    <Button 
      variant="contained" 
      onClick={submit}            
      sx={{ float :"right"}}   >
        บันทึก
      </Button>
        </Grid>
      </Grid>     
      <Paper />
        </Container>
 </Box>
 </div>
  );
}
export default RHDCreate;

