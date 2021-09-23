import React from 'react'
import { IProducts } from '../../data/products'
import CardContent from './CardContent'

interface ICardContainerProps {
  content?: IProducts[],
  layout_3?: boolean
}

const CardContainer: React.FC<ICardContainerProps> = (props) => {
  const data = props.content as IProducts[];
  return (
    <div className="card__container">
      { 
        data && data.map((e,index)=>(
          <CardContent
            key={index}
            title={e.title}
            price={e.price}
            img={e.image01}
            layout_3={props.layout_3}
          />
        ))
      }
    </div>
  )
}

export default CardContainer;
