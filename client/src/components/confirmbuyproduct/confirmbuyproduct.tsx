import React from "react";
import { FormatMoney } from "../../lib/FunctHelper";
interface PropConfirm {
  count?: number;
  countmoney?: any;
  ordered?: () => {} | any;
  continue_shopping?: () => {} | any;
}
const confirmbuyproduct = (props: PropConfirm) => {
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
        <button
          type="button"
          onClick={ordered}
          className="container_confirmbuy_bt-confirm"
        >
          {" "}
          ĐẶT HÀNG
        </button>
      </div>
      <div className="container_confirmbuy_bt">
        <button
          type="button"
          onClick={continue_shopping}
          className="container_confirmbuy_bt-confirm"
        >
          TIẾP TỤC MUA HÀNG
        </button>
      </div>
    </div>
  );
};

export default confirmbuyproduct;
