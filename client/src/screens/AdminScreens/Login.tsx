import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
import { img } from "../../assets/index";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

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
      background: `url('${img.banner}')center center /cover no-repeat`,
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
  };
});

const Login: React.FC<any> = () => {
  const classes = useStyles();
  const [values, setValues] = useState({});
  const [isShowPass, setIsShowPass] = useState<Boolean>(false);
  const handleShowPass = () => {
    setIsShowPass(!isShowPass);
  };
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    console.log(values);
  };
  return (
    <div className={classes.root}>
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
                onChange={handleOnchange}
                name="username"
              />
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
                  // VisibilityOffIcon
                />
              </FormControl>
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
                <Link to="/" className={classes.link}>
                  Forgot password ?
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Box textAlign="center" mt={2}>
            <Typography variant="caption">
              You don't have account. Please sign up <Link to="/">Sign up</Link>
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
