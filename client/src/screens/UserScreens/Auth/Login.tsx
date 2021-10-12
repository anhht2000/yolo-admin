import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { AccountCircle, Fingerprint, Visibility, VisibilityOff } from '@material-ui/icons';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string } from '../../../assets/string';
import { validateEmail, validatePassword } from '../../../lib/FunctHelper';
import '../../../sass/login.scss';

const Login = () => {
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isShowPass, setIsShowPass] = useState(false);
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleRemoveErr = ({ target }: any) => {
    const { name } = target;
    setErrors({
      ...errors,
      [name]: '',
    });
  };
  const handleSubmit = () => {
    const checkEmail = validateEmail(values.username);
    const checkPass = validatePassword(values.password);
    if (!checkEmail) {
      setErrors((prev) => {
        return { ...prev, username: 'Invalid type email or empty email' };
      });
    }
    if (!checkPass) {
      setErrors((prev) => {
        return { ...prev, password: 'Invalid type password or empty password' };
      });
    }
    setErrors((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
      }
      return prev;
    });
  };
  return (
    <form className="container_login">
      <div className="background_img"></div>
      <div className="content_login">
        <Box textAlign="center">
          <Typography variant="h4">Sign In</Typography>
        </Box>
        <div className="form">
          <div className="acount">
            <TextField
              label={string.Acount}
              fullWidth={true}
              error={Boolean(errors.username)}
              helperText={errors?.username}
              name="username"
              value={values?.username}
              onChange={handleChange}
              onMouseDown={handleRemoveErr}
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
              type={isShowPass ? 'text' : 'password'}
              label={string.Password}
              fullWidth={true}
              error={Boolean(errors.password)}
              helperText={errors?.password}
              name="password"
              value={values?.password}
              onChange={handleChange}
              onMouseDown={handleRemoveErr}
              placeholder={string.HolderPass}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Fingerprint />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setIsShowPass(!isShowPass);
                      }}>
                      {isShowPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="option_login">
          <div>
            <input type="checkbox" />
            <label className="remember_login">{'Remember'}</label>
          </div>
          <NavLink exact to="/forgotpass" style={{ textDecoration: 'none' }}>
            <label className="forgotpassword_login">{'Forgot Password'}</label>
          </NavLink>
        </div>
        <div className="button_login">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {string.Login}
          </Button>
        </div>
        <div className="option_resigter">
          <label className="resigter_login">
            {"You don't have account.Please sign up."}
            <NavLink exact to="/resigter" style={{ textDecoration: 'none' }}>
              <label className="resigter">{'Sign Up'}</label>
            </NavLink>
          </label>
        </div>
      </div>
    </form>
  );
};

export default Login;
