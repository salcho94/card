/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {setUser} from "../../store/user";
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

import Alert from 'react-bootstrap/Alert';

import {loginSubmit} from '../../apis/member/MemberApi'
import {useNavigate} from "react-router-dom";


function SignInPage(props) {
    let navigate = useNavigate();
    let dispatch = useDispatch()
    let KakaoLoginAPI = `https://kauth.kakao.com/oauth/authorize?client_id=3241a5985286c01f380dfa804a5a8613&redirect_uri=http://192.168.123.122:3000/kakaoLogin&response_type=code`;

    const openKakaoLogin = () => {
        window.open(KakaoLoginAPI, "_self");
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
                    localStorage.setItem("user", JSON.stringify( {nickName:res.data.nickName,email:res.data.email,type:"normal"}))
                    dispatch(setUser({nickName:res.data.nickName, email:res.data.email,type:"normal"}));
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
                <Button className="align-content-center" variant="primary" onClick={() =>{openKakaoLogin()}}>카카오 로그인</Button>
                <Button className="align-content-center" variant="primary" onClick={(e) =>{onLoginHandler(e)}}>로그인</Button>
        </Container>
    )
}

export default SignInPage;