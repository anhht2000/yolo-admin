import { useState } from 'react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import sideBarRouter from './SideBarRoute';
import AdminSidebarSubRouter from './AdminSidebarSubRouter';

const AdminSideBarRouter: React.FC = () => {
  const [active, setActive] = useState({});
  return (
    <div className="admin-sidebar__content-router">
      {sideBarRouter.map((e,index) => {
        if (e.path) {
          return (
            <NavLink
              to={e.path}
              key={index}
              className="admin-router__one"
              exact
            >
              <i className={e.icon}></i>{e.routerName}
            </NavLink>
          )
        } else if (e.router && e.router?.length > 0) {
          return (
            <AdminSidebarSubRouter e={e} key={index}/>
          )
        }
        return (<></>)
      }
      )}
    </div>
  )
}

export default AdminSideBarRouter;
