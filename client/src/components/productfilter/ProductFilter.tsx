import { ChangeEvent } from 'react';
import React from 'react';
import { useState } from 'react';
import { FilterInterFace } from '../../data/FilterDataPage';

interface IProductFilter {
  helper?: string[];
  filter?: FilterInterFace;
  onChange?: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
  loading?: boolean;
}

const ProductFilter: React.FC<IProductFilter> = (props) => {
  const { filter, helper, onChange, onDelete, loading } = props;
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);
  return (
    <>
      {loading ? 'loading' : ''}
      <i className="bx bx-filter product-filter-mb" onClick={toggleActive}></i>
      <div className={`product-filter ${active ? '' : 'hidden'}`}>
        {helper &&
          helper.map((element, index) => {
            return (
              <div className="product-filter__header" key={index}>
                {capitalizeFirstLetter(element)}
                <div className="product-filter__content">
                  {filter &&
                    filter[element].map((e, index) => (
                      <div className="product-filter__content-child" key={index}>
                        <input
                          type="checkbox"
                          name={e.content}
                          value={element}
                          checked={e.use as boolean}
                          onChange={onChange}
                        />{' '}
                        &nbsp; {capitalizeFirstLetter(e.content)}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        {helper && helper.length > 0 && (
          <div className="product-filter-button" onClick={onDelete}>
            Xoá tất cả
          </div>
        )}
      </div>
    </>
  );
};

export default ProductFilter;
