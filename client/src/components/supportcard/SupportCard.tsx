import React from 'react'

interface ISupportCardProps {
  icon?: string,
  title?:string,
  description?:string,
}

const SupportCard:React.FC<ISupportCardProps> = (props) => {
  const { title, description, icon } = props;
  return (
    <div className="support__card-item">
      <i className={`${icon} support__card-item-icon`}></i>
      <div className="support__card-item-info">
        <div className="support__card-item-info-title">{title}</div>
        <div className="support__card-item-info-description">{description}</div>
      </div>
    </div>
  )
}

export default SupportCard;
