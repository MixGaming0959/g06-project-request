import React, { useEffect, useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { UsersInterface } from '../models/IUser';
import { BuildingsInterface } from '../models/IBuilding';
import { RoomsInterface } from '../models/IRoom';

import {
  GetBuildings,
  GetUser,
  GetRooms,
} from "../services/HttpClientService";


function Selection() {
  const theme = useTheme();
  const [building, setBuilding] = useState<BuildingsInterface[]>([]);
  const [bid, setbid] = useState<BuildingsInterface>();
  const [room, setRoom] = useState<RoomsInterface[]>([]);
  const [rid, setrid] = useState<RoomsInterface>();
  const [age, setAge] = useState('');

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleChange_Building = (event: SelectChangeEvent) => {

  };

  const getBuilding = async () => {
    let res = await GetBuildings();
    if (res) {
      setBuilding(res);
    }
  };

  const getRoom = async () => {
    let res = await GetRooms(convertType(bid?.ID));
    if (res) {
      setRoom(res);
    }
  };

  useEffect(() => {
    getBuilding();
    getRoom();
  }, [bid]);

  return (
    <Container maxWidth="md">
      <Paper>
        <Box display="flex" sx={{ marginTop: 2, }} >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom >
            Create Request
            </Typography>
          </Box>
        </Box>
        
        <Divider />

        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <FormControl  variant="filled" sx={{ m: 1, width: 300 }}>
              <p>ตึก</p>
              <Select
                native
                value={ bid?.ID + "" }
                onChange={ handleChange_Building }
                inputProps={{
                  name: "BuildingID",
                }}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
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

            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <p>ห้อง</p>
              <Select
                native
                value={rid?.ID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoomID",
                }}
              >
                <MenuItem value=""> <em>None</em> </MenuItem>
                {room.map((item: RoomsInterface) => (
                  <MenuItem
                    key={item?.ID}
                    value={item?.ID}
                  >
                    {item?.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item xs={12}>
            <p>ห้อง</p>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="room-name-label">ห้อง</InputLabel>
              <Select
                id="Room"
                value={room || ""}
                onChange={(event) => {setRoom(event.target.value) 
                  console.log(building)} }
                MenuProps={MenuProps}
              >
                {Rooms("1").map(({ID,Name}) => (
                  <MenuItem
                    value={ID}
                  >
                    {Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
      </Paper> 
    </Container>
  );
}

export default Selection;