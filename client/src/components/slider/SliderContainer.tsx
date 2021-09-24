import React from 'react'
import { useState } from 'react'
import { heroSliderData } from '../../data/sliderdata'
import SliderItem from './SliderItem'

const SliderContainer = () => {
  const [slider,setSlider] = useState(0);
  const [change,setChange] = useState(false)
  const sliderData = heroSliderData;

  const toggleChange = () => setChange(!change);

  const toggleNext = () => {
    if(slider + 1 > sliderData.length - 1) setSlider(0);
    else setSlider(slider+1);
    setChange(true);
    setTimeout(()=>{toggleChange()},1000)
  }

  const togglePre = () => {
    if(slider - 1 < 0) setSlider(sliderData.length - 1);
    else setSlider(slider-1);
    setChange(true);
    setTimeout(()=>{toggleChange()},1000)
  }

  return (
    <div className="slider__container">
      <SliderItem
        title={sliderData[slider].title} 
        description={sliderData[slider].description}
        color={sliderData[slider].color}
        path={sliderData[slider].path}
        img={sliderData[slider].img}
        add={change}
      />
      <div className="slider__container-change">
        <i className='bx bx-chevron-left' onClick={togglePre}></i>        
        <div className="slider__current">{`${slider + 1}/${sliderData.length}`}</div>
        <i className='bx bx-chevron-right' onClick={toggleNext} ></i>
      </div>
      <i className='bx bx-chevron-left slider-menu-icon-left' onClick={togglePre}></i>        
      <i className='bx bx-chevron-right slider-menu-icon-right' onClick={toggleNext} ></i>
    </div>
  )
}

export default SliderContainer;
