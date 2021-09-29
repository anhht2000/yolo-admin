import React from 'react'
import { imgLogo } from '../../assets';
import AdminSideBarRouter from './AdminSideBarRouter';

const AdminSidebar: React.FC = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__logo">
        <img src={imgLogo.admin_logo} alt="logoimg" />
        AdminLTE 3
      </div>
      <div className="admin-sidebar__content">
        <div className="admin-sidebar__content-user">
          <img src={imgLogo.user_2} alt="user_2" />
          Alexander đệ nhát
        </div>
        <AdminSideBarRouter/>
      </div>
    </div>
  )
}

export default AdminSidebar;
