import React from 'react';

const Price = ({ price }) => {
  return (
    <div className="product-price">
      ${price.toFixed(2)}
    </div>
  );
};

export default Price;
