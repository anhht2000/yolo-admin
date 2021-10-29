import React, { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "../../assets";
import { FormatMoney } from "../../lib/FunctHelper";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  actionPlusTotalProducts,
  getTotalProducts,
} from "../../redux/reducers/productDetail.reducer";
interface PropListAdd {
  product?: any;
  deleteProduct?: any;
  countmoney?: any;
  setPriceUpdate: (price: number) => void;
  setSubtractPrice: (price: number) => void;
  setCountProductUpdatePlus: (Number: number) => void;
  setCountProductUpdateSubtract: (Number: number) => void;
  reloadCountProduct: (Number: number) => void;
}
const Listaddproduct: React.FC<PropListAdd> = (props) => {
  const dispatch = useAppDispatch();
  const totalProductInCart = useAppSelector(getTotalProducts);

  const {
    product,
    deleteProduct,
    setPriceUpdate,
    setSubtractPrice,
    setCountProductUpdatePlus,
    setCountProductUpdateSubtract,
    reloadCountProduct,
  } = props;

  const [currentNumber, SetCurrentNumber] = useState<number>(
    product.quantity as number
  );
  const data = JSON.parse(
    localStorage.getItem("cartProducts") as string
  ) as any[];
  const [number, setNumber] = useState<number>(product.quantity as number);
  const [currentTotalProduct, setCurrentTotalProduct] = useState<number>(
    product.quantity as number
  );

  const saveToLocal = () => {
    const totalProductPlus = number - currentTotalProduct;
    dispatch(actionPlusTotalProducts(totalProductPlus));
    if (data) {
      let flag = false;
      let temp = data.map((e) => {
        if (JSON.stringify(product.data) === JSON.stringify(e.data)) {
          flag = true;
          e = { ...e, quantity: number };
        }
        return e;
      });
      if (flag) {
        localStorage.setItem('cartProducts', JSON.stringify([...temp]));
      }
    }
  };
  const setInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 1) {
      setNumber(1);
      SetCurrentNumber(1);
    } else {
      setCurrentTotalProduct(number);
      setNumber(parseInt(e.target.value));
      setPriceUpdate(
        (parseInt(e.target.value) - currentNumber) *
          parseInt(product.data.price as string)
      );
      SetCurrentNumber(parseInt(e.target.value));
    }
    handleReload(parseInt(e.target.value), currentNumber);
  };
  const plusClick = () => {
    setCurrentTotalProduct(number);
    setNumber(number + 1);
    setPriceUpdate(parseInt(product.data.price as string));
    setCountProductUpdatePlus(1);
    SetCurrentNumber(number + 1);
  };
  const minusClick = () => {
    if (number - 1 < 1) return;
    setCurrentTotalProduct(number);
    setNumber(number - 1);
    setSubtractPrice(parseInt(product.data.price as string));
    setCountProductUpdateSubtract(1);
    SetCurrentNumber(number + 1);
  };

  const handleReload = (Number: number, CurrentNumber: number) => {
    let count = 0;
    if (Number > CurrentNumber) {
      count = Number - CurrentNumber;
      return reloadCountProduct(count);
    } else {
      count = CurrentNumber - Number;
      reloadCountProduct(-count);
    }
  };

  useEffect(() => {
    saveToLocal();
  }, [number]);

  useEffect(() => {
    setNumber(product.quantity);
    SetCurrentNumber(product.quantity);
    setCurrentTotalProduct(product.quantity);
  }, [product]);

  return (
    <div className="container_listadd align-items-center">
      <div className="container_listadd_left">
        <img
          src={`${process.env.REACT_APP_API_URL}${product.data.productImg[0].imgPath}`}
          alt="img-list1"
          className="container_listadd_left-img"
        />
        <label className="container_listadd_left-title d-flex align-items-center">
          {product.data.name}{product.data.options.length > 0 && '-'}
          {
            product.data.options.map((option: any, index: number) => (
              <div key={index} className="d-flex align-items-center">
                {option.meta === 'color' &&
                  (<>
                      <span
                        className="container_listadd_color"
                        style={{ backgroundColor: option.OptionVal.name }}
                      >

                  </span>
                      {index < product.data.options.length - 1 && '-'}
                  </>)
                }
                {option.meta === 'text' &&
                (<span>{option.OptionVal.name}{index < product.data.options.length - 1 && '-'}</span>)
                }
              </div>
            ))
          }
        </label>
      </div>
      <div className="container_listadd_right">
        <span className="container_listadd_right-price">
          {FormatMoney(product.data.price as string)}
        </span>
        <div className="container_listadd_right-option">
          <i className="bx bx-minus" onClick={minusClick} />
          <input
            type="text"
            value={number}
            onChange={setInputChange}
            className="container_listadd_right-option-bt"
          />
          <i className="bx bx-plus" onClick={plusClick} />
        </div>
        <img
          src={Icon.Ic_delete}
          onClick={deleteProduct}
          className="container_listadd_right-ic"
         alt='icon'/>
      </div>
    </div>
  );
};
export default Listaddproduct;
