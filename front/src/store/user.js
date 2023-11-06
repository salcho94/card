import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({
    name : 'user',
    initialState :'ji sub',
    reducers:{
        changeName(state,action) {
            if(state !== 'ji sub'){
                return 'ji sub'
            }else{
                return action.payload + " " + state
            }
        }
    }
})
export let { changeName } = user.actions

export default user