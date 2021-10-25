import React, { useState, useCallback } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../../../layout/AuthLayout/AuthLayout';
import '../../../sass/components/_form.scss';
import userApi, { IChangePass, ISignIn } from '../../../core/userApi';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  password: yup.string().min(5, 'Bạn phải nhập ít nhất là 5 ký tự').required('Bạn phải nhập mật khẩu'),
  confirm: yup.string().oneOf([yup.ref('password')], 'Mật khẩu phải trùng với mật khẩu đã nhập'),
});
export default function ChangePass() {
  const history = useHistory();
  const { token }: any = useParams();
  const tokenStore = localStorage.getItem('token_forget');
  if (!token || token !== tokenStore) {
    history.push('/login');
  }
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
    callApi(data, token);
  };
  const callApi = useCallback(
    async (value: IChangePass, token: string) => {
      const data = await userApi.changePass(value, token);
      if (data?.status === 200) {
        toast.success('Đổi mật khẩu thành công.Vui lòng đăng nhập');
        history.push('/login');
      } else {
        toast.error('Đổi mật khẩu  thất bại');
      }
    },
    [history]
  );
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <p className="lead fw-bold mb-3 me-3 fs-1">Lấy lại mật khẩu</p>
        </div>

        <div className="divider d-flex align-items-center justify-content-center ">
          <p className=" fw-bold my-5 mx-3 mb-3">Vui lòng nhập mật khẩu mới</p>
        </div>

        <div className="form-outline mb-3 ">
          <div className={'position-relative'}>
            <input
              type={isShowPass ? 'text' : 'password'}
              id="form3Example5"
              {...register('password')}
              defaultValue={getValues('password')}
              onMouseDown={handleMouseDown}
              className={
                errors.password ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
              }
              placeholder="Nhập mật khẩu mới của bạn"
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
              id="form3Example5"
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

        <div className="text-center mt-5 pt-3">
          <button type="submit" className="btn btn-primary btn-lg px-5 mb-4 fs-4">
            Xác nhận
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
