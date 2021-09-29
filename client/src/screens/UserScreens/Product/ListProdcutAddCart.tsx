/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import LayoutContainer from "../../../layout/HomeLayout/LayoutContainer";
import ConfirmBuyProduct from "../../../components/confirmbuyproduct/confirmbuyproduct";
import ListAddProduct from "../../../components/listaddproduct/listaddproduct";
import { NavLink } from "react-router-dom";
const ListProdcutAddCart = () => {
  const data_list = JSON.parse(
    localStorage.getItem("cartProduct") as string
  ) as {
    title: string;
    image01: string;
    variant: string[];
    variant_value: string[];
    price: string;
    number: number;
  }[];
  const [countPrice, setCountPrice] = useState(0);
  const [data, setData] = useState(data_list);
  console.log(data);

  const CountProduct = data.length !== 0 ? data.length : 0;
  const handleCountPrice = () => {
    const Price: any[] = [];
    if (data.length !== 0) {
      data.map((e: any) => {
        return Price.push(parseInt(e.price) * parseInt(e.number));
      });
    } else return Price.push(0);
    const count = Price.reduce(function (total, number) {
      return total + number;
    }, 0);
    setCountPrice(count);
  };
  const setPlusPrice = (price: number) => {
    setCountPrice(countPrice + price);
  };
  const setSubtractPrice = (price: number) => {
    setCountPrice(countPrice - price);
  };
  const handleOrder = () => {};
  const handleContinue = () => {};
  const deleteProduct = (
    title: string,
    variant_value: string[],
    Index: number
  ) => {
    const Data = data_list.filter((item, index) => {
      return index !== Index;
    });
    console.log(Data);
    console.log(Index);
    setData(Data);
    localStorage.setItem("cartProduct", JSON.stringify(Data));
  };

  useEffect(() => {
    handleCountPrice();
  }, [data]);

  return (
    <LayoutContainer>
      <div className="container_listprodcutadd">
        <div className="container_listprodcutadd_leftconfirm">
          <ConfirmBuyProduct
            count={CountProduct}
            countmoney={`${countPrice}`}
            ordered={handleOrder}
            continue_shopping={handleContinue}
          />
        </div>
        <div className="container_listprodcutadd_right">
          {data.length !== 0 ? (
            data.map((e, index) => (
              <div key={index}>
                <ListAddProduct
                  image01={e.image01}
                  title={e.title}
                  variant_value={e.variant_value}
                  price={e.price}
                  count={e.number}
                  deleteProduct={() => {
                    deleteProduct(e.title, e.variant_value, index);
                  }}
                  setPriceUpdate={setPlusPrice}
                  setSubtractPrice={setSubtractPrice}
                />
              </div>
            ))
          ) : (
            <div className="container_listprodcutadd_right-Error">
              <label>Hiện bạn chưa có sản phẩm nào trong giỏ hàng</label>
              <div>
                <NavLink exact to={"/product"}>
                  <button className="container_listprodcutadd_right-Error-bt">
                    TIẾP TỤC MUA SẮM
                  </button>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ListProdcutAddCart;
