import React, { ChangeEvent } from 'react'
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IProducts } from '../../data/products';
import { FormatMoney } from '../../lib/FunctHelper';

interface IProductDetailProps {
  source: IProducts;
  toggleOverLay: () => void;
}

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  const { source,toggleOverLay } = props;
  //data for send
  const [imgCore,setImgCore] = useState<string>('');
  const [color,setColor] = useState<string>('');
  const [size,setSize] = useState<string>('');
  const [number, setNumber] = useState<number>(1);

  //static data
  const [active,setActive] = useState(false);
  const [seller,setSeller] = useState(false);
  const toggleActive = () => {setSeller(!seller); toggleOverLay();};
  const setInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    if(isNaN(parseInt(e.target.value)) || parseInt(e.target.value) < 1) {
      setNumber(1);
    } else {
      setNumber(parseInt(e.target.value));
    }
  }
  const plusClick = () => {
    setNumber(number + 1);
  }

  const minusClick = () => {
    if(number - 1 < 1) return;
    setNumber(number-1);
  }
  const saveToLocal = () => {
    const data = JSON.parse(localStorage.getItem('cartProduct') as string) as {
      title: string,
      variant:string[],
      variant_value:string[],
      price: string,
      number: number
    }[];

    if(data) {
      let flag = false;

      let temp = data.map((e) => {
        if (
          JSON.stringify({title: e.title, variant: e.variant, variant_value: e.variant_value}) ===
          JSON.stringify({title: source.title, variant: ['color','size'], variant_value: [color,size]})
        ){
          flag = true;
          return { ...e, number: e.number + number };
        }
        return e;
      })

      if (flag) {
        localStorage.setItem('cartProduct',JSON.stringify([...temp]))
      } else {
        localStorage.setItem('cartProduct',JSON.stringify([
          ...data, {
            title: source.title,
            variant: ['color', 'size'],
            variant_value: [color, size],
            price: source.price,
            number: number
          }
        ]))
      }
    }else {
      localStorage.setItem('cartProduct',JSON.stringify([
        {
          title: source.title,
          variant: ['color', 'size'],
          variant_value: [color, size],
          price: source.price,
          number: number
        }
      ]))
    }
    toggleActive();
  }
  useLayoutEffect(()=> {
    window.scrollTo(0,0);
  },[props.source])

  useEffect(()=>{
    setImgCore(props.source.image01);
    props.source.colors && setColor(props.source.colors[0]);
    props.source.size && setSize(props.source.size[0]);
  },[props.source])

  return (
    <div className="product-detail">
      <div className="product-detail__list">
        <img src={source.image01} alt="img-list1" onClick={()=>{setImgCore(source.image01)}}/>
        <img src={source.image02} alt="img-list2" onClick={()=>{setImgCore(source.image02)}}/>
      </div>
      <div className="product-detail__core-img">
        <img src={imgCore} alt="coreimg" />
      </div>
      <div className={`product-detail__price-option ${seller? 'active' : ''}`}>
        <i className="bx bx-x product-detail__price-option--mb-icon" onClick={toggleActive}></i>
        <div className="product-detail__price-option--title">{source.title}</div>
        <div className="product-detail__price-option--price">{source.price && FormatMoney(source.price)}</div>
        <div className="price-option__title">Màu sắc</div>
        <div className="product-detail__price-option--circle">
          {
            source.colors && source.colors.map((e) => {
              return (
                <div className={`circle ${color===e? 'active' : '' }`} onClick={()=>{setColor(e)}} key={e}>
                  <div className="circle-content" style={{backgroundColor:e}}></div>
                </div>
              )
            })
          }
        </div>
        <div className="price-option__title">Kíck cỡ</div>
        <div className="product-detail__price-option--circle">
          {
            source.size && source.size.map((e)=>{
              return (
                <div className={`circle ${size === e? 'active' : '' }`} onClick={()=>{setSize(e)}} key={e}>
                  <div className="circle-content">{e}</div>
                </div>
              )
            })
          }
        </div>
        <div className="price-option__title">Số Lượng</div>
        <div className="product-detail__price-option--number">
          <i className='bx bx-minus' onClick={minusClick}></i>
            <input type="text" value={number} onChange={setInputChange}/>
          <i className='bx bx-plus' onClick={plusClick}></i>
        </div>
        <div className="product-detail__price-option--button">
          <div className="product-detail--btn" onClick={saveToLocal}>Thêm vào giỏ</div>
          <div className="product-detail--btn">Mua ngay</div>
        </div>
      </div>
      <div className="product-detail__helper-mb">
        <div className="product-detail--btn" onClick={toggleActive}>Mua ngay</div>
      </div>
      <div className="product-detail__description">
        <div className="product-detail__description--header">Chi tiết sản phẩm</div>
        <div className={`product-detail__description--content ${active? '' : 'active' }`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore arch
          itecto eveniet laborum vel atque praesentium quo sequi. Repudiandae, pariatur nisi
          consequatur rerum maxime quas laudantium repellendus, nam, id aliquid illum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore arch
          itecto eveniet laborum vel atque praesentium quo sequi. Repudiandae, pariatur nisi
          consequatur rerum maxime quas laudantium repellendus, nam, id aliquid illum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore arch
          itecto eveniet laborum vel atque praesentium quo sequi. Repudiandae, pariatur nisi
          consequatur rerum maxime quas laudantium repellendus, nam, id aliquid illum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore arch
          itecto eveniet laborum vel atque praesentium quo sequi. Repudiandae, pariatur nisi
          consequatur rerum maxime quas laudantium repellendus, nam, id aliquid illum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore arch
          itecto eveniet laborum vel atque praesentium quo sequi. Repudiandae, pariatur nisi
          consequatur rerum maxime quas laudantium repellendus, nam, id aliquid illum.
        </div>
        <div className="product-detail__btn-wapper">
          <div className="product-detail--btn" onClick={()=>{setActive(!active)}}>{active ? 'Thu gọn':'Mở rộng'}</div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail;
