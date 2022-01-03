import React, { Fragment } from 'react';
import useInput from '../../Hook/use-inputs';
import { useRouter } from "next/router";
import UserFormsContainer from '../../UI/Forms/UserFormsContainer';
import FormsInput from '../../UI/Forms/FormsInput';


function SignupPasswordSet(props) {

    const { token, valid , userDetail } = props;

    const router = useRouter();

    const userDetails = JSON.parse(userDetail);

    const {
        value: password,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordHandler,
         inputBlurHander: passwordBlurHandler,
        reset : resetPassword,
    } = useInput((value => value.trim("") !== "" && value.trim().length >= 6));
    
    const {
        value: confirmPassword,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordHandler,
        inputBlurHander: confirmPasswordBlurHandler,
        reset : resetConfirmPassword,
    } = useInput((value => value.trim() === password.trim()));

    let signupPasswordFormIsValid = false;
   
    signupPasswordFormIsValid = passwordIsValid && confirmPasswordIsValid ? true : false;

    if (router.query.setupPasswordToken !== userDetails[0]._id) return;


    const passwordSetupFormHandler =  async (e) => {
        e.preventDefault();

        try {

            if (!signupPasswordFormIsValid) return;
        
            const data =  await fetch('/api/signup-password-setup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userDetails[0].name,
                    email : userDetails[0].creatorId,
                    password: password,
                    token,
                }),
            })

        
            resetPassword();
            resetConfirmPassword();

            const res = await data.json();
            alert(res.message);

        } catch (err) {
            alert('Something went wrong');
        }
        
    };

    const passwordProps = {
        label: "Password",
        id: "Password",
        type: "password",
        onChange: passwordHandler,
        value: password,
        onBlur: passwordBlurHandler,
        error: passwordHasError,
        placeholder: "enter your password",
        errorMessage: "Password is required or min character",
    }

    const confirmPasswordProps = {
        label: "Confirm-Password",
        id: "Confirm-Password",
        type: "password",
        onChange: confirmPasswordHandler,
        value: confirmPassword,
        onBlur: confirmPasswordBlurHandler,
        error: confirmPasswordHasError,
        placeholder: "Confirm your password",
        errorMessage: "Password Is not metch",
    }

    const items = [{ ...passwordProps }, { ...confirmPasswordProps }];
                    
    const tittleProps = [{ title: "Create a password for your account" }];

    return (
        <UserFormsContainer titles={tittleProps}>
            
            <FormsInput items={items} onSubmit={passwordSetupFormHandler} btn={{title : "Set Your Password" , valid : signupPasswordFormIsValid}} />
        </UserFormsContainer>
  
    );
}

export default SignupPasswordSet;
