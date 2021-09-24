import React from "react";
import CardContainer from "../../components/cardcontent/CardContainer";
import ProductFilter from "../../components/productfilter/ProductFilter";
import { products } from "../../data/products";
import LayoutContainer from "../../layout/HomeLayout/LayoutContainer";

const ProductPage: React.FC = (props) => {
  const filter = [
    {
      content: "Danh Mục Sản Phẩm",
      filter: ["Áo thun", "Áo somi", "Quần jean"],
    },
    {
      content: "Màu Sắc",
      filter: ["Trắng", "Hồng", "Đen", "Vàng", "Cam", "Xanh dương"],
    },
    { content: "Kích Cỡ",
      filter: ["S", "M", "L", "XL", "XXL"]
    },
  ];
  return (
    <LayoutContainer>
      <div className="wapper">
        <ProductFilter filter={filter} />
        <div className="product-content">
          <CardContainer content={products} layout_3={true} />
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ProductPage;
