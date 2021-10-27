import React, { ChangeEvent, useEffect, useState } from 'react';
import { Icon } from '../../assets/index';
import { FormatMoney } from '../../lib/FunctHelper';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { actionPlusTotalProducts, getTotalProducts } from '../../redux/reducers/productDetail.reducer';
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

  let size, color;
  product.data.options.forEach((e: any) => {
    if (e?.name === 'Size') {
      size = e?.OptionVal.name;
    } else if (e?.name === 'Color') {
      color = e?.OptionVal.name;
    }
  });

  const [currentNumber, SetCurrentNumber] = useState<number>(product.quantity as number);
  const data = JSON.parse(localStorage.getItem('cartProducts') as string) as any[];
  const [number, setNumber] = useState<number>(product.quantity as number);
  const [currentTotalProduct, setCurrentTotalProduct] = useState<number>(product.quantity as number);

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
      setPriceUpdate((parseInt(e.target.value) - currentNumber) * parseInt(product.data.price as string));
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
    <div className="contaiber_listadd align-items-center">
      <div className="contaiber_listadd_left">
        <img
          src={`${process.env.REACT_APP_API_URL}${product.data.productImg[0].imgPath}`}
          alt="img-list1"
          className="contaiber_listadd_left-img"></img>
        <label className="contaiber_listadd_left-title d-flex align-items-center">
          {product.data.name}-
          {<span className="contaiber_listadd_color" style={{ backgroundColor: color }}></span>}-{size}
        </label>
      </div>
      <div className="contaiber_listadd_right">
        <span className="contaiber_listadd_right-price">{FormatMoney(product.data.price as string)}</span>
        <div className="contaiber_listadd_right-option">
          <i className="bx bx-minus" onClick={minusClick}></i>
          <input
            type="text"
            value={number}
            onChange={setInputChange}
            className="contaiber_listadd_right-option-bt"
          />
          <i className="bx bx-plus" onClick={plusClick}></i>
        </div>
        <img src={Icon.Ic_delete} onClick={deleteProduct} className="contaiber_listadd_right-ic"></img>
      </div>
    </div>
  );
};
export default Listaddproduct;
