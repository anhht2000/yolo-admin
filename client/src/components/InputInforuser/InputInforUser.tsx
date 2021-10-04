/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Icon } from "../../assets/index";
interface PropInforUser {
  name?: string;
  phone?: string;
  infor?: string;
}
const InputInforUser: React.FC<PropInforUser> = (props) => {
  const { name, phone, infor } = props;
  return (
    <div className="container_infor">
      <div className="container_infor_header">
        <img src={Icon.Ic_location}></img>
        <label>Địa chỉ nhận hàng</label>
      </div>
      <div className="container_infor_footer">
        <label>{name ? name : ""}</label>
        <label>{phone ? phone : ""}</label>
        <label>
          {infor
            ? infor
            : "Thông tin nhận hàng chưa có.Vui lòng điền thông tin"}
        </label>
        <label>THAY ĐỔI</label>
      </div>
    </div>
  );
};

export default InputInforUser;
