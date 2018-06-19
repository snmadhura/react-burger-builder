import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchasable(ingredients)  {
        //console.log(ingredients);
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        })
        .reduce((sum, el) =>{
        //    console.log(sum+el);
            return sum+el;
        }, 0);
        this.setState({purchasable : sum > 0}); 
        //console.log(this.state.purchasable);
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        //console.log(oldCount);
        const updatedCount = oldCount + 1;
        //console.log(updatedCount);
        //console.log(this.state.ingredients);
        const updatedIngredients = {
            ...this.state.ingredients
        }
        //console.log(updatedIngredients);
        //console.log(updatedIngredients[type]);
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        //console.log(priceAddition);
        const oldPrice = this.state.totalPrice;
        //console.log(oldPrice);
        const newPrice = oldPrice + priceAddition;
        //console.log(newPrice);
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchasable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePurchasable(updatedIngredients);
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        alert("Go, order something");
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    cancelPurchase={this.purchaseCancelHandler}
                    continuePurchase={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;