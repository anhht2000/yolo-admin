import React from "react";
interface PropContent {
  img?: string;
  name?: string;
  categori?: string;
  unit_price?: string;
  quantity?: number;
  money?: string;
}

const ContentInput: React.FC<PropContent> = (props) => {
  const { img, name, categori, unit_price, quantity, money } = props;
  const fakeData = [
    {
      content: name,
    },
    {
      content: categori,
    },
    {
      content: unit_price,
    },
    {
      content: quantity,
    },
    {
      content: money,
    },
  ];
  return (
    <div className="container_content">
      <div className="container_content_colum">
        <div>
          <img src={img}></img>
        </div>
        {fakeData.map((e, index) => (
          <div key={index} className="container_content_colum-product">
            <div>{e.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentInput;
