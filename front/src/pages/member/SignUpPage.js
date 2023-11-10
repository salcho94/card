/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';

import Alert from 'react-bootstrap/Alert';

import {duplicateCheck,submit} from '../../apis/member/MemberApi'
import {useNavigate} from "react-router-dom";


function SignUpPage(props) {

    let navigator = useNavigate();


    const [HideDuBtn,setHideDuBtn] = useState(true);
    const [Duplicate,setDuplicateCheck] = useState(false);
    const [Alert,setAlert] = useState(["","","",""]);
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    let copyAlert = [...Alert];

    const onDuplicateCheck = (e) => {
        if(Name !== "" && window.confirm("중복체크 이후엔 닉네임 수정이 불가능합니다 \r중복체크를 진행하시겠습니까?")){
            duplicateCheck(Name).then(res =>{
                if(res.data.success === 'Y'){
                    copyAlert[0] = "";
                    setDuplicateCheck(true);
                    setAlert(copyAlert)
                }else{
                    copyAlert[0] = res.data.msg;
                    setAlert(copyAlert);
                }
            }).catch(err =>{
                console.log(err);
            })
        }else if(Name === ""){
            copyAlert[0] = "닉네임을 먼저 입력해 주세요";
            setAlert(copyAlert)
        }
    }

    const onNameHandler = (event) => {
        let regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
        if(event.target.value == "" || regex.test(event.target.value)){
            copyAlert[0] = "";
            setAlert(copyAlert)
            setName(event.target.value);
            setHideDuBtn(true);
        }else{
            copyAlert[0] = "한글 영어 숫자만 입력 가능합니다.";
            setHideDuBtn(false);
            setAlert(copyAlert)
        }

    }
    const onEmailHandler = (event) => {

        let regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if(event.target.value == "" || regex.test(event.target.value)){
            copyAlert[1] = "";
            setAlert(copyAlert)
            setEmail(event.target.value);
        }else{
            copyAlert[1] = "이메일 형식이 올바르지 않습니다.";
            setAlert(copyAlert)
        }

    }

    const onPasswordHandler = (event) => {
        console.log(event.target.value)
        let regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,25}$/
        if(event.target.value == "" || regex.test(event.target.value)){
            setPassword(event.target.value);
            copyAlert[2] = "";
            setAlert(copyAlert)
        }else{
            copyAlert[2] = "숫자와 영어를 조합한 6자 이상의 비밀번호만 가능합니다.";
            setAlert(copyAlert)
        }

    }
    const onConfirmPasswordHandler = (event) => {
        let beforePass = document.getElementById('beforePass').value
        let afterPass = document.getElementById('afterPass').value

        if(beforePass !== afterPass){
            copyAlert[3] = "비밀번호와 비밀번호 확인이 다릅니다.";
            setAlert(copyAlert)
        }else{
            copyAlert[3] = "";
            setAlert(copyAlert)
        }
    }
    const submitCheck = () =>{
        let nextYn = Alert.filter(x=> x !== '');
        let passChk = document.getElementById('afterPass').value

        if(!Name){
            alert('닉네임을 입력해 주세요');
            return false;
        }else if(!Duplicate){
            alert('닉네임 중복확인을 진행해 주세요');
            return false;
        }else if(!Email){
            alert('이메일을 입력해 주세요');
            return false;
        }else if(!Password){
            alert('비밀번호를 입력해 주세요');
            return false;
        }else if(!passChk){
            alert('비밀번호 확인을 입력해 주세요');
            return false;
        }else{
            return true;
        }
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(submitCheck()){
            if(confirm('회원가입을 진행하시겠습니까?')){
                const formData = new FormData;
                formData.append('nickName',Name);
                formData.append('email',Email);
                formData.append('password',Password);
                submit(formData).then(res =>{
                    if(res.data.success === 'Y'){
                        alert(res.data.msg);
                        document.getElementById('nextStep').click();
                    }else{
                        alert(res.data.msg);
                        window.location.reload();
                    }

                });
            }
        }


    }


    return (

        <Container className="p-5">
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><strong>닉네임</strong></InputGroup.Text>
                    <Form.Control
                        disabled={Duplicate}
                        placeholder="NickName"
                        aria-label="NickName"
                        aria-describedby="basic-addon1"
                        onChange={((e) => { onNameHandler(e)})}
                    />
                    {HideDuBtn &&
                    <Button  disabled={Duplicate} variant="outline-secondary" id="button-addon1" onClick={(e) => onDuplicateCheck(e)}>
                        {Duplicate?'확인완료':'중복체크'}
                    </Button>
                    }
                </InputGroup>
                {Alert[0] !== "" &&
                    <InputGroup className="mb-3">
                        <p className="text-danger"> {Alert[0]}</p>
                    </InputGroup>
                }
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon2"><strong>이메일</strong></InputGroup.Text>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon2"
                        onChange={(e) => onEmailHandler(e)}
                    />
                </InputGroup>
                {Alert[1] !== "" &&
                    <InputGroup className="mb-3">
                        <p className="text-danger"> {Alert[1]}</p>
                    </InputGroup>
                }
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3"><strong>비밀번호</strong></InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        aria-label="password"
                        id="beforePass"
                        aria-describedby="basic-addon3"
                        onChange={(e) => onPasswordHandler(e)}
                    />
                </InputGroup>
                {Alert[2] !== "" &&
                    <InputGroup className="mb-3">
                        <p className="text-danger"> {Alert[2]}</p>
                    </InputGroup>
                }
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon4"><strong>비밀번호 확인</strong></InputGroup.Text>
                    <Form.Control
                        type="password"
                        placeholder="password check"
                        aria-label="password check"
                        id="afterPass"
                        aria-describedby="basic-addon4"
                        onChange={(e) => onConfirmPasswordHandler(e)}
                    />
                </InputGroup>
                {Alert[3] !== "" &&
                    <InputGroup className="mb-3">
                        <p className="text-danger"> {Alert[3]}</p>
                    </InputGroup>
                }
                <Button className="align-content-center" variant="secondary" onClick={(e) =>{onSubmitHandler(e)}}>가입하기</Button>
                <input type="hidden" id="nextStep" onClick={() =>  navigator("/signin")}/>
        </Container>
    )
}

export default SignUpPage;