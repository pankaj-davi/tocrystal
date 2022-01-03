import React from 'react';
import useInput from '../../Hook/use-inputs';
import Link from "next/link";
import FormsInput from '../../UI/Forms/FormsInput';
import UserFormsContainer from '../../UI/Forms/UserFormsContainer';
import FormsNavigation from '../../UI/Forms/FormsNavigation';


function ForgotPasswordForm() {

    function validateEmail(elementValue){      
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue); 
    }

    const {
        value: forgotEmail,
        isValid: forgotEmailIsValid,
        hasError: forgotEmailHasError,
        valueChangeHandler: forgotEmailHandler,
        inputBlurHander: forgotEmailBlurHandler,

    } = useInput((value => validateEmail(value)));

    let forgotFormIsValid = false;

    forgotFormIsValid = forgotEmailIsValid ? true : false;

    const forgotPasswordFormHandler = async (e) => {
        e.preventDefault();
        
        try {
            const data = await fetch(`/api/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({email : forgotEmail}),
            });

            const res = await data.json();
            alert(res.message);

        } catch (err){
            alert(err);
        }
    }

    const emailPorps = {
        label: "Email",
        id: "Email",
        type: "email",
        onChange: forgotEmailHandler,
        value: forgotEmail,
        onBlur: forgotEmailBlurHandler,
        error: forgotEmailHasError,
        placeholder: "enter your email...",
        errorMessage: "email is required",
    };

    const items = [{ ...emailPorps }];

    const tittleProps = [{ title: "Forgot Password" }];

    const formsNavigationProps = [{ content: " Don't have an account?", link: "/signup", click: "Register here" }];

  


    return (

        <UserFormsContainer titles={tittleProps}>

            <div style={{marginTop:'2rem', textAlign: "center"}} >
                <p>Enter the email address associated with your account, and we&apos;llsend you a link to reset your password.</p>
            </div>
            
            <FormsInput items={items} onSubmit={forgotPasswordFormHandler} btn = {{ title: "Send Mail", valid : forgotFormIsValid }}>

                {formsNavigationProps && <FormsNavigation formsNavigationProps={formsNavigationProps} /> }
                    
            </FormsInput>

        </UserFormsContainer>
           
    );
}

export default ForgotPasswordForm;
