import React, {useEffect, useState} from 'react';
import axios from "axios";
import qs from "qs";
import { useNavigate } from 'react-router-dom';
import {setUser} from "../../store/user";
import {useDispatch} from "react-redux";
const  KakaoLogin = () => {
    const REST_API_KEY = `${process.env.REACT_APP_KAKAO_CLIENT_ID}`;
    const REDIRECT_URI = `${process.env.REACT_APP_KAKAO_LOGIN}/kakaoLogin`;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [accessToken,setAccessToken] = useState('');
    const code = new URL(window.location.href).searchParams.get("code");

    const goToHome = () => {
        navigate("/");
    }
    const getUser =  async  (accessToken) => {
        try {
            //응답 성공
            const response = await axios.get(`/api/kakao?accessToken=${accessToken}`);
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
            const headers = {
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*'
            }
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                payload,
          {
                    headers: {
                        "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
                    }
                }
            );
            setAccessToken(res.data.access_token);

            // Kakao Javascript SDK 초기화
            //window.Kakao.init(REST_API_KEY);
            // access token 설정
            //window.Kakao.Auth.setAccessToken(res.data.access_token);


        } catch (err) {
            console.log("err");
        }
    };
    getToken();
    if(accessToken){
        getUser(accessToken).then(res=>{
            console.log(res)
            localStorage.setItem("user", JSON.stringify( {userId:res.data.id,nickName:res.data.nickName,email:res.data.email,type:res.data.type}))
            dispatch(setUser({userId:res.data.id,nickName:res.data.nickName, email:res.data.email,type:res.data.type}));
            goToHome();
        });
    }



    return (
        <div>
            <strong>로그인중 입니다 잠시만 기다려 주세요</strong>
        </div>
    );
};
export default KakaoLogin;