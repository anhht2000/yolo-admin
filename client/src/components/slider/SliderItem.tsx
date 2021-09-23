import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ISliderProps {
  title?: string,
  description?:string,
  path?: string,
  img?: string,
  color?: string,
  add?: boolean
}

const SliderItem:React.FC<ISliderProps> = (props) => {
  const [change,stateChange] = useState(false);
  const {title,color,description,img,path} = props;
  useEffect(()=>{
    stateChange(true);
    setTimeout(stateChange,400);
  },[props])
  return (
    <div className={`slider`}>
      <div className={`slider__info ${ change ?'fade_in':''}`}>
        <div className="slider__info-title" style={{color:color}}>{title}</div>
        <div className="slider__info-description">{description}</div>
        <Link 
          to={path as string || '/'} 
          className="slider-btn" 
          style={{backgroundColor:color}}
        >
          Xem chi tiết
        </Link>
      </div>
      <div className={`slider__img ${ change ?'fade_in':''}`}>
        <img src={img} alt="Slider Img"/>
        <div className="slider__img-bg" style={{backgroundColor:color}}></div>
      </div>
      <Link 
          to={path as string || '/'} 
          className="slider-btn slider__btn-menu" 
          style={{backgroundColor:color}}
        >
          Xem chi tiết
        </Link>
    </div>
  )
}

export default SliderItem;
