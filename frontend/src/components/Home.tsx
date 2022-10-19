import React, {useState, useEffect} from 'react'
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
      `User Role Level: {user.Role?.Name}`
    </div>



  )
}

export default Home