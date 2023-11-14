import Table from 'react-bootstrap/Table';
import {useDispatch, useSelector} from "react-redux";
import {plusCount, minusCount, deleteCart} from "../../store/cart";
import {updateReduceTarget} from "../../store/user";
import Button from "react-bootstrap/Button";
import {updateTarget} from '../../apis/mypage/MyPageApi'
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";



const MyPage = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const array = Array.from({ length: 500 });
    const [targetValue,setTargetValue] = useState("");
    const [targetYn,setTargetYn] = useState(true);
    const dispatch = useDispatch()
    useEffect(() =>{
        if(Number(user.target)> 0){
            setTargetYn(false);
        }

    },[user])

    const update = () => {
        if(user.target === document.getElementById('selectTarget').value){
            alert("기존 목표금액과 동일합니다.");
            return false;
        }else{
            const formData = new FormData;
            setTargetValue(document.getElementById('selectTarget').value);
            formData.append('memberId', user.userId);
            formData.append('target', targetValue);

            if (user.userId !== "") {
                updateTarget(formData).then(res => {
                    if(res.data.success === 'Y'){
                        dispatch(updateReduceTarget(targetValue));
                        localStorage.setItem("user", JSON.stringify( {userId:user.userId,nickName:user.nickName,email:user.email,type:user.type,target:targetValue}))
                        alert("목표금액 설정이 완료되었습니다.");
                        navigate('/mypage');
                    }
                })
            } else {
                alert('로그인 후 이용해 주세요');
                navigate('/signin');
            }
        }
    }


    return (
            <div>
                <h1>안녕하세요<strong> {user.nickName} </strong>님</h1>
                {
                    targetYn ?
                    <>
                        <Container className="p-5">
                            <FloatingLabel controlId="targetValue" label="한달 사용 목표금액을 설정해 주세요">
                                <Form.Select aria-label="Floating label select example" id="selectTarget" size="md" onChange={(e) => setTargetValue(e.target.value) }>
                                    {
                                        array.map((x,index) =>{
                                            return <option key={index} value={String((index + 1)*10000)}  defaultValue={targetValue}  >{(index + 1)*1} 만원</option>
                                        })
                                    }
                                </Form.Select>
                            </FloatingLabel>
                        </Container>
                        <Button onClick={() => update()}>Done</Button>
                    </> :
                    <>
                        <Container className="p-5">
                            <ListGroup>
                                <ListGroup.Item action variant="warning">
                                    목표금액 : {user.target} 만원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="warning">
                                    사용금액 : 0 만원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="warning">
                                    이번주 사용가능 금액 : {user.target} 만원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="warning">
                                    사용가능 금액 : {user.target} 만원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="warning">
                                    남은기간 : 15일
                                </ListGroup.Item>
                                <ListGroup.Item action variant="warning">
                                    달성여부 : 달성
                                </ListGroup.Item>
                            </ListGroup>
                        </Container>
                        <Button onClick={() => setTargetYn(true)}>목표금액 수정</Button>
                    </>

                }
            </div>
    )
}

export default MyPage;