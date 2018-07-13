import React from 'react';
import classes from './Order.css';

const Order = (props) =>{
return(
  <div className={classes.Order}>
      <p>Ingredient : whatever you like</p>
      <p>Price : <strong>{props.price}</strong></p>
  </div>  
);
}

export default Order;