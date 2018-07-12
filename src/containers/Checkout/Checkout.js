import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    componentDidMount() {

        //console.log(this.props.match.path);
        const query = new URLSearchParams(this.props.location.search);
        //console.log(query);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }
       this.setState({ ingredients: ingredients })
    }

    checkoutContinuedHandler = (props) => {        
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelledHandler = (props) => {        
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />  
                    
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>               
            </div>
            
        );
    }
}

export default Checkout;