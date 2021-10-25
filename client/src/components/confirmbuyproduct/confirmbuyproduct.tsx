import React from "react";
import { FormatMoney } from "../../lib/FunctHelper";
import { NavLink } from "react-router-dom";
interface PropConfirm {
  count?: number;
  countmoney?: any;
  ordered?: any;
  continue_shopping?: () => {} | any;
}
const Confirmbuyproduct = (props: PropConfirm) => {
  const { count, countmoney, ordered, continue_shopping } = props;
  return (
    <div className="container_confirmbuy">
      <label className="container_confirmbuy_title">
        Bạn có {count} sản phẩm trong giỏ hàng
      </label>
      <div className="container_confirmbuy_countmoney">
        <label className="container_confirmbuy_countmoney-title">
          Thành tiền:
        </label>
        <div className="container_confirmbuy_countmoney-money">
          {FormatMoney(countmoney)}
        </div>
      </div>
      <div className="container_confirmbuy_bt">
        {/* <NavLink exact to={"/list_pay_product"}> */}
          <button
            type="button"
            onClick={ordered}
            className="container_confirmbuy_bt-confirm"
          >
            ĐẶT HÀNG
          </button>
        {/* </NavLink> */}
      </div>
      <div className="container_confirmbuy_bt">
        <NavLink exact to={"/product"}>
          <button
            type="button"
            onClick={continue_shopping}
            className="container_confirmbuy_bt-confirm"
          >
            TIẾP TỤC MUA HÀNG
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Confirmbuyproduct;
