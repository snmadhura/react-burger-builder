import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price : 0
    }

    componentWillMount() {

        //console.log(this.props.match.path);
        const query = new URLSearchParams(this.props.location.search);
        //console.log(query);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1] 
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice : price });
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

                <Route path={this.props.match.url + '/contact-data'}
                    render={() => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>}
                />
            </div>

        );
    }
}

export default withRouter(Checkout);