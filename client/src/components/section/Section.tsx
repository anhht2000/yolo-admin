import React from 'react'

interface ISectionProps {
  title?: string,
}

const Section: React.FC<ISectionProps> = (props) => {
  const { title, children } = props;
  return (
    <div className="section">
      <div className="section__title">{title}</div>
      <div className="section__content">
        {children}
      </div>
    </div>
  )
}

export default Section;
