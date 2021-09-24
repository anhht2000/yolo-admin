import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  OutlinedInput,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStyleForget } from "../../sass/makeStyles/forgetPass";

const useStyles = useStyleForget;

export default function ForgetPass() {
  const classes = useStyles();
  const [values, setValues] = useState({ username: "" });
  const [error, setError] = useState({ username: "" });
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleOnFocus = (e: any): void => {
    const { name, value } = e.target;
    setError({ ...error, [name]: "" });
  };
  const handleSubmit = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.username) {
      setError({ ...error, username: "You must typing data!!!!" });
    } else if (!re.test(values.username)) {
      setError({ ...error, username: "You must typing email!!" });
    } else {
      console.log(values);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.background}></div>
      <Paper className={classes.paper} elevation={3}>
        <div>
          <Box textAlign="center">
            <Typography variant="h6" color="primary">
              Enter your email to get password
            </Typography>
          </Box>
          <Grid
            container
            spacing={4}
            alignItems="flex-end"
            className={classes.mTop}
          >
            <Grid
              item
              md={true}
              sm={true}
              xs={true}
              className={classes.textRight}
            >
              <FormControl fullWidth size="small">
                <OutlinedInput
                  id="username"
                  type="text"
                  autoFocus
                  required
                  onFocus={handleOnFocus}
                  onChange={handleOnchange}
                  inputProps={{ style: { fontSize: 16 } }}
                  name="username"
                />
                <FormHelperText className={classes.errText}>
                  {error?.username}
                </FormHelperText>
              </FormControl>{" "}
            </Grid>
          </Grid>
          <Box mt={2} textAlign="right">
            <Link className={classes.link} to="/admin/login">
              Login
            </Link>
          </Box>
          <Grid container justifyContent="center" className={classes.mTop}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </div>
      </Paper>
    </div>
  );
}
