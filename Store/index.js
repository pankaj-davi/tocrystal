import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category-onhover";
import cartSlice from "./cartSlice";
import LoginSlice from "./LoginSlice";


const store = configureStore({
    reducer: {
        showCategory: categorySlice.reducer,
        cart: cartSlice.reducer,
        login : LoginSlice.reducer,
    }
});

export default store;