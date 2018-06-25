import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/Auxilliary';
import axios from '../../axios-orders';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component{
        state = {
            error : null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
            })
            axios.interceptors.response.use(null, error => {
                this.setState({ error: error });
            })
        }

        errorConfirmHandler = () =>{
            this.setState({error:null});
        }
        render() {
            return (
                <Aux>
                    <Modal 
                    show={this.state.error}
                    clicked={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }

}

export default withErrorHandler;