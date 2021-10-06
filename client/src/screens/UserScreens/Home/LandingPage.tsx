/* eslint-disable */
import React, { useEffect } from 'react';
import { imgBanner } from '../../../assets';
import CardContainer from '../../../components/cardcontent/CardContainer';
import Section from '../../../components/section/Section';
import SliderContainer from '../../../components/slider/SliderContainer';
import SupportCardContainer from '../../../components/supportcard/SupportCardContainer';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LayoutContainer from '../../../layout/HomeLayout/LayoutContainer';
import {
  actionLoadTop,
  getTopNewProduct,
  getTopPopularProduct,
  getTopSellProduct,
} from '../../../redux/reducers/home.reducer';

const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const topNewProduct = useAppSelector(getTopNewProduct);
  const topSellProduct = useAppSelector(getTopSellProduct);
  const topPopularProduct = useAppSelector(getTopPopularProduct);

  useEffect(() => {
    dispatch(actionLoadTop());
  }, [dispatch]);

  return (
    <LayoutContainer>
      <SliderContainer />
      <SupportCardContainer />
      <Section title="Top Sản Phẩm bán chạy trong tuần">
        <CardContainer content={topSellProduct} />
      </Section>

      <Section title="Sản Phẩm Mới">
        <CardContainer content={topNewProduct} />
      </Section>

      <img src={imgBanner.bannerImg} alt="Banner" className="container__img" />

      <Section title="Phổ biến">
        <CardContainer content={topPopularProduct} />
      </Section>
    </LayoutContainer>
  );
};

export default LandingPage;
