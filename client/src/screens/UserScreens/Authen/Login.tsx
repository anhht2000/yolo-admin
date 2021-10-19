import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../../../layout/AuthLayout/AuthLayout';
import '../../../sass/components/_form.scss';
import userApi, { ISignIn } from '../../../core/userApi';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  username: yup.string().email('Bạn phải nhập đúng định dạng email').required('Bạn phải nhập email'),
  password: yup.string().min(5, 'Bạn phải nhập ít nhất là 5 ký tự').required('Bạn phải nhập mật khẩu'),
});
export default function Login() {
  const history = useHistory();
  const [isShowPass, setIsShowPass] = useState(false);
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
  const callApi = useCallback(
    async (value: ISignIn) => {
      const data = await userApi.signIn(value);
      if (data?.status === 200) {
        localStorage.setItem('token', data?.data?.data);
        toast.success('Đăng nhập thành công');
        history.push('/');
      } else {
        toast.error('Đăng nhập thất bại');
      }
    },
    [history]
  );
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <p className="lead fw-bold mb-3 me-3 fs-1">Đăng nhập</p>
        </div>

        {/* <div className="divider d-flex align-items-center justify-content-center ">
          <p className=" fw-bold my-5 mx-3 mb-0">Với</p>
        </div> */}

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
              placeholder="Nhập mật khẩu của bạn"
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

        <div className="d-flex justify-content-between align-items-center my-4">
          <div className="form-check mb-0">
            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
            <label className="form-check-label" htmlFor="form2Example3">
              Ghi nhớ đăng nhập
            </label>
          </div>
          <Link to="/forget-password" className="text-body">
            Quên mật khẩu?
          </Link>
        </div>

        <div className="text-center mt-5 pt-3">
          <button type="submit" className="btn btn-primary btn-lg px-5 mb-4 fs-4">
            Đăng nhập
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0 fs-4">
            Nếu bạn chưa có tài khoản?{' '}
            <Link to="/register" className="link-danger">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
