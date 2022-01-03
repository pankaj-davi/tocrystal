import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showCategoryList: false,
    categoryItems : [],
}

const categorySlice = createSlice({
    name: "categoryHover",
    initialState,
    reducers: {
        showCate(state) {
            state.showCategoryList = true;
        },
        hideCate(state) {
            state.showCategoryList = false;
        },
        categoryLinks(state , payload) {
            state.categoryItems = payload;
        },

    }
    
});

export const categoryHoverAction = categorySlice.actions;

export default categorySlice;