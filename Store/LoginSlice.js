import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const cookieLogin = Cookies.get("login") ? Cookies.get("login") : false;

const initialState = {
    login: cookieLogin || false,
}

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        userLogin(state) {
            state.login = true;

            Cookies.set('login', state.login);
        }
    }
})

export const LoginActions = LoginSlice.actions;

export default LoginSlice;