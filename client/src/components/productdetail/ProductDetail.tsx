import React, { ChangeEvent } from "react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FormatMoney } from "../../lib/FunctHelper";

interface IProductDetailProps {
  source: any;
  toggleOverLay: () => void;
}

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const { source, toggleOverLay } = props;
  //data for send
  const [imgCore, setImgCore] = useState<string>("");
  const [optionVal, setOptionVal] = useState<{[a: string]: string}>({});
  const [number, setNumber] = useState<number>(1);

  //static data
  const [active, setActive] = useState(false);
  const [seller, setSeller] = useState(false);
  const toggleActive = () => {
    setSeller(!seller);
    toggleOverLay();
  };
  const setInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 1) {
      setNumber(1);
    } else {
      setNumber(parseInt(e.target.value));
    }
  };
  const plusClick = () => {
    setNumber(number + 1);
  };

  const minusClick = () => {
    if (number - 1 < 1) return;
    setNumber(number - 1);
  };
  const saveToLocal = () => {
    toggleActive();
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [props.source]);

  useEffect(() => {
    props.source.productImg && setImgCore(props.source.productImg[0].imgPath);
    props.source.option && props.source.option.forEach((item: any)=>{
      setOptionVal((pre) => {
        return {...pre, [item.name]: item.OptionVal[0].name}
      })
    })
  }, [props.source]);

  return (
    <div className="product-detail">
      <div className="product-detail__list">
        {source.productImg && source.productImg.map((item: any, index: number)=> (
          <img
            src={`${process.env.REACT_APP_API_URL}${item.imgPath}`}
            alt={`img_${index}`}
            onClick={()=>{setImgCore(item.imgPath)}}
            key={index}
          />
        ))}
      </div>
      <div className="product-detail__core-img">
        <img src={`${process.env.REACT_APP_API_URL}${imgCore}`} alt="coreimg" />
      </div>
      <div className={`product-detail__price-option ${seller ? "active" : ""}`}>
        <i
          className="bx bx-x product-detail__price-option--mb-icon"
          onClick={toggleActive}
        ></i>
        <div className="product-detail__price-option--title">
          {source.name}
        </div>
        <div className="product-detail__price-option--price">
          {source.price && FormatMoney(source.price)}
        </div>
        {source.option?.map((item:any, index: string) => (
          <div key={index}>
            <div className="price-option__title">{item.name}</div>
            {
              item.meta === 'text' && (
                <div className="product-detail__price-option--circle">
                  {item.OptionVal.map((temp: any,key: string)=> (
                    <div
                      className={`circle ${optionVal[`${item.name}`] === temp.name ? "active" : ""}`}
                      onClick={()=> {setOptionVal({...optionVal, [item.name]: temp.name})}}
                      key={key}
                    >
                    <div className="circle-content">{temp.name}</div>
                  </div>
                  ))}
                </div>
              )
            }
            {
              item.meta === 'color' && (
                <div className="product-detail__price-option--circle">
                  {item.OptionVal.map((temp: any,key: string)=> (
                    <div
                    className={`circle ${optionVal[`${item.name}`] === temp.name ? "active" : ""}`}
                    onClick={()=> {setOptionVal({...optionVal,[item.name]: temp.name})}}
                    key={key}
                  >
                    <div
                      className="circle-content"
                      style={{ backgroundColor: temp.name }}
                    ></div>
                  </div>
                  ))}
                </div>
              )
            }
          </div>
        ))}
        <div className="price-option__title">Số Lượng</div>
        <div className="product-detail__price-option--number">
          <i className="bx bx-minus" onClick={minusClick}></i>
          <input type="text" value={number} onChange={setInputChange} />
          <i className="bx bx-plus" onClick={plusClick}></i>
        </div>
        <div className="product-detail__price-option--button">
          <div className="product-detail--btn" onClick={saveToLocal}>
            Thêm vào giỏ
          </div>
          <div className="product-detail--btn">Mua ngay</div>
        </div>
      </div>
      <div className="product-detail__helper-mb">
        <div className="product-detail--btn" onClick={toggleActive}>
          Mua ngay
        </div>
      </div>
      <div className="product-detail__description">
        <div className="product-detail__description--header">
          Chi tiết sản phẩm
        </div>
        <div
          className={`product-detail__description--content ${
            active ? "" : "active"
          }`}
        >
          {source.description}
        </div>
        <div className="product-detail__btn-wapper">
          <div
            className="product-detail--btn"
            onClick={() => {
              setActive(!active);
            }}
          >
            {active ? "Thu gọn" : "Mở rộng"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
