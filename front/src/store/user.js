import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState : {
        userId : ""
        , nickName : ""
        ,email : ""
        ,type :"normal"
        ,target :"0"
    },
    reducers:{
        setUser(state,action) {
            state = action.payload
            return action.payload
        },
        logOutUser(state){
            state = {
                userId : ""
                ,nickName : ""
                ,email : ""
                ,type : "normal"
                ,target :"0"
            }
            return state;
        },
        updateReduceTarget(state,action){
            state.target = action.payload;
            return state;
        }
    }
})
export let { setUser,logOutUser ,updateReduceTarget} = user.actions

export default user