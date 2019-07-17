import React from 'react';

import './Card.css';

const Card = ({ children, hoverEffect = true }) => (
  <div className={hoverEffect ? 'card-widget hover-effect' : 'card-widget'}>
    {children}
  </div>
);

export default Card;
