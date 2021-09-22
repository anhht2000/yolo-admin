import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { img } from "../../assets";

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
      background: `url('${img.banner.banner_1}')center center /cover no-repeat`,
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
    link: { textDecoration: "none", color: "blue" },
    textRight: { textAlign: "right" },
    input: {
      width: "240px",
    },
    errText: {
      color: "red",
      paddingLeft: "10px",
    },
  };
});

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: "", password: "" });
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
        console.log("ok", prev);
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
      <div className={classes.background}></div>
      <Paper className={classes.paper} elevation={3}>
        <div>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <InputLabel htmlFor="username">UserName</InputLabel>
            </Grid>
            <Grid
              item
              md={true}
              sm={true}
              xs={true}
              className={classes.textRight}
            >
              <FormControl fullWidth size="small" className={classes.input}>
                <OutlinedInput
                  id="username"
                  type="text"
                  autoFocus
                  required
                  onChange={handleOnchange}
                  name="username"
                />
              </FormControl>
              <FormHelperText className={classes.errText}>
                {error?.username}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <InputLabel htmlFor="password">Password</InputLabel>
            </Grid>
            <Grid
              item
              md={true}
              sm={true}
              xs={true}
              className={classes.textRight}
            >
              <FormControl fullWidth size="small" className={classes.input}>
                <OutlinedInput
                  id="password"
                  type="text"
                  autoFocus
                  required
                  onChange={handleOnchange}
                  name="password"
                />
              </FormControl>
              <FormHelperText className={classes.errText}>
                {error?.password}
              </FormHelperText>
            </Grid>
          </Grid>

          <Box textAlign="center" mt={2}>
            <Typography variant="caption">
              You have account. Please sign in{" "}
              <Link to="/admin/login">Sign in</Link>
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
              Sign Up
            </Button>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}
