import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { IProducts, products } from "../../../data/products";
import ProductDetail from "../../../components/productdetail/ProductDetail";
import Section from "../../../components/section/Section";
import CardContainer from "../../../components/cardcontent/CardContainer";
import LayoutContainer from "../../../layout/HomeLayout/LayoutContainer";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getProduct } from "../../../redux/reducers/productDetail.reducer";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dataSection = Object.assign([], products.slice(7, 15)) as IProducts[];
  const dispatch = useAppDispatch()
  const data = useAppSelector((state)=> state.productDetails.product)
  const [overlay, setOverlay] = useState(false);
  const toggleOverlay = () => setOverlay(!overlay);
  useEffect(() => {
    dispatch(getProduct(id))
  }, [id, dispatch]);
  return (
    <>
      <div className={`${overlay ? "overlay" : ""}`}></div>
      <LayoutContainer>
        <ProductDetail source={data} toggleOverLay={toggleOverlay} />
        <Section title="Khám Phá Thêm">
          {/* <CardContainer content={dataSection} /> */}
        </Section>
      </LayoutContainer>
    </>
  );
};

export default ProductDetailsPage;
