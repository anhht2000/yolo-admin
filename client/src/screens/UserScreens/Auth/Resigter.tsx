import { Box, Button, InputAdornment, TextField, Typography } from '@material-ui/core';
import { AccountCircle, Fingerprint } from '@material-ui/icons';
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
        return { ...prev, username: 'Invalid type email or empty email' };
      });
    }
    if (!checkPass) {
      setErrors((prev) => {
        return { ...prev, password: 'Invalid type password or empty password' };
      });
    }
    if (!checkPhone) {
      setErrors((prev) => {
        return { ...prev, phone: 'Invalid type phone or empty phone' };
      });
    }
    if (!values.address) {
      setErrors((prev) => {
        return { ...prev, address: 'You must typing address' };
      });
    }
    if (!values.name) {
      setErrors((prev) => {
        return { ...prev, name: 'You must typing your name' };
      });
    }
    if (!values.confirm || values.confirm !== values.password) {
      setErrors((prev) => {
        return { ...prev, confirm: 'You must typing confirm password as password' };
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
      toast.success('Login successfully');
      history.push('/login');
    } else {
      toast.error('Login fail');
    }
  }, []);
  return (
    <div className="container_login">
      <div className="background_img"></div>
      <div className="content_login">
        <Box textAlign="center">
          <Typography variant="h4">Sign Up</Typography>
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
              type={'text'}
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
              }}
            />
          </div>
          <div className="password">
            <TextField
              type={'text'}
              label={'Confirm password*'}
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
              }}
            />
          </div>
          <div className="password">
            <TextField
              type={'text'}
              label={'Name*'}
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
              label={'Address*'}
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
              label={'Phone*'}
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
            {'Sign Up'}
          </Button>
        </div>
        <div className="option_resigter">
          <label className="resigter_login">
            {'You have account.Please sign in.'}
            <NavLink exact to="/login" style={{ textDecoration: 'none' }}>
              <label className="resigter">{'Sign In'}</label>
            </NavLink>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Resigter;
