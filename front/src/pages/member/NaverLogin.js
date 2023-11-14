import React, {useEffect} from "react";
import axios from "axios";
import qs from "qs";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUser} from "../../store/user";
const NaverLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goToHome = () => {
        navigate("/");
    }
    useEffect(()=>{
        const code = new URL(window.location.href).searchParams.get("code");
        naverlogin(code);
    },[])

    /**
     * login
     */
    const naverlogin = async (code) => {

        const res = await axios.get(`/api/naver?code=${code}`); // 스프링 API서버에 code값을 담아 로그인 요청
        if (res.data) {
            localStorage.setItem("user", JSON.stringify( {userId:res.data.id,nickName:res.data.name,email:res.data.email,type:res.data.type,target:res.data.target}))
            dispatch(setUser({userId:res.data.id,nickName:res.data.name, email:res.data.email,type:res.data.type,target:res.data.target}));
            goToHome();
        }
    };

    return (
        <div>
            <strong>로그인중 입니다 잠시만 기다려 주세요</strong>
        </div>
    );
};

export default NaverLogin;