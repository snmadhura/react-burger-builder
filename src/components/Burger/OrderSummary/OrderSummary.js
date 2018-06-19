import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log("Order summary data updated");
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return <li key={igKey}><span style={{textTransform: 'Capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });
        return(
            <Aux>
            <h4>Your Order</h4>
            <p>Burger Ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
        </Aux>
        );
    }
}

export default OrderSummary;