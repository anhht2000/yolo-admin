import React, { useState } from "react";
import LayoutContainer from "../../../layout/HomeLayout/LayoutContainer";
import InputInforUser from "../../../components/InputInforuser/InputInforUser";
import ContentInput from "../../../components/InputInforuser/ContentInput";
const ListPayProduct = () => {
  const data_list = JSON.parse(
    localStorage.getItem("cartProduct") as string
  ) as {
    title: string;
    image01: string;
    variant: string[];
    variant_value: string[];
    price: string;
    number: number;
  }[];
  const [data, setData] = useState(data_list);
  const fakeData = [
    {
      lable: "",
    },
    {
      lable: "Loại",
    },
    {
      lable: "Đơn giá",
    },
    {
      lable: "Số lượng",
    },
    {
      lable: "Thành tiền",
    },
  ];
  return (
    <LayoutContainer>
      <InputInforUser></InputInforUser>
      <div className="container_content_product">
        <label className="container_content_product_lable">Sản phẩm</label>
        <div className="container_content_product_colum">
          {fakeData.map((e, index) => (
            <div key={index} className="container_content_product_colum-title">
              <div>{e.lable}</div>
            </div>
          ))}
        </div>
        {data.map((e, index) => (
          <ContentInput
            img={e.image01}
            name={e.title}
            unit_price={e.price}
            quantity={e.number}
          ></ContentInput>
        ))}
      </div>
    </LayoutContainer>
  );
};

export default ListPayProduct;
