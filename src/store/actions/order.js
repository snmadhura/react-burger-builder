import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}


export const purchaseBurgerFail = (error) =>{
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
const purchaseBurgerStart = () =>{
    return actionTypes.PURCHASE_BURGER_START;
}

export const purchaseBurger = (orderData) =>{
    dispatch(purchaseBurgerStart())
    return dispatch =>(
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseBurgerSuccess(response.data, orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    )
}