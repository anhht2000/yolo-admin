import { useEffect } from 'react';
import React from 'react';
import CardContainer from '../../../components/cardcontent/CardContainer';
import ProductFilter from '../../../components/productfilter/ProductFilter';
import LayoutContainer from '../../../layout/HomeLayout/LayoutContainer';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  filterChange,
  filterClear,
  getAllFiltter,
  getAllProduct,
} from '../../../redux/reducers/product.reducer';
import Pagination from '../../../components/pagination/Pagination';

const ProductPage: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const filter = useAppSelector((state) => state.product.filter);
  const helper = useAppSelector((state) => state.product.helper);
  const totalPage = useAppSelector((state) => state.product.totalPage);
  const currentPage = useAppSelector((state) => state.product.currentPage);
  const filterLoading = useAppSelector((state) => state.product.loadingFilter);
  const productloading = useAppSelector((state) => state.product.loadingProduct);
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const newFilter = {
      ...filter,
      [value]: filter[value].map((e) => (e.content === name ? { content: e.content, use: !e.use } : e)),
    };
    dispatch(filterChange({ value, name, filter: newFilter, helper }));
  };

  const onDelete = () => {
    dispatch(filterClear());
  };

  useEffect(() => {
    dispatch(getAllFiltter());
    dispatch(getAllProduct(currentPage));
  }, [currentPage, dispatch]);

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
          {productloading ? 'loadingProduct' : <CardContainer content={products} layout_3={true} />}
          {products.length > 1 && <Pagination totalPage={totalPage} currentPage={currentPage} />}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ProductPage;
