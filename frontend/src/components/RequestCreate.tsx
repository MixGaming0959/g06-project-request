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
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props, ref ) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RequestCreate() {
  const [user, setUser] = useState<UsersInterface>();

  const [request, setRequest] = useState<RequestsInterface>();
  const [building, setBuilding] = useState<BuildingsInterface[]>([]);
  const [room, setRoom] = useState<RoomsInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  const getUser = async () => {
    let res = await GetUser();
    if (res) {
      setUser(res);
    }
  };

  const getBuilding = async () => {
    let res = await GetBuildings();
    if (res) {
      setBuilding(res);
    }
  };

  useEffect(() => {
    getBuilding();
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
          <FormControl fullWidth variant="outlined">
            <p>สถานที่ที่อุปกรณ์ชำรุด </p>
            <p>ตึก</p>
            <Select
              labelId="building-select-label"
              id="building-select"
              value={""}
              label="ตึก"
              // onChange={""}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
            <p>Email</p>
            <TextField
              id="Email"
              variant="outlined"
              type="string"
              size="medium"
              value={""}
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>Age</p>
            <TextField
              id="Age"
              variant="outlined"
              type="number"
              size="medium"
              InputProps={{ inputProps: { min: 1 } }}
              InputLabelProps={{
                shrink: true,
              }}
              value={""}
              onChange={handleInputChange}
            />
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