import React from 'react'
import Footer from './Footer';
import Header from './Header';

const LayoutContainer: React.FC = (props) => {
  return (
    <div className="container">
      <Header />
        {props.children}
      <Footer/>
    </div>
  )
}

export default LayoutContainer;
