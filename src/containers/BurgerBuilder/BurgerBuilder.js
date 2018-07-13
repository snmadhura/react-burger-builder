import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/witherrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error : false
    };

    componentDidMount() {
        axios.get('https://react-my-burger-e4269.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error : true});
            })
    }

    updatePurchasable(ingredients) {
        //console.log(ingredients);
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
            .reduce((sum, el) => {
                //    console.log(sum+el);
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
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

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        console.log(this.props);

        const queryParam = [];
        //console.log(this.props.ingredients);
        for(let i in this.state.ingredients){            
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
            //console.log(i);
        }
        //console.log(queryParam);
       queryParam.push('price=' + this.state.totalPrice);
        const queryString  = queryParam.join('&');
         this.props.history.push({
             pathname : '/checkout',
             search : '?' + queryString
         });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let ordersummary = null;
        let burger = this.state.error ? <p>Can't load Ingredients</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
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
            ordersummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                cancelPurchase={this.purchaseCancelHandler}
                continuePurchase={this.purchaseContinueHandler} />;
            if (this.state.loading) {
                ordersummary = <Spinner />;
            }
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);