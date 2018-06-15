import React from 'react';
import logoImage from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => {
    return(
        <div className={classes.BurgerLogo}>
            <img src={logoImage} />
        </div>
    );
}

export default logo;