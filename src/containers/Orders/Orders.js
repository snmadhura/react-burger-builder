import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/witherrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                // console.log(res.data);
                const fetchedData = [];
                for (let key in res.data) {
                    fetchedData.push({
                        ...res.data[key],
                        id : key
                    }
                    );
                }
                this.setState({ loading: false , orders : fetchedData});
            })
            .catch(error => {
                this.setState({loading : false});
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order =>{
                   return <Order key={order.id} 
                   price={order.price}
                   ingredients={order.ingredients}/>;
                })}
                
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);