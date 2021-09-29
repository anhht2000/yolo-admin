import React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { imgLogo } from "../../assets";
import { HeaderLinks, HeaderIcons } from "./HeaderLinks";
const Header = () => {
  const [dpmenu, setDpmenu] = useState(false);
  useLayoutEffect(() => {
    if (window.innerWidth < 850) setDpmenu(false);
  }, []);
  const dpMenuToggle = () => setDpmenu(!dpmenu);
  return (
    <div className="header">
      <i className="header__mb-menu bx bxs-grid-alt" onClick={dpMenuToggle}></i>
      <ul className={`header__link ${dpmenu ? "active" : "close"}`}>
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
          <li key={index}>
            <NavLink exact to={e.path}>
            <i className={e.className}></i>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="header__logo">
        <img src={imgLogo.logo_2} alt="logo" className="header__logo--img" />
      </div>
    </div>
  );
};

export default Header;
