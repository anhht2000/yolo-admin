import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../../../layout/AuthLayout/AuthLayout';
import '../../../sass/components/_form.scss';
import userApi from '../../../core/userApi';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  username: yup.string().email('Bạn phải nhập đúng định dạng email').required('Bạn phải nhập email'),
  password: yup.string().min(5, 'Bạn phải nhập ít nhất là 5 ký tự').required('Bạn phải nhập mật khẩu'),
  confirm: yup.string().oneOf([yup.ref('password')], 'Mật khẩu phải trùng với mật khẩu đã nhập'),
  phone: yup
    .number()
    .required('Bạn phải nhập số điện thoại')
    .min(9, 'Số điện thoại có ít nhất 9 ký tự')
    .typeError('Số điện thoại phải là số'),
  address: yup.string().required('Bạn phải nhập địa chỉ'),
});

export default function SignUp() {
  const history = useHistory();
  const [isShowPass, setIsShowPass] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleMouseDown = ({ target }: any) => {
    clearErrors();
  };
  const onSubmit = (data: any) => {
    data.phone = '0' + String(data?.phone);
    callApi(data);
  };
  const callApi = useCallback(
    async (value) => {
      const data = await userApi.signUp(value);
      if (data?.status === 200) {
        toast.success('Đăng ký thành công');
        history.push('/login');
      } else {
        toast.error('Đăng ký thất bại vì tài khoản này đã tồn tại');
      }
    },
    [history]
  );
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-row align-items-center justify-content-center ">
          <p className="lead fw-bold mb-3 me-3 fs-1">Đăng ký </p>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            {...register('username')}
            onMouseDown={handleMouseDown}
            defaultValue={getValues('username')}
            className={
              errors.username ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
            }
            placeholder="Nhập địa chỉ email"
          />
          <p className="text__error">{errors.username?.message}</p>
        </div>

        <div className="form-outline mb-3 ">
          <div className={'position-relative'}>
            <input
              type={isShowPass ? 'text' : 'password'}
              {...register('password')}
              defaultValue={getValues('password')}
              onMouseDown={handleMouseDown}
              className={
                errors.password ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
              }
              placeholder="Nhập mật khẩu"
            />
            {isShowPass ? (
              <i
                className="fa fa-eye-slash pass__icon"
                onClick={() => {
                  setIsShowPass(false);
                }}
              />
            ) : (
              <i
                className="fa fa-eye pass__icon"
                onClick={() => {
                  setIsShowPass(true);
                }}
              />
            )}
          </div>
          <p className="text__error">{errors.password?.message}</p>
        </div>

        <div className="form-outline mb-3 ">
          <div className={'position-relative'}>
            <input
              type={isShowConfirm ? 'text' : 'password'}
              {...register('confirm')}
              defaultValue={getValues('confirm')}
              onMouseDown={handleMouseDown}
              className={
                errors.confirm ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
              }
              placeholder="Xác nhận mật khẩu"
            />
            {isShowConfirm ? (
              <i
                className="fa fa-eye-slash pass__icon"
                onClick={() => {
                  setIsShowConfirm(false);
                }}
              />
            ) : (
              <i
                className="fa fa-eye pass__icon"
                onClick={() => {
                  setIsShowConfirm(true);
                }}
              />
            )}
          </div>
          <p className="text__error">{errors.confirm?.message}</p>
        </div>

        <div className="form-outline mb-3">
          <input
            type="text"
            {...register('phone')}
            defaultValue={getValues('phone')}
            onMouseDown={handleMouseDown}
            className={
              errors.phone ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
            }
            placeholder="Nhập số điện thoại"
          />
          <p className="text__error">{errors.phone?.message}</p>
        </div>
        <div className="form-outline mb-3">
          <input
            type="text"
            {...register('address')}
            defaultValue={getValues('address')}
            onMouseDown={handleMouseDown}
            className={
              errors.address ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
            }
            placeholder="Nhập địa chỉ"
          />
          <p className="text__error">{errors.address?.message}</p>
        </div>

        <div className="text-center mt-5 pt-3">
          <button type="submit" className="btn btn-primary btn-lg px-5 mb-4 fs-4">
            Đăng ký
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0 fs-4">
            Nếu bạn đã có tài khoản?{' '}
            <Link to="/login" className="link-danger">
              Đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
