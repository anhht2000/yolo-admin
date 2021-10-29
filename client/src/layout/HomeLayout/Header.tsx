import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { imgLogo } from '../../assets';
import { useAppSelector } from '../../hooks/reduxHooks';
import { actionSetLogin, getLogin } from '../../redux/reducers/order.reducer';
import { getTotalProducts } from '../../redux/reducers/productDetail.reducer';
import { HeaderIcons, HeaderLinks } from './HeaderLinks';
const Header = () => {
  const [dpmenu, setDpmenu] = useState(false);
  const totalProductInCart = useAppSelector(getTotalProducts);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useAppSelector(getLogin);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isLogin', JSON.stringify(false));

    dispatch(actionSetLogin(false));
    history.push('/');
  };
  useLayoutEffect(() => {
    if (window.innerWidth < 850) setDpmenu(false);
  }, []);
  const dpMenuToggle = () => setDpmenu(!dpmenu);
  return (
    <div className="header">
      <i className="header__mb-menu bx bxs-grid-alt" onClick={dpMenuToggle}></i>
      <ul className={`header__link ${dpmenu ? 'active' : 'close'}`}>
        {HeaderLinks.map((e, index) => (
          <li key={index}>
            <NavLink exact to={e.path} activeClassName="header__link-active">
              {e.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="header__icon">
        {HeaderIcons.map((e, index) => (
          <li key={index} className="position-relative">
            <NavLink exact to={e.path}>
              <i className={e.className}></i>
            </NavLink>
            {e.isCheck && totalProductInCart > 0 ? (
              <span className="header__icon-shop">{totalProductInCart}</span>
            ) : (
              ''
            )}
          </li>
        ))}
        <li className="position-relative">
          {isLogin ? (
            <div className="info-user">
              <div className="d-flex align-items-center gap-2 ">
                <img src="https://picsum.photos/id/237/200/300" alt="" className="img-avt" />
                <span className="fs-5">tuananhcx2000@gmail.com</span>
              </div>
              <ul className="sub-avt">
                <li className="sub-avt__item">
                  <Link to="/history">Đơn hàng đã mua</Link>
                </li>
                <li className="sub-avt__item">
                  <span onClick={handleLogout}>Đăng xuất</span>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink exact to={'/login'}>
              <i className={'bx bx-user'}></i>
            </NavLink>
          )}
        </li>
      </ul>
      <div className="header__logo">
        <img src={imgLogo.logo_2} alt="logo" className="header__logo--img" />
      </div>
    </div>
  );
};

export default Header;
