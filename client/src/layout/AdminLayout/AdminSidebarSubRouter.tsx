import { useState } from 'react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { ISidebarRouter } from './SideBarRoute';

interface IAdminSidebarSubRouter {
  e : ISidebarRouter
}

const AdminSidebarSubRouter: React.FC<IAdminSidebarSubRouter> = ({e}) => {
  const [active, setActive] = useState(false)
  return (
    <div className="admin-router__multiple">
    <div className={`admin-router__multiple-header ${active ? 'active': ''}`} onClick={()=>{setActive(!active)}}>
      <i className={e.icon}></i>
      <div className={'admin-router__multiple-header-title'}>
        {e.routerName}
      </div>
      <i className={'bx bx-chevron-left admin-router__multiple-icon'}></i>
    </div>
    <div className={`admin-router__multiple-router ${active ? 'active': ''}`}>
    {e.router?.map((routerSub,index) => (
      <NavLink
      to={routerSub.path as string}
      key={index}
      className="admin-router__one"
      exact
      >
        {routerSub.icon && <i className={routerSub.icon}></i>}
        <div className="admin-router__multiple-router-char">
          {routerSub.routerName}
        </div>
      </NavLink>
    ))}
    </div>
  </div>
  )
}

export default AdminSidebarSubRouter;
