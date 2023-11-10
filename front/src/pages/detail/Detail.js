/*eslint-disable*/
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCart} from "../../store/cart";
import DetailTab from "./DetailTap";

const Detail = (props) => {

    let dispatch = useDispatch();
    let {id} = useParams();
    let findData = props.shoes.find((data) => {
        return data.id == id;
    })
    const [count,setCount] = useState(Number(findData.count));
    let [fade2,setFade2] = useState('');

    useEffect(()=>{
        let getWatched  = JSON.parse(localStorage.getItem('watched'))
        getWatched.push(findData.id)
        let result = [...new Set(getWatched)];
        localStorage.setItem('watched',JSON.stringify(result));

        let showFade2 = setTimeout(()=>{setFade2('end')},200)
        return () => {
            clearTimeout(showFade2);
            setFade2('');
        }

    },[])

    useEffect(() =>{
        let time;

        if(count > 0){
            time =  setTimeout(() => {setCount(count - 1)}, 1000);
        }
        return () => {
            clearTimeout(time);
            // useEffect 동작전에 기존 timer 제거 한다.
        }
    },[count])

    return  (
        <div className={`start container ${fade2}`}>
            {count > 0 ?
                <div className="alert alert-warning">
                    {count}초이내 구매시 할인
                </div>
                : null
            }
            <div className="row" >
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+ (findData.id + 1) +".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{findData.title}</h4>
                    <p>{findData.content}</p>
                    <p>{findData.detail}</p>
                    <button className="btn btn-danger" onClick={() =>{ dispatch(addCart({id:findData.id,title:findData.title,count: findData.count}));}}>주문하기</button>
                </div>
            </div>
            <DetailTab shose={findData}/>
        </div>
    )
}

export default Detail;