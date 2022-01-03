
import { useState } from "react";

const useInput = (validateValue) => {
    
    const [enteredValue, setEnterdValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (e) => {
        setEnterdValue(e.target.value);
    }

    const inputBlurHander = (e) => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnterdValue("");
        setIsTouched(false);
    }

    return {
        value: enteredValue,
        isValid : valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHander,
        reset,
    }
}

export default useInput;