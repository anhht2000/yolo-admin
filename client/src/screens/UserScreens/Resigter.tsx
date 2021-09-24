import React, { useState, useRef, useEffect } from "react";
import "../../sass/resigter.scss";
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
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../../lib/FunctHelper";
import { imgLogo } from "../../assets";
const Resigter = () => {
  const [sex, setSex] = useState({
    showSex: "10",
  });
  const sexRef = useRef(null);
  const [values, setValues] = useState({
    amount: "",
    password: "",
    confirm: "",
    weight: "",
    weightRange: "",
    sex: "",
    date_of_birth: "",
    phone: "",
    showPassword: false,
    showPasswordConfirm: false,
    errorE: false,
    erroremail: "",
    errorP: false,
    errorpassword: "",
    errorPhone: false,
    content_error_phone: "",
    error_confirm: false,
    error_confirm_password: "",
  });
  const handleChangeAge = (event: any) => {
    setSex({
      ...sex,
      showSex: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowPasswordConfirm = () => {
    setValues({ ...values, showPasswordConfirm: !values.showPasswordConfirm });
  };
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
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
  const handleConfirmPassword = (event: any) => {
    setValues({
      ...values,
      confirm: event.target.value,
    });
  };
  const handlePhone = (event: any) => {
    setValues({
      ...values,
      phone: event.target.value,
    });
  };
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
  const CheckConfirmPassword = (confirm_password: string) => {
    if (confirm_password != values.password && values.confirm.length > 0) {
      return setValues({
        ...values,
        error_confirm: true,
        error_confirm_password: `${string.ErrorConfirm}`,
      });
    } else {
      return setValues({
        ...values,
        error_confirm: false,
        error_confirm_password: "",
      });
    }
  };
  const CheckPhone = (phone: string) => {
    if (!validatePhone(phone) && values.phone.length > 0) {
      return setValues({
        ...values,
        errorPhone: true,
        content_error_phone: `${string.ErrorPhone}`,
      });
    } else {
      return setValues({
        ...values,
        errorPhone: false,
        content_error_phone: "",
      });
    }
  };
  useEffect(() => {
    CheckEmail(values.amount);
  }, [values.amount]);
  useEffect(() => {
    CheckPassword(values.password);
  }, [values.password]);
  useEffect(() => {
    CheckPhone(values.phone);
  }, [values.phone]);
  useEffect(() => {
    CheckConfirmPassword(values.confirm);
  }, [values.confirm]);

  return (
    <div className="container_resigter">
      <div className="background_img"></div>
      <div className="content_resigter">
        <div className="header_resigter">
          <div>
            <img
              src={imgLogo.logo_2}
              alt="Logo resigter"
              className="logo_resigter"
            />
          </div>
          <label>{string.SignIn}</label>
        </div>
        <div className="form_resigter">
          <div className="acount_resigter">
            <TextField
              label={string.Acount}
              fullWidth={true}
              error={values.errorE}
              helperText={values.erroremail}
              value={values.amount}
              onChange={handleEmail}
              placeholder={string.HolderEmail}
            />
          </div>
          <div className="acount_resigter">
            <TextField label={string.Name} fullWidth={true} />
          </div>
          <div className="acount_resigter_sex" ref={sexRef}>
            <TextField
              label={string.Sex}
              fullWidth={true}
              onChange={handleChangeAge}
              value={sex.showSex}
              select
            >
              <MenuItem value="10">Nam</MenuItem>
              <MenuItem value="20">Nữ</MenuItem>
            </TextField>
          </div>
          <div className="acount_resigter_date">
            <TextField
              label={string.DateOfBirth}
              type="date"
              fullWidth={true}
              defaultValue="2017-05-18"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="acount_resigter">
            <TextField
              label={string.Phone}
              fullWidth={true}
              error={values.errorPhone}
              helperText={values.content_error_phone}
              value={values.phone}
              onChange={handlePhone}
            />
          </div>
          <div className="acount_resigter_password">
            <TextField
              label={string.Password}
              fullWidth={true}
              error={values.errorP}
              helperText={values.errorpassword}
              value={values.password}
              onChange={handlePassword}
              InputProps={{
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
          <div className="acount_resigter_password">
            <TextField
              label={string.ConfirmPassword}
              fullWidth={true}
              error={values.error_confirm}
              helperText={values.error_confirm_password}
              value={values.confirm}
              onChange={handleConfirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPasswordConfirm ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="button_resigter">
          <Button variant="contained" color="primary">
            {string.SignIn}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Resigter;
