import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal: ''
        }
    }
    render() {
        return (
            <div className={classes.ContactData}>
                <h2>Your Details</h2>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street Name" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;