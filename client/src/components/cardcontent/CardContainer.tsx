import React from 'react';
import { IProducts, IProductsApi } from '../../data/products';
import CardContent from './CardContent';

interface ICardContainerProps {
  content?: any[];
  layout_3?: boolean;
}

const CardContainer: React.FC<ICardContainerProps> = (props) => {
  const data = props.content as any[];

  return (
    <div className="card__container">
      {data &&
        data.map((e, index) => (
          <CardContent
            key={index}
            id={e.id}
            title={e.name}
            price={e.price}
            img={process.env.REACT_APP_API_URL + e?.productImg[0]?.imgPath}
            layout_3={props.layout_3}
          />
        ))}
    </div>
  );
};

export default CardContainer;
