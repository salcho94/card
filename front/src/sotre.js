import {configureStore, createSlice} from "@reduxjs/toolkit";
import cart from "./store/cart";
import user from "./store/user";


export default configureStore({
    reducer: {
       user : user.reducer,
        cart : cart.reducer
    }
})