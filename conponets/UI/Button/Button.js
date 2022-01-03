import React from 'react';
import classes from "./Button.module.css";
import {BsCartCheck} from "react-icons/bs";

const Button = (props) => {
        
    const clsName = `${classes.button }` + "  " + `${props.className }`; 

    return (
        
        <button className={clsName} onClick={props.onClick} disabled={props.disabled ? props.disabled : null} >
            {props.icon && <BsCartCheck className={classes.cartIcon} />}
            {props.title}
        </button>
        
    )
}

export default Button;