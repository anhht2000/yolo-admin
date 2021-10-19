import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../../../layout/AuthLayout/AuthLayout';
import '../../../sass/components/_form.scss';
import userApi, { IForget, ISignIn } from '../../../core/userApi';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  username: yup.string().email('Bạn phải nhập đúng định dạng email').required('Bạn phải nhập email'),
});
export default function ForgetPassword() {
  const history = useHistory();
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
    callApi(data);
  };
  const callApi = useCallback(async (value: IForget) => {
    const data = await userApi.forget(value);
    if (data?.status === 200) {
      localStorage.setItem('token_forget', data?.data?.data);
      toast.success('Vui lòng kiểm tra lại email để thay đổi mật khẩu');
    } else {
      toast.error('Tên người dùng của bạn không tồn tại ');
    }
  }, []);
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <p className="lead fw-bold mb-3 me-3 fs-1">Tìm tài khoản của bạn</p>
        </div>

        <div className="divider d-flex align-items-center justify-content-center ">
          <p className=" fw-bold my-5 mx-3 mb-0">
            Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của bạn.
          </p>
        </div>

        <div className="form-outline mb-4 mt-4">
          <input
            type="text"
            {...register('username')}
            onMouseDown={handleMouseDown}
            defaultValue={getValues('username')}
            className={
              errors.username ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
            }
            placeholder="Nhập email của bạn"
          />
          <p className="text__error">{errors.username?.message}</p>
        </div>

        <div className="text-center mt-5 pt-3">
          <button type="submit" className="btn btn-primary btn-lg px-5 mb-4 fs-4">
            Tìm kiếm
          </button>
          <button
            className="btn btn-secondary btn-lg px-5 ms-3 mb-4 fs-4"
            onClick={() => {
              history.push('/login');
            }}>
            Hủy bỏ
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
