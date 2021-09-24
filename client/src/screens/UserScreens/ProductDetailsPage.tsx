import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { IProducts, products } from "../../data/products";
import ProductDetail from "../../components/productdetail/ProductDetail";
import Section from "../../components/section/Section";
import CardContainer from "../../components/cardcontent/CardContainer";
import LayoutContainer from "../../layout/HomeLayout/LayoutContainer";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dataSection = Object.assign([], products.slice(7, 15)) as IProducts[];
  const [data, setdata] = useState<IProducts>({} as IProducts);
  const [overlay, setOverlay] = useState(false);
  const toggleOverlay = () => setOverlay(!overlay);
  useEffect(() => {
    setdata(products.find((e) => e.title === id) as IProducts);
  }, [id]);

  return (
    <>
      <div className={`${overlay ? "overlay" : ""}`}></div>
      <LayoutContainer>
        <ProductDetail source={products[1]} toggleOverLay={toggleOverlay} />
        <Section title="Khám Phá Thêm">
          <CardContainer content={dataSection} />
        </Section>
      </LayoutContainer>
    </>
  );
};

export default ProductDetailsPage;
