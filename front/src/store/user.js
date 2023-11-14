import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : {
        userId : ""
        , nickName : ""
        ,email : ""
        ,type :"normal"
    },
    reducers:{
        setUser(state,action) {
            state = action.payload
            return action.payload
        },
        logOutUser(state){
            state = {
                nickName : ""
                ,email : ""
                ,type : "normal"
            }
            return state;
        }
    }
})
export let { setUser,logOutUser } = user.actions

export default user