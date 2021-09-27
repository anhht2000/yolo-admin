import { useEffect } from "react";
import React from "react";
import CardContainer from "../../components/cardcontent/CardContainer";
import ProductFilter from "../../components/productfilter/ProductFilter";
import { FilterInterFace, MockFilterData } from "../../data/FilterDataPage";
import LayoutContainer from "../../layout/HomeLayout/LayoutContainer";
import { useState } from 'react'
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { filterChange, filterClear, getAllFiltter, getAllProduct } from "../../redux/reducers/product.reducer";

const ProductPage: React.FC = (props) => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state)=> state.product.products);
  const filter = useAppSelector((state)=> state.product.filter);
  const helper = useAppSelector((state)=> state.product.helper)
  const filterLoading = useAppSelector((state)=> state.product.loadingFilter);
  const productloading = useAppSelector((state)=> state.product.loadingProduct);
  const onChange = ({ target } : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    dispatch(filterChange({value, name}));
  }

  const onDelete = () => { dispatch(filterClear()) }

  useEffect (() => {
    dispatch(getAllFiltter())
    dispatch(getAllProduct());
  },[dispatch])

  return (
    <LayoutContainer>
      <div className="wapper">
        <ProductFilter
          filter={filter}
          helper={helper}
          onChange={onChange}
          onDelete={onDelete}
          loading={filterLoading}
        />
        <div className="product-content">
          {
            productloading ? 'loadingProduct' : (
              <CardContainer
              content={products}
              layout_3={true}
              />
            )
          }
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ProductPage;
