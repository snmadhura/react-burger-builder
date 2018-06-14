import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 2,
            bacon: 1,
            cheese: 3,
            meat: 0
        }
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div>Burger Control</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;