import React from 'react';
import useInput from '../../Hook/use-inputs';
import Link from "next/link";
import { useRouter } from "next/router";
import UserFormsContainer from '../../UI/Forms/UserFormsContainer';
import FormsInput from '../../UI/Forms/FormsInput';
import FormsNavigation from '../../UI/Forms/FormsNavigation';

function ForgetPasswordToken(props) {

    const router = useRouter();

    const { token, valid } = props;

    const {
        value: resetPassword,
        isValid: resetPasswordIsValid,
        hasError: resetPasswordHasError,
        valueChangeHandler: resetPasswordHandler,
        inputBlurHander: resetPasswordBlurHandler,
        reset: resetPasswordReset,
        
    } = useInput((value => value.trim() !== "" && value.trim().length >= 6));
    
    const {
        value: resetPasswordConfirm,
        isValid: resetPasswordConfirmIsValid,
        hasError: resetPasswordConfirmHasError,
        valueChangeHandler: resetPasswordConfirmHandler,
        inputBlurHander: resetPasswordConfirmBlurHandler,
        reset: resetPasswordConfirmReset,
        
    } = useInput((value => value.trim() === resetPassword.trim()));

    let resetFormIsValid = false;

    resetFormIsValid = resetPasswordIsValid && resetPasswordConfirmIsValid ? true : false;

    const resetPasswordProps = {
        label: "Enter New Password",
        id: "Enter New Password",
        type: "password",
        onChange: resetPasswordHandler,
        value: resetPassword,
        onBlur: resetPasswordBlurHandler,
        error: resetPasswordHasError,
        placeholder: "Enter New password",
        errorMessage: "Password is required or min 6 character",
    }

    const confirmPasswordProps = {
        label: "Confirm New Password",
        id: "Confirm New Password",
        type: "password",
        onChange: resetPasswordConfirmHandler,
        value: resetPasswordConfirm,
        onBlur: resetPasswordConfirmBlurHandler,
        error: resetPasswordConfirmHasError,
        placeholder: "Confirm your password",
        errorMessage: "Password is not metch",
    }

    const items = [{ ...resetPasswordProps }, { ...confirmPasswordProps }];

    const tittleProps = [{ title: " New Password" }];
    
    const resetFormSubmitHandler = async (e) => {
        e.preventDefault();

        try {
        
            const putNewPassword = await fetch("/api/reset-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    password: resetPassword,
                })
            })
        
            const res = await putNewPassword.json();

            resetPasswordReset();
            resetPasswordConfirmReset();

            alert(res.message);

            router.push("/login");

        } catch (err) {
            alert(err);
        }
    
    };

    const formsNavigationProps = [{ content: "Return to Login", link: "/login", click: "click here" }];

               

    return (
        <UserFormsContainer titles={tittleProps}>
            
            <FormsInput items={items} onSubmit={resetFormSubmitHandler} btn = {{ title: "Set Your Password", valid : resetFormIsValid }}   >
                
                {formsNavigationProps && <FormsNavigation formsNavigationProps={formsNavigationProps} /> }
                
            </FormsInput>
        </UserFormsContainer>
    );
}

export default ForgetPasswordToken;

