import React from 'react'
import { useState } from 'react';

interface IProductFilter {
  filter?: {content:string,filter:string[]}[]
}

const ProductFilter: React.FC<IProductFilter> = (props) => {
  const {filter} = props;
  const [active,setActive] = useState(false);
  const toggleActive = () => setActive(!active)
  return (
    <>
    <i className='bx bx-filter product-filter-mb' onClick={toggleActive}></i>
    <div className={`product-filter ${active ? '' : 'hidden' }`}>
      {
        filter && filter.map((element) => {
          return (
            <div className="product-filter__header" key={element.content}>
              {element.content}
              <div className="product-filter__content">
                {element.filter.map((e)=>(
                  <div className="product-filter__content-child" key={e}>
                    <input type="checkbox" name={e} /> &nbsp; {e}
                  </div>
                ))}
              </div>
            </div>
          );
        })
      }
      <div className="product-filter-button">
        Xoá tất cả
      </div>
    </div>
    </>
  )
}

export default ProductFilter;
