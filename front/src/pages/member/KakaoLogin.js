import React, {useEffect} from 'react';
import axios from "axios";
import qs from "qs";
import { useNavigate } from 'react-router-dom';
import {setUser} from "../../store/user";
import {useDispatch} from "react-redux";
const  KakaoLogin = ({kakaoRedirectUri}) => {
    const REST_API_KEY = '3241a5985286c01f380dfa804a5a8613';
    const REDIRECT_URI = kakaoRedirectUri;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let accessToken = '';
    const code = new URL(window.location.href).searchParams.get("code");

    const goToHome = () => {
        navigate("/");
    }
    const getUser =  async  (accessToken) => {
        try {
            //응답 성공
            const response = await axios.get(process.env.REACT_APP_URL + `/api/kakao?accessToken=${accessToken}`);
            console.log(response.data);
            return response
        } catch (error) {
            //응답 실패
            console.error(error);
        }
    }
    const getToken = async () => {
        const payload = qs.stringify({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
        });
        try {
            // access token 가져오기
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                payload

            );
            accessToken = res.data.access_token
            // Kakao Javascript SDK 초기화
            window.Kakao.init(REST_API_KEY);
            // access token 설정
            window.Kakao.Auth.setAccessToken(res.data.access_token);


        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        getToken();
        if(accessToken){
            getUser(accessToken).then(res=>{
                localStorage.setItem("user", JSON.stringify( {nickName:res.data.nickName,email:res.data.email,type:"normal"}))
                dispatch(setUser({nickName:res.data.nickName, email:res.data.email,type:"normal"}));
                goToHome();
            });
        }
    }, []);

    return (
        <div>
            { code }
        </div>
    );
};
export default KakaoLogin;