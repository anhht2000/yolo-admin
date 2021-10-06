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
  const [countProduct, setCountProduct] = useState(0);
  const handleCountPrice = () => {
    const Price: number[] = [];
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
  const handleCountProduct = () => {
    const CountProduct: number[] = [];
    if (data.length !== 0) {
      data.map((e: any) => {
        return CountProduct.push(parseInt(e.number));
      });
    } else return CountProduct.push(0);
    const count = CountProduct.reduce(function (total, number) {
      return total + number;
    }, 0);
    setCountProduct(count);
  };
  const reloadCountProduct = (Number: number) => {
    setCountProduct(countProduct + Number);
  };
  const setPlusPrice = (price: number) => {
    setCountPrice(countPrice + price);
  };
  const setSubtractPrice = (price: number) => {
    setCountPrice(countPrice - price);
  };
  const setCountProductUpdatePlus = (Number: number) => {
    setCountProduct(countProduct + Number);
  };
  const setCountProductUpdateSubtract = (Number: number) => {
    setCountProduct(countProduct - Number);
  };
  const handleOrder = () => {};
  const handleContinue = () => {};
  const deleteProduct = (title: string, Index: number) => {
    if (data_list.length > 0) {
      const Data = data_list.filter((item, index) => {
        if (index === 0) {
          setCountProduct(0);
          setCountPrice(0);
        }
        return index !== Index;
      });
      setData(Data);
      localStorage.setItem("cartProduct", JSON.stringify(Data));
    }
  };
  useEffect(() => {
    handleCountPrice();
    handleCountProduct();
  }, [data]);
  return (
    <LayoutContainer>
      <div className="container_listprodcutadd">
        <div className="container_listprodcutadd_leftconfirm">
          <ConfirmBuyProduct
            count={countProduct}
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
                    deleteProduct(e.title, index);
                  }}
                  setPriceUpdate={setPlusPrice}
                  setSubtractPrice={setSubtractPrice}
                  setCountProductUpdatePlus={setCountProductUpdatePlus}
                  setCountProductUpdateSubtract={setCountProductUpdateSubtract}
                  reloadCountProduct={reloadCountProduct}
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
