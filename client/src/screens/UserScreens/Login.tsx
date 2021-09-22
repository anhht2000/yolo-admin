import React, { useState } from "react";
import "../../sass/login.scss";
import { img } from "../../assets/index";
import { string } from "../../assets/string";
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
const Login = () => {
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
    // console.log(event);
  };

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
            <img src={img.logo} alt="Logo Login" className="logo_login" />
          </div>
          <label>{string.Login}</label>
        </div>
        <div className="form">
          <div className="acount">
            <TextField
              label={string.Acount}
              fullWidth={true}
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
          <label className="forgotpassword_login">
            {string.ForgetPassword}
          </label>
        </div>
        <div className="button_login">
          <Button variant="contained" color="primary">
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
