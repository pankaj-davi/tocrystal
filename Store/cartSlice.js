
import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';

const cartCookies = cookies.get("cart") ? JSON.parse(cookies.get("cart")) : null;



const initialState = {
    totalItem : cartCookies?.totalItem || 0 ,
    totalPrice: cartCookies?.totalItem || 0,
    productItem : cartCookies?.productItem  || [],
}

const calcuateTotalPrice = (state) => {
   return state.totalPrice =  state.productItem.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);
}

const cartSlice = createSlice({
    name: "cart",
    initialState, 

    reducers: {
        addToCart: (state, action) => {
            console.log(action.payload._id);
            const existItem = state.productItem.find(item => item._id === action.payload._id)
            if (existItem) {
                existItem.quantity = existItem.quantity + 1
                state.totalItem++ 
            } else {   
                state.productItem = [...state.productItem , action.payload]
                state.totalItem++
            }
            
            calcuateTotalPrice(state);
            
            cookies.set("cart", JSON.stringify(state));
        },

        removeItemQunitity: (state, action) => {
            const remove = state.productItem.find(item => item._id === action.payload._id)

            if (remove.quantity > 1) {
                remove.quantity = remove.quantity - 1;
                 
            } else {
               const removeItemIdx = state.productItem.findIndex(item => item._id === action.payload._id);
               const removeItem = state.productItem.splice(removeItemIdx, 1);
            }

            state.totalItem--
            
            calcuateTotalPrice(state);
            
            cookies.set("cart", JSON.stringify(state));
        },

        removeItem: (state, action) => {
            
            const removeItemIdx = state.productItem.findIndex(item => item._id === action.payload);

            const removeItemQunitity = state.productItem[removeItemIdx].quantity
            
            const removeItem = state.productItem.splice(removeItemIdx, 1);

            state.totalItem = state.totalItem - removeItemQunitity;
            
            calcuateTotalPrice(state);

            cookies.set("cart", JSON.stringify(state));
        }
    }
})

export const cartSliceAction = cartSlice.actions;

export default cartSlice;