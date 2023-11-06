import {createSlice} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";

const cart = createSlice({
    name : 'cart',
    initialState :[
        {id : 1, title : 'White and Black', count : 2},
        {id : 2, title : 'Grey Yordan', count : 1},
        {id : 3, title : 'xioshin pad', count : 5},
        {id : 4, title : 'region y700 2', count : 2},
        {id : 5, title : 'i play 50 pro', count : 7},
    ],
    reducers:{
        plusCount(state,action) {
            let findState = state.find((data)=> data.id == action.payload)
            findState.count++
        },
        minusCount(state,action) {
            let findState = state.find((data)=> data.id == action.payload)
            if(findState.count > 1){
                findState.count--
            }else{
                alert("장바구니에 값이 존재하지 않습니다.")
            }
        },
        deleteCart(state,action){
            state.splice(action.payload,1);
        },
        addCart(state,action){
            let duplication = state.find((x) => x.id == action.payload.id);
            if(duplication){
                alert("이미 장바구니에 존재하는 상품입니다.")
            }else{
                state.push(action.payload)
                alert("장바구니에 추가 완료하였습니다.");

            }
        },
    }
})
export let {addCart,deleteCart, plusCount ,minusCount} = cart.actions
export default cart