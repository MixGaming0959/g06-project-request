import { Select } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
//import Requests from "./components/Requests";
import RequestCreate from "./components/RequestCreate";
import Selection from "./components/Selection";
import SignIn from "./components/SignIn";


export default function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
return (
  <Router>
   <div>
    <Navbar />
      <Routes>
      {/* <Route path="/" element={<Requests />} /> */}
      <Route path="/" element={<SignIn />} />
    </Routes>
   </div>
  </Router>
);
}