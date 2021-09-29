/* eslint-disable */
import React from "react";
import { imgBanner } from "../../../assets";
import CardContainer from "../../../components/cardcontent/CardContainer";
import Section from "../../../components/section/Section";
import SliderContainer from "../../../components/slider/SliderContainer";
import SupportCardContainer from "../../../components/supportcard/SupportCardContainer";
import { products } from "../../../data/products";
import LayoutContainer from "../../../layout/HomeLayout/LayoutContainer";

const LandingPage: React.FC = () => {
  const dataSection1 = Object.assign([], products.slice(12, 16));
  const dataSection2 = Object.assign([], products.slice(6, 14));
  const dataSection3 = Object.assign([], products.slice(2, 14));
  return (
    <LayoutContainer>
      <SliderContainer />
      <SupportCardContainer />
      <Section title="Top Sản Phẩm bán chạy trong tuần">
        <CardContainer content={dataSection1} />
      </Section>

      <Section title="Sản Phẩm Mới">
        <CardContainer content={dataSection2} />
      </Section>

      <img src={imgBanner.bannerImg} alt="Banner" className="container__img" />

      <Section title="Phổ biến">
        <CardContainer content={dataSection3} />
      </Section>
    </LayoutContainer>
  );
};

export default LandingPage;
