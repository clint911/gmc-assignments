import React from 'react';
import { Image as BootstrapImage } from 'react-bootstrap';

const Image = ({ src, alt }) => {
  return (
    <BootstrapImage 
      src={src} 
      alt={alt}
      fluid 
      className="product-image"
    />
  );
};

export default Image;
