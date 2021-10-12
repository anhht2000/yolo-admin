import { Box, Button, InputAdornment, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { string } from '../../../assets/string';
import { validateEmail } from '../../../lib/FunctHelper';
import '../../../sass/forgotpass.scss';

const ForgotPassword = () => {
  const [values, setValues] = useState({ username: '' });
  const [errors, setErrors] = useState({ username: '' });
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
    if (!checkEmail) {
      setErrors((prev) => {
        return { ...prev, username: 'Invalid type email or empty email' };
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
        <Box textAlign="center" mb={2}>
          <Typography variant="h4">Quên mật khẩu</Typography>
        </Box>
        <div className="form">
          <div className="acount">
            <TextField
              label={'Tên người dùng*'}
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
        </div>

        <div className="button_login">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {'Confirm'}
          </Button>
        </div>
        <div className="option_resigter">
          <label className="resigter_login">
            {'Nếu bạn có tài khoản rồi.Vui lòng '}
            <NavLink exact to="/login" style={{ textDecoration: 'none' }}>
              <label className="resigter">{'Đăng nhập'}</label>
            </NavLink>
          </label>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
