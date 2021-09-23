import React, { useState } from "react";
import "../../sass/resigter.scss";
import { img } from "../../assets/index";
import { string } from "../../assets/string";
import {
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
const Resigter = () => {
  const [age, setAge] = React.useState("");
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const [confirmPass, setConfirmPass] = useState({
    showPasswordConfirm: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleChangeAge = (event: any) => {
    setAge(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowPasswordConfirm = () => {
    setConfirmPass({
      ...confirmPass,
      showPasswordConfirm: !confirmPass.showPasswordConfirm,
    });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  return (
    <div className="container_resigter">
      <div className="content_resigter">
        <div className="header_resigter">
          <div>
            <img
              src={img.banner.logo_2}
              alt="Logo resigter"
              className="logo_resigter"
            />
          </div>
          <label>{string.Resigter}</label>
        </div>
        <div className="form_resigter">
          <div className="acount_resigter">
            <TextField label={string.Acount} fullWidth={true} />
          </div>
          <div className="acount_resigter">
            <TextField label={string.Name} fullWidth={true} />
          </div>
          <div className="acount_resigter">
            <TextField
              label={string.Sex}
              fullWidth={true}
              onChange={handleChangeAge}
              value={age}
              select
            >
              <MenuItem value="10">Nam</MenuItem>
              <MenuItem value="20">Nữ</MenuItem>
            </TextField>
          </div>
          <div className="acount_resigter">
            <TextField
              label={string.DateOfBirth}
              type="date"
              fullWidth={true}
              defaultValue="24/05/2017"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="acount_resigter">
            <TextField label={string.Phone} fullWidth={true} />
          </div>
          <div className="acount_resigter">
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
          <div className="acount_resigter">
            <FormControl fullWidth={true}>
              <InputLabel>{string.ConfirmPassword}</InputLabel>
              <Input
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {confirmPass.showPasswordConfirm ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="button_resigter">
          <Button variant="contained" color="primary">
            {string.Resigter}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Resigter;
