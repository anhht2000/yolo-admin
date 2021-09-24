import React, { useEffect, useState } from "react";
import "../../sass/login.scss";
import { NavLink } from "react-router-dom";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff,Fingerprint} from "@material-ui/icons";
import { imgLogo } from "../../assets";
import { string } from "../../assets/string";
import { validateEmail, validatePassword } from "../../lib/FunctHelper";
const Login = () => {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    type: "password",
    errorE: false,
    erroremail: "",
    errorP: false,
    errorpassword: "",
  });
  const CheckEmail = (email: string) => {
    if (!validateEmail(email) && values.amount.length > 0) {
      return setValues({
        ...values,
        errorE: true,
        erroremail: `${string.ErrorEmail}`,
      });
    } else {
      return setValues({ ...values, errorE: false, erroremail: "" });
    }
  };
  const CheckPassword = (password: string) => {
    if (!validatePassword(password) && values.password.length > 0) {
      return setValues({
        ...values,
        errorP: true,
        errorpassword: `${string.ErrorPass}`,
      });
    } else {
      return setValues({ ...values, errorP: false, errorpassword: "" });
    }
  };
  const handleEmail = (event: any) => {
    setValues({
      ...values,
      amount: event.target.value,
    });
  };
  const handlePassword = (event: any) => {
    setValues({
      ...values,
      password: event.target.value,
    });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword, type: "text" });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  useEffect(() => {
    CheckEmail(values.amount);
  }, [values.amount]);
  useEffect(() => {
    CheckPassword(values.password);
  }, [values.password]);
  return (
    <div className="container_login">
      <div className="background_img"></div>
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
              error={values.errorE}
              helperText={values.erroremail}
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
            <TextField
              type={values.type}
              label={string.Password}
              fullWidth={true}
              error={values.errorP}
              helperText={values.errorpassword}
              value={values.password}
              onChange={handlePassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Fingerprint />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="option_login">
          <input type="checkbox" />
          <label className="remember_login">{string.RememberPassword}</label>
          {/* <NavLink exact to="/forgotpass" style={{ textDecoration: "none" }}>
            <label className="forgotpassword_login">
              {string.ForgotPassword}
            </label>
          </NavLink> */}
          <label className="forgotpassword_login">
            {string.ForgotPassword}
          </label>
        </div>
        <div className="button_login">
          <Button variant="contained" color="primary">
            {string.Login}
          </Button>
        </div>
        <div className="option_resigter">
          <label className="resigter_login">{string.ComentResigter}</label>
          {/* <NavLink
          exact to="/resigter"
          style={{ textDecoration: "none" }}>
            <label className="resigter">{string.SignIn}</label>
          </NavLink> */}
          <label className="resigter">{string.SignIn}</label>
        </div>
      </div>
    </div>
  );
};

export default Login;
