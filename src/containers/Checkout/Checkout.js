import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    checkoutContinuedHandler = (props) => {
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelledHandler = (props) => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancel={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={this.props.match.url + '/contact-data'}
                component = {ContactData}
                />
            </div>

        );
    }
}

const mapStateToProps = state => {
    return{
        ings : state.ingredients
    }
}

export default connect(mapStateToProps)(withRouter(Checkout));