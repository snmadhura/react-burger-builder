import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},  
    {label: 'Bacan', type: 'bacon'},
    {label: 'Meat', type: 'meat'}
    
];

const buildControls = (Props) => (
    <div className={classes.BuildControls}>
    {controls.map(ctrl=>(
        <BuildControl label={ctrl.label} key={ctrl.label} />
    ))}
        
    </div>
)

export default buildControls;