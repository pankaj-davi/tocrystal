import React from 'react';
import useInput from '../../Hook/use-inputs';
import Link from "next/link";
import { useRouter } from "next/router";
import UserFormsContainer from '../../UI/Forms/UserFormsContainer';
import FormsInput from '../../UI/Forms/FormsInput';
import FormsNavigation from '../../UI/Forms/FormsNavigation';

function SignUpForm() {

    const router = useRouter();

    function validateEmail(elementValue){      
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue); 
    }

    const {
        value: name,
        isValid: nameIsValid,
        hasError: nameHasError,
        valueChangeHandler: nameHandler,
        inputBlurHander: nameBlurHandler,
        reset : resetname,
    } = useInput((value => value.trim() !== ""));

     const {
        value: email,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailHandler,
         inputBlurHander: emailBlurHandler,
        reset : resetEmail,
    } = useInput((value) => validateEmail(value));

    let signUpFormIsValid = false;
    
    signUpFormIsValid = nameIsValid && emailIsValid ? true : false;

    const SignupFormHandler =  async (e) => {
        e.preventDefault();

        try {
            if (!signUpFormIsValid) return;
           
        
            const data =  await fetch('/api/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name : name,
                    email : email,
                }),
            
            })

            resetname();
            resetEmail();

            const res = await data.json();
            alert(res.message);


        } catch (err) {
            console.log('Something went wrong');
        }
        
    };

    const fullNamePorps = {
        
        label: "FullName",
        id: "FullName",
        type: "text",
        onChange: nameHandler,
        value: name,
        onBlur: nameBlurHandler,
        error: nameHasError,
        placeholder: "enter your name...",
        errorMessage: "name is required",
    };

    const emailPorps = {
        
        label: "Email",
        id: "Email",
        type: "email",
        onChange: emailHandler,
        value: email,
        onBlur: emailBlurHandler,
        error: emailHasError,
        placeholder: "enter your email...",
        errorMessage: "email is required",
        
    }

    const tittleProps = [{ title: "Signup", ActiveClasses: " ", }, { title: "Login", link: "/login", }];

    const items = [{ ...fullNamePorps }, { ...emailPorps }];

    const formsNavigationProps = [{ content: "Forgot Password", link: "/forgot-password"  , click : "click here"} , {content : "Have an account?" , link : "/login" , click : "click here"}];

    return (
        <UserFormsContainer titles={tittleProps}>
            
            <FormsInput items={items}  onSubmit={SignupFormHandler} btn={{title : "Signup" , valid : signUpFormIsValid}}> 
            
               {formsNavigationProps && <FormsNavigation formsNavigationProps={formsNavigationProps} /> }

            </FormsInput>
        </UserFormsContainer>
    );
}

export default SignUpForm;





