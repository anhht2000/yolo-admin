import {
  Box,
  Button,
  FormControl,
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
  };
});

export default function SignUp() {
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
              </FormControl>{" "}
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
            </Grid>
          </Grid>
          <Grid container spacing={4} alignItems="flex-end">
            <Grid item>
              <InputLabel htmlFor="address">Address</InputLabel>
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
                  id="address"
                  type="text"
                  autoFocus
                  required
                  onChange={handleOnchange}
                  name="address"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={4}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Grid item>
              <InputLabel htmlFor="phone">Phone</InputLabel>
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
                  id="phone"
                  type="text"
                  autoFocus
                  required
                  onChange={handleOnchange}
                  name="phone"
                />
              </FormControl>
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
