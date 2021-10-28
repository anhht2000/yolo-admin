/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import LayoutContainer from '../../../layout/HomeLayout/LayoutContainer';
import ConfirmBuyProduct from '../../../components/confirmbuyproduct/confirmbuyproduct';
import ListAddProduct from '../../../components/listaddproduct/listaddproduct';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { actionPlusTotalProducts } from '../../../redux/reducers/productDetail.reducer';
import productDetailApi from '../../../core/productDetailApi';
import { toast } from 'react-toastify';

const ListProdcutAddCart = () => {
  const products = JSON.parse(localStorage.getItem('cartProducts') as string) as any[];
  const dispatch = useAppDispatch();
  const [countPrice, setCountPrice] = useState(0);
  const [data, setData] = useState(products);
  const [countProduct, setCountProduct] = useState(0);
  const handleCountPrice = () => {
    let count = 0;
    if (data.length !== 0) {
      data.forEach((e: any) => {
        count += e.data.price * e.quantity;
      });
    } else return count;
    setCountPrice(count);
  };
  const handleCountProduct = () => {
    let count = 0;
    if (data.length !== 0) {
      data.forEach((e: any) => {
        count += e.quantity;
      });
    } else return (count = 0);
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

  const handleOrder = useCallback(async () => {
    let productsCart: any[] = [];
    products.forEach((e: any) => {
      let keyOption: any[] = [];
      let keyOptionVal: any[] = [];
      if (e.data.options) {
        e.data.options.forEach((t: any) => {
          keyOption.push(t?.id);
          keyOptionVal.push(t?.OptionVal?.id);
        });
      }
      let optionVal: any = {};
      for (let i = 0; i < keyOption.length; i++) {
        optionVal[keyOption[i]] = keyOptionVal[i];
      }
      let p = {
        id: e.data.id,
        name: e.data.name,
        quanlity: e.quantity,
        price: e.data.price,
        option: optionVal,
      };
      productsCart.push(p);
    });
    const data = await productDetailApi.postAddToCart(productsCart);
    if (data?.status === 200) {
      toast.success('Đặt hàng thành công');
    } else {
      toast.error('Đặt hàng thất bại');
    }
  }, []);
  const handleContinue = () => {};
  const deleteProduct = (product: any) => {
    if (products.length > 0) {
      products.forEach((e: any, index: number) => {
        if (JSON.stringify(product.data) === JSON.stringify(e.data)) {
          products.splice(index, 1);
          setCountProduct(0);
          setCountPrice(0);
        }
      });
      dispatch(actionPlusTotalProducts(-product.quantity));
      setData(products);
      localStorage.setItem('cartProducts', JSON.stringify(products));
    }
  };
  useEffect(() => {
    handleCountPrice();
    handleCountProduct();
  }, [data]);
  return (
    <LayoutContainer>
      <div className="container_listprodcutadd">
        <div className={`${countProduct > 0 ? '' : 'd-none'} container_listprodcutadd_leftconfirm`}>
          <ConfirmBuyProduct
            count={countProduct}
            countmoney={`${countPrice}`}
            ordered={handleOrder}
            continue_shopping={handleContinue}
          />
        </div>
        <div className={`${countProduct > 0 ? '' : 'w-100'} container_listprodcutadd_right`}>
          {data.length !== 0 ? (
            data.map((product, index) => (
              <div key={index}>
                <ListAddProduct
                  product={product}
                  deleteProduct={() => {
                    deleteProduct(product);
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
                <NavLink exact to={'/product'}>
                  <button className="container_listprodcutadd_right-Error-bt">TIẾP TỤC MUA SẮM</button>
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
