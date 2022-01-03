import React from 'react';
import useInput from '../../Hook/use-inputs';
import { useDispatch } from 'react-redux';
import { LoginActions } from '../../../Store/LoginSlice';
import Link from 'next/link';
import { useRouter } from "next/router";
import UserFormsContainer from '../../UI/Forms/UserFormsContainer';
import FormsInput from '../../UI/Forms/FormsInput';
import FormsNavigation from '../../UI/Forms/FormsNavigation';

function LoginForm() {
    
    const dispatch = useDispatch();

    function validateEmail(elementValue){      
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue); 
    }

    const {
        value: loginEmail,
        isValid: loginEmailIsValid,
        hasError: loginEmailHasError,
        valueChangeHandler: loginEmailHandler,
        inputBlurHander: loginEmailBlurHandler,
        
    } = useInput((value => validateEmail(value)));
    
    
    const {
        value: loginPassword,
        isValid: loginPasswordIsValid,
        hasError: loginPasswordHasError,
        valueChangeHandler: loginPasswordHandler,
        inputBlurHander: loginPasswordBlurHandler,
        
    } = useInput((value => value.trim() !== "" && value.trim().length >= 6));
   
    let loginFormIsValid = false;
    loginFormIsValid = loginEmailIsValid && loginPasswordIsValid ? true : false;

    const loginFormHandler = async (e) => {
        e.preventDefault();
        
        try {

            const data = await fetch('/api/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password : loginPassword,
                })
            })
                
            const res = await data.json();
            const token = await res.token;

            if (token) {
                
                dispatch(LoginActions.userLogin());
                
                alert("Login Successfully")

            } else if (!token){
                throw new Error(res.message);
            }   

        } catch (err) {
            alert(err.message);
        }
    }

    const emailPorps = {
        label: "Email",
        id: "Email",
        type: "email",
        onChange: loginEmailHandler,
        value: loginEmail,
        onBlur: loginEmailBlurHandler,
        error: loginEmailHasError,
        placeholder: "enter your email...",
        errorMessage: "email is required",
    }

    const passwordPorps = {
        label: "Password",
        id: "password",
        type: "password",
        onChange: loginPasswordHandler,
        value: loginPassword,
        onBlur: loginPasswordBlurHandler,
        error: loginPasswordHasError,
        placeholder: "enter your password",
        errorMessage: "Password is required or min character",
    }

    const tittleProps = [{ title: "Signup", link: "/signup"}, { title: "Login", ActiveClasses: " ",}];

    const items = [{ ...emailPorps }, { ...passwordPorps }];

    const formsNavigationProps = [{ content: "Forgot Password", link: "/forgot-password"  , click : "click here"} , {content : " Don't have an account?" , link : "/signup" , click : "click here"}];

    return (

        <UserFormsContainer titles={tittleProps}>

            <FormsInput items={items} onSubmit={loginFormHandler} btn={{ title: "Login", valid: loginFormIsValid }} >

                {formsNavigationProps && <FormsNavigation formsNavigationProps={formsNavigationProps} /> }
                
            </FormsInput>

        </UserFormsContainer>
    );
};

export default LoginForm;


// <div >
//                     <Link href={"/forgot-password"} passHref>
//                         <p >Forgot Password</p>
//                     </Link>
//                 </div>
//                 <div >
//                     <p> Don&apos;t have an account?
//                         <span >
//                             <Link href={"/signup"} passHref> Register here </Link>
//                         </span>
//                     </p>
//                 </div>