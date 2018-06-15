import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey =>{
        return <li key={igKey}><span style={{textTransform: 'Capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
return(
    <Aux>
        <h4>Your Order</h4>
        <p>Burger Ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
        <Button btnType="Danger" clicked={props.cancelPurchase}>CANCEL</Button>
        <Button btnType="Success" clicked={props.continuePurchase}>CONTINUE</Button>
    </Aux>
);
};

export default orderSummary;