import React, { Fragment } from 'react';
import Button from '../Button/Button';
import classes from "./FormsInput.module.css";

function FormsInput(props) {

    const { items, onSubmit, btn } = props;

    const inputControl = items.map((item, idx) => {

        const { label, id, type, onChange, value, onBlur, error, placeholder, errorMessage } = item;

        const errorInputClasses = error ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
        
        return (
            
            <Fragment key={idx}>
                <div className={errorInputClasses} key={idx}>
                    {label && <label htmlFor={id}>{label}</label>}
            
                    <input type={type} id={id} onChange={onChange} value={value} onBlur={onBlur} placeholder={placeholder} />
                    {error && <p className={classes.errorBorder}>{errorMessage}</p>}
                </div>
            </Fragment>
        );
    });

    const disableBtnClass = !btn.valid ? `${classes.disableBtn}` : `${classes.ableBtn}`;

    return (
        <form className={classes.form} onSubmit={onSubmit} >
            {inputControl}
            <Button className={disableBtnClass}  title={btn.title} disabled={!btn.valid} />
            {props.children}
        </form>
    );
}

export default FormsInput;


