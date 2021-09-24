import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStyleLogin } from "../../sass/makeStyles/login";

const useStyles = useStyleLogin;

const Login: React.FC<any> = () => {
  const classes = useStyles();
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: "", password: "" });
  const [isShowPass, setIsShowPass] = useState<Boolean>(false);
  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
  };
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    //username
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.username) {
      setError({ ...error, username: "You must typing username!" });
    } else if (!re.test(values.username)) {
      setError({ ...error, username: "You must enter type is email!!" });
    } else {
      setError({ ...error, username: "" });
    }
    //pass
    if (!values.password) {
      setError((prev) => {
        return { ...prev, password: "You must typing password!" };
      });
    } else {
      setError((prev) => {
        return { ...prev, password: "" };
      });
    }
    //check
    setError((prev) => {
      if (!prev.username && !prev.password) {
        console.log("ok", values);
      }
      return prev;
    });
  };
  const handleOnFocus = (e: any): void => {
    const { name, value } = e.target;
    setError({ ...error, [name]: "" });
  };
  return (
    <div className={classes.root}>
      {/* {console.log(values, error)} */}
      <div className={classes.background}></div>
      <Paper className={classes.paper} elevation={3}>
        <div>
          <Typography variant="h6">Login</Typography>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                id="username"
                label="Username"
                type="email"
                fullWidth
                autoFocus
                required
                onFocus={handleOnFocus}
                onChange={handleOnchange}
                name="username"
                inputProps={{ style: { fontSize: 16 } }}
                InputLabelProps={{ style: { fontSize: 16 } }}
              />
              <FormHelperText className={classes.errText}>
                {error?.username}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password *</InputLabel>
                <Input
                  id="password"
                  type={isShowPass ? "text" : "password"}
                  required
                  onFocus={handleOnFocus}
                  onChange={handleOnchange}
                  name="password"
                  inputProps={{ style: { fontSize: 16 } }}
                  endAdornment={
                    isShowPass ? (
                      <VisibilityOffIcon
                        className={classes.iconPass}
                        onClick={handleShowPass}
                      />
                    ) : (
                      <VisibilityIcon
                        className={classes.iconPass}
                        onClick={handleShowPass}
                      />
                    )
                  }
                />
              </FormControl>
              <FormHelperText className={classes.errText}>
                {error?.password}
              </FormHelperText>
            </Grid>
          </Grid>
          <Box mt={2}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  className={classes.check}
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.fogetPass}>
                <Link to="/admin/forget-password" className={classes.link}>
                  Forgot password ?
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box textAlign="center" mt={2}>
            <Typography variant="caption">
              You don't have account. Please{" "}
              <Link to="/admin/sign-up">Sign up</Link>
            </Typography>
          </Box>
          <Grid container justifyContent="center" className={classes.grid}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
export default Login;
