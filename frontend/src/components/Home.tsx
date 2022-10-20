import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import React, {useState, useEffect} from 'react'
import TextField from "@mui/material/TextField";
import { UsersInterface } from "../models/IUser";
import { GetUser, GetRolebyUser } from "../services/HttpClientService";

function Home() {
  const [user, setUser] = useState<UsersInterface>({});
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

  useEffect(() => {
    getUser();
  }, []);

  return (
  
    <div> 
      `User Role Level: {user.Role?.Name} {user.Name}`
      <Grid item xs={12}>
          <FormControl fullWidth variant="outlined">
          <p>ชื่อ</p>
            <TextField
              disabled
              value={user.Name || ""}
            />
          </FormControl>
        </Grid>
    </div>
    


  )
}

export default Home