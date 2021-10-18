import React from 'react';

interface AuthLayoutProps {
  children: React.HTMLAttributes<any>;
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <section className="vh-100 d-flex" style={{ fontSize: '1rem' }}>
      <div className="container h-custom app__container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src={'https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/draw2.svg'}
              className="img-fluid"
              alt=""
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">{children}</div>
        </div>
      </div>
    </section>
  );
}
