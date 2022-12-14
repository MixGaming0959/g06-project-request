import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SigninInterface } from "../models/ISignin";
import { Login, GetRolebyUser } from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function SignIn() {
  const [signin, setSignin] = useState<Partial<SigninInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState("password");

  const [checked, setChecked] = React.useState(false);

  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log(checked);
    if (!checked) {
      setType("text");
    }
    else{
      setType("password");
    }
  };


  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
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

  const submit = async () => {
    let res = await Login(signin);
    
    if (res) {
      setSuccess(true);
      let tmp = await GetRolebyUser();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Snackbar
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            ???????????????????????????????????????????????????
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ?????????????????????????????????????????????????????????????????????????????????
          </Alert>
        </Snackbar>
        
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={signin.Email || ""}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={type}//"password"
                id="Password"
                autoComplete="current-password"
                value={signin.Password || ""}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
              />
              <FormControlLabel
                control={<Checkbox checked={checked} value="remember" color="primary" onChange={handleChangeChecked}/>}
                label="Show Password"
              />
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12}  >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={submit}
                  > 
                    Sign In
                  </Button>
                </Grid>

                {/* <Grid item xs={6}  >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={submit}
                  > 
                    Sign In
                  </Button>
                </Grid>
                <html>
                  <button onClick={onClick}>

                  </button>
                </html> */}

              </Grid>
              
              <p>?????????????????????????????????: user@gmail.com 123456</p>
              <p>????????????????????????: tech@gmail.com 123456</p>
              <p>????????????admin: admin@gmail.com 123456</p>
              
            </Box>
            
          </Box>
        </Grid>
        
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
