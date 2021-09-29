/* eslint-disable jsx-a11y/alt-text */
import React, { ChangeEvent, useEffect, useState } from "react";
import { Icon } from "../../assets/index";
import { FormatMoney } from "../../lib/FunctHelper";
interface PropListAdd {
  image01?: string;
  title?: string;
  variant_value?: Array<string> | any;
  price?: string;
  count?: number;
  deleteProduct?: any;
  countmoney?: any;
  setPriceUpdate: (price: number) => void;
  setSubtractPrice: (price: number) => void;
}
const Listaddproduct: React.FC<PropListAdd> = (props) => {
  const {
    image01,
    title,
    variant_value,
    price,
    count,
    deleteProduct,
    setPriceUpdate,
    setSubtractPrice,
  } = props;
  const Variant_value: string[] = variant_value;
  const data = JSON.parse(localStorage.getItem("cartProduct") as string) as {
    title: string;
    image01: string;
    variant: string[];
    variant_value: string[];
    price: string;
    number: number;
  }[];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [number, setNumber] = useState<number>(count as number);
  const [money, setMoney] = useState(0);
  const setInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 1) {
      setNumber(1);
    } else {
      setNumber(parseInt(e.target.value));
    }
  };
  // const deleteProduct = () => {
  //   const datadelete = data.filter((item) => {
  //     return item.title !== title;
  //   });
  //   localStorage.setItem("cartProduct", JSON.stringify(datadelete));
  //   // window.location.reload();
  // };

  const saveToLocal = () => {
    if (data) {
      let flag = false;

      let temp = data.map((e) => {
        if (
          e.title === title &&
          e.variant_value[0] === Variant_value[0] &&
          e.variant_value[1] === Variant_value[1]
        ) {
          flag = true;
          return { ...e, number: number };
        }
        return e;
      });

      if (flag) {
        localStorage.setItem("cartProduct", JSON.stringify([...temp]));
      }
    }
  };

  const plusClick = () => {
    setNumber(number + 1);
    setPriceUpdate(parseInt(price as string));
  };
  const minusClick = () => {
    if (number - 1 < 1) return;
    setNumber(number - 1);
    setSubtractPrice(parseInt(price as string));
  };
  useEffect(() => {
    saveToLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);
  return (
    <div className="contaiber_listadd">
      <div className="contaiber_listadd_left">
        <img
          src={image01}
          alt="img-list1"
          className="contaiber_listadd_left-img"
        ></img>
        <label className="contaiber_listadd_left-title">
          {title}-{variant_value[0]}-{variant_value[1]}
        </label>
      </div>
      <div className="contaiber_listadd_right">
        <label className="contaiber_listadd_right-title">
          {FormatMoney(price as string)}
        </label>
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
        <img
          src={Icon.Ic_delete}
          onClick={deleteProduct}
          className="contaiber_listadd_right-ic"
        ></img>
      </div>
    </div>
  );
};
export default Listaddproduct;
