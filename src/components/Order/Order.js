import React from 'react';
import classes from './Order.css';

const Order = (props) =>{
  console.log(props);
return(
  <div className={classes.Order}>
      <p>Ingredient :: Bacon : <strong>{props.ingredients.bacon}</strong> | 
      Meat : <strong>{props.ingredients.meat}</strong> | 
      Salad : <strong>{props.ingredients.salad}</strong> | 
      Cheese : <strong>{props.ingredients.cheese}</strong></p>
      <p>Price : <strong>{props.price}</strong></p>
  </div>  
);
}

export default Order;