import { Box, Button, InputAdornment, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useState, useCallback } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import userApi, { IChangePass } from '../../../core/userApi';
import { validatePassword } from '../../../lib/FunctHelper';
import '../../../sass/forgotpass.scss';

export default function ChangePass() {
  const history = useHistory();
  const { token }: any = useParams();
  const tokenStore = localStorage.getItem('token_forget');
  if (!token || token !== tokenStore) {
    history.push('/login');
  }
  const [values, setValues] = useState({ password: '', confirm: '' });
  const [errors, setErrors] = useState({ password: '', confirm: '' });
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
    const checkPass = validatePassword(values.password);

    if (!checkPass) {
      setErrors((prev) => {
        return { ...prev, password: 'Mật khẩu không được để trống hoặc sai kiểu dữ liệu' };
      });
    }
    if (!values.confirm || values.confirm !== values.password) {
      setErrors((prev) => {
        return { ...prev, confirm: 'Bạn phải nhập trùng mật khẩu ' };
      });
    }
    setErrors((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
        callApi(values, token);
      }
      return prev;
    });
  };
  const callApi = useCallback(async (value: IChangePass, token: string) => {
    const data = await userApi.changePass(value, token);
    if (data?.status === 200) {
      toast.success('Đổi mật khẩu thành công.Vui lòng đăng nhập');
      history.push('/login');
    } else {
      toast.error('Đổi mật khẩu  thất bại');
    }
  }, []);
  return (
    <form className="container_login">
      <div className="background_img"></div>
      <div className="content_login">
        <Box textAlign="center" mb={2}>
          <Typography variant="h4">Đặt lại mật khẩu</Typography>
        </Box>
        <div className="form">
          <div className="acount">
            <TextField
              label={'Mật khẩu mới*'}
              fullWidth={true}
              error={Boolean(errors.password)}
              helperText={errors?.password}
              name="password"
              value={values?.password}
              onChange={handleChange}
              onMouseDown={handleRemoveErr}
              placeholder={'1213abcABC'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="acount">
            <TextField
              label={'Xác nhận mật khẩu*'}
              fullWidth={true}
              error={Boolean(errors.confirm)}
              helperText={errors?.confirm}
              name="confirm"
              value={values?.confirm}
              onChange={handleChange}
              onMouseDown={handleRemoveErr}
              placeholder={'1213abcABC'}
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
}
