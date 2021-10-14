import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import { AccountCircle, Fingerprint, Visibility, VisibilityOff } from '@material-ui/icons';
import GroupIcon from '@material-ui/icons/Group';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PhoneIcon from '@material-ui/icons/Phone';
import { ChangeEvent } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useCallback, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { string } from '../../../assets/string';
import userApi from '../../../core/userApi';
import { validateEmail, validatePassword, validatePhone } from '../../../lib/FunctHelper';

const Resigter = () => {
  const history = useHistory();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const [values, setValues] = useState({
    username: '',
    password: '',
    confirm: '',
    address: '',
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirm: '',
    address: '',
    name: '',
    phone: '',
  });
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
    const checkPhone = validatePhone(values.phone);
    if (!checkEmail) {
      setErrors((prev) => {
        return { ...prev, username: 'Email không được để trống hoặc sai kiểu dữ liệu' };
      });
    }
    if (!checkPass) {
      setErrors((prev) => {
        return { ...prev, password: 'Mật khẩu không được để trống hoặc sai kiểu dữ liệu' };
      });
    }
    if (!checkPhone) {
      setErrors((prev) => {
        return { ...prev, phone: 'Số điện thoại không được để trống hoặc sai kiểu dữ liệu' };
      });
    }
    if (!values.address) {
      setErrors((prev) => {
        return { ...prev, address: 'Bạn phải nhập địa chỉ' };
      });
    }
    if (!values.name) {
      setErrors((prev) => {
        return { ...prev, name: 'Bạn phải nhập tên' };
      });
    }
    if (!values.confirm || values.confirm !== values.password) {
      setErrors((prev) => {
        return { ...prev, confirm: 'Bạn phải nhập trùng mật khẩu ' };
      });
    }
    setErrors((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
        callApi(values);
      }
      return prev;
    });
  };
  const callApi = useCallback(async (value) => {
    const data = await userApi.signUp(value);
    if (data?.status === 200) {
      toast.success('Đăng ký thành công');
      history.push('/login');
    } else {
      toast.error('Đăng ký thất bại vì tài khoản này đã tồn tại');
    }
  }, []);
  return (
    <div className="container_login">
      <div className="background_img"></div>
      <div className="content_login">
        <Box textAlign="center" mb={2}>
          <Typography variant="h4">Đăng ký</Typography>
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
          <div className="password">
            <TextField
              type={isShowPass ? 'text' : 'password'}
              label={'Mật khẩu*'}
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
                      {isShowPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="password">
            <TextField
              type={isShowConfirm ? 'text' : 'password'}
              label={'Nhập lại mật khẩu*'}
              fullWidth
              error={Boolean(errors.confirm)}
              helperText={errors?.confirm}
              name="confirm"
              value={values?.confirm}
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
                        setIsShowConfirm(!isShowConfirm);
                      }}>
                      {isShowConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="password">
            <TextField
              type={'text'}
              label={'Tên*'}
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors?.name}
              name="name"
              value={values?.name}
              onChange={handleChange}
              onMouseDown={handleRemoveErr}
              placeholder={'Nguyen Van A ...'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GroupIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="password">
            <TextField
              type={'text'}
              label={'Địa chỉ*'}
              fullWidth
              error={Boolean(errors.address)}
              helperText={errors?.address}
              name="address"
              value={values?.address}
              onChange={handleChange}
              onMouseDown={handleRemoveErr}
              placeholder={'Ha Noi, HCM,...'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ImportContactsIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="password">
            <TextField
              type={'text'}
              label={'Số điện thoại*'}
              fullWidth
              error={Boolean(errors.phone)}
              helperText={errors?.phone}
              name="phone"
              value={values?.phone}
              onChange={handleChange}
              onMouseDown={handleRemoveErr}
              placeholder={'098747854...'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="button_login">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {'Đăng ký'}
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
    </div>
  );
};

export default Resigter;
