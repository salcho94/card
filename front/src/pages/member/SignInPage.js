/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setUser} from "../../store/user";
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import kakaoBtn from './../../img/kakao.png'
import naverBtn from './../../img/naver.png'

import {loginSubmit} from '../../apis/member/MemberApi'
import {useNavigate} from "react-router-dom";


function SignInPage(props) {
    let navigate = useNavigate();
    let dispatch = useDispatch()
    let KakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN}/kakaoLogin&response_type=code`;
    let NaverLoginApi = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_LOGIN}/naverLogin`;
    const openKakaoLogin = () => {
        window.open(KakaoLoginAPI, "_self");
    };
    const openNaverLogin = () => {
        window.open(NaverLoginApi, "_self");
    };
    const goToHome = () => {
        navigate("/");
    }
    const onLoginHandler = () =>{
        let nickName = document.getElementById('nickName').value;
        let password =  document.getElementById('password').value;
        if(nickName == ""){
            alert("닉네임을 입력해 주세요");
        }else if(password == ""){
            alert("비밀번호를 입력해 주세요");
        }else{
            const formData = new FormData;
            formData.append('nickName',nickName);
            formData.append('password',password);
            loginSubmit(formData).then(res =>{
                if(res.data.success === "Y"){
                    localStorage.setItem("user", JSON.stringify( {userId:res.data.id,nickName:res.data.nickName,email:res.data.email,"type":res.data.type,target:res.data.target}))
                    dispatch(setUser({userId:res.data.id,nickName:res.data.nickName, email:res.data.email,type:res.data.type,target:res.data.target}));
                    goToHome();
                }else if(res.data.success === "L"){
                    alert(res.data.msg);
                    return false;
                }else{
                    alert("비밀번호가 일치하지 않습니다.")
                    return false;
                }

            })
        }
    
    }
  

    return (

        <Container className="p-5">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><strong>닉네임</strong></InputGroup.Text>
                    <Form.Control
                        placeholder="NickName"
                        aria-label="NickName"
                        aria-describedby="basic-addon1"
                        id="nickName"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3"><strong>비밀번호</strong></InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        aria-label="password"
                        id="password"
                        aria-describedby="basic-addon3"
                    />
                </InputGroup>
                <InputGroup className="mb-3" style={{ justifyContent : "center"}}>
                    <Image src={kakaoBtn} rounded={true} roundedCircle={true}  style={{width:"40px" ,marginRight:"25px",cursor:"pointer"}} onClick={() =>{openKakaoLogin()}} />
                    <Image src={naverBtn} rounded={true} roundedCircle={true}  style={{width:"40px" ,marginLeft:"25px",cursor:"pointer"}} onClick={() =>{openNaverLogin()}} />
                </InputGroup>
                <Button className="align-content-center m-3" variant="success" onClick={() =>{navigate('/signup')}}>회원가입</Button>
                <Button className="align-content-center m-3" variant="dark" onClick={(e) =>{onLoginHandler(e)}}>로그인</Button>
        </Container>
    )
}

export default SignInPage;