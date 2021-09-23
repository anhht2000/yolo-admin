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
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { imgSlider } from "../../assets";

const useStyles = makeStyles((theme: any) => {
  return {
    root: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    background: {
      background: `url('${imgSlider.slide_1}')center center /cover no-repeat`,
      width: "100%",
      height: "100vh",
      position: "absolute",
      filter: "blur(10px)",
    },
    paper: {
      border: "1px solid blue",
      backgroundColor: "white",
      position: "relative",
      width: "400px",
      maxWidth: "100%",
      padding: theme.spacing(3),
      [theme.breakpoints.down("xs")]: {
        width: "300px",
      },
    },
    fogetPass: {
      textAlign: "right",
      [theme.breakpoints.down("xs")]: {
        textAlign: "left",
        paddingLeft: "5px",
      },
    },
    link: { textDecoration: "none", color: "blue" },
    iconPass: {
      cursor: "pointer",
    },
    errText: {
      color: "red",
      paddingLeft: "10px",
    },
  };
});

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
                  control={<Checkbox color="primary" size="small" />}
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
              You don't have account. Please sign up{" "}
              <Link to="/admin/sign-up">Sign up</Link>
            </Typography>
          </Box>
          <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              color="primary"
              style={{ textTransform: "none" }}
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
