import React, { useState } from "react";
import "../../sass/login.scss";
import { checkEmail } from "../../lib/FunctHelper";
import { NavLink } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  IconButton,
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import { imgBanner, imgLogo } from "../../assets";
import { string } from "../../assets/string";
const Login = () => {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleEmail = (event: any) => {
    setValues({
      ...values,
      amount: event.target.value,
    });
  };
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
    // console.log(event);
  };
  console.log(values.amount);

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <div className="container_login">
      <div className="content_login">
        <div className="header_login">
          <div>
            <img src={imgLogo.logo_2} alt="Logo Login" className="logo_login" />
          </div>
          <label>{string.Login}</label>
        </div>
        <div className="form">
          <div className="acount">
            <TextField
              label={string.Acount}
              fullWidth={true}
              error={false}
              value={values.amount}
              onChange={handleEmail}
              placeholder={string.HolderEmail}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="password">
            <FormControl fullWidth={true}>
              <InputLabel>{string.Password}</InputLabel>
              <Input
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="option_login">
          <Checkbox
            value="checkedA"
            color="primary"
            inputProps={{ "aria-label": "Checkbox A" }}
          />
          <label className="remember_login">{string.RememberPassword}</label>
          <NavLink exact to="/forgotpass" style={{ textDecoration: "none" }}>
            <label className="forgotpassword_login">
              {string.ForgotPassword}
            </label>
          </NavLink>
        </div>
        <div className="button_login">
          <Button variant="contained" color="primary">
            {string.Login}
          </Button>
        </div>
        <div className="option_resigter">
          <label className="resigter_login">{string.ComentResigter}</label>
          <NavLink exact to="/resigter" style={{ textDecoration: "none" }}>
            <label className="resigter">{string.Resigter}</label>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
