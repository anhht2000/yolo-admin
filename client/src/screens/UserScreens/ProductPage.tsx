import { useEffect } from "react";
import React from "react";
import CardContainer from "../../components/cardcontent/CardContainer";
import ProductFilter from "../../components/productfilter/ProductFilter";
import { FilterInterFace, MockFilterData } from "../../data/FilterDataPage";
import LayoutContainer from "../../layout/HomeLayout/LayoutContainer";
import { useState } from 'react'
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getAllProduct } from "../../redux/reducers/product.reducer";

const ProductPage: React.FC = (props) => {
  const [filterData, setFilterData] = useState<FilterInterFace>({});
  const [tempData, setTimeData] = useState<FilterInterFace>({});
  const [helper, setHelper] = useState<string[]>([]);
  const dispatch = useAppDispatch()
  const products = useAppSelector((state)=> state.product.products);
  const onChange = ({ target } : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFilterData(
      {
        ...filterData, [value] : filterData[value].map(
          e => e.content === name ? { content: e.content, use: !e.use } : e
        )
      }
    );
  }

  const onDelete = () => {
    setFilterData(tempData);
  }

  useEffect (() => {
    GetDataFilter()
    dispatch(getAllProduct());
  },[dispatch])

  const GetDataFilter = async () => {
    const data = await MockFilterData();
    setFilterData(data.filter);
    setTimeData(data.filter);
    setHelper(data.filter_helper);
  }

  return (
    <LayoutContainer>
      <div className="wapper">
        <ProductFilter
          filter={filterData}
          helper={helper}
          onChange={onChange}
          onDelete={onDelete}
        />
        <div className="product-content">
          <CardContainer content={products} layout_3={true} />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ProductPage;
