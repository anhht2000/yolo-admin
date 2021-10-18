import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AuthLayout from '../../../layout/AuthLayout/AuthLayout';

const schema = yup.object().shape({
  email: yup.string().email('Please typing have type is email').required('Please typing your email'),
  password: yup.string().min(5, 'Please typing min is 5 character').required('Please typing your password'),
});
export default function Login() {
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
    // clearErrors(`${target.name}`);
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
          <p className="lead fw-normal mb-0 me-3">Sign in with</p>
          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fa fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fa fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-primary btn-floating mx-1">
            <i className="fa fa-linkedin"></i>
          </button>
        </div>

        <div className="divider d-flex align-items-center justify-content-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">Or</p>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            {...register('email')}
            onMouseDown={handleMouseDown}
            defaultValue={getValues('email')}
            className={
              errors.email ? 'form-control form-control-lg form__error' : 'form-control form-control-lg'
            }
            placeholder="Enter a valid email address"
          />
          <p className="text__error">{errors.email?.message}</p>
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
              placeholder="Enter password"
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

        <div className="d-flex justify-content-between align-items-center">
          <div className="form-check mb-0">
            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
            <label className="form-check-label" htmlFor="form2Example3">
              Remember me
            </label>
          </div>
          <a href="#!" className="text-body">
            Forgot password?
          </a>
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button type="submit" className="btn btn-primary btn-lg px-5">
            Login
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0 fs-6">
            Don't have an account?{' '}
            <Link to="sign-up" className="link-danger">
              Register
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
