/*eslint-disable*/
import {useDispatch, useSelector} from "react-redux";
import {updateReduceTarget} from "../../store/user";
import Button from "react-bootstrap/Button";
import {updateTarget,getStatistics} from '../../apis/mypage/MyPageApi'
import {getMember} from '../../apis/member/MemberApi'
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";



const MyPage = () => {
    let now = new Date();	// 현재 날짜 및 시간
    let year = now.getFullYear();	// 연도
    let month = now.getMonth() + 1;	// 월
    let lastday = new Date(year,0,31);
    let day_calc = (lastday.getDate() - now.getDate())



    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const array = Array.from({ length: 500 });
    const [idYn,setIdYn] = useState(false);
    const [targetValue,setTargetValue] = useState("10000");
    const [statist,setStatist] = useState({
        dayUseMoney: "",
        useCanMoney: "",
        useMoney: "",
        weekCanUseMoney: "",
        weekUseMoney: ""
    })
    const [targetYn,setTargetYn] = useState(true);
    const dispatch = useDispatch()
    useEffect(() =>{
        if (user.userId !== "" ) {
            getMember(user.userId).then(res =>{
                let formData = new FormData;

                formData.append('memberId', user.userId);
                formData.append('target', res.data.target);
                formData.append('month', year +'-'+month);

                getStatistics(formData).then(state =>{
                    setStatist(state.data);
                })

                dispatch(updateReduceTarget(res.data.target));
            })
            if(Number(user.target)> 0) {
                setTargetYn(false);
            }

        }
    },[])

    const update = () => {
        if(user.target === document.getElementById('selectTarget').value){
            alert("기존 목표금액과 동일합니다.");
            return false;
        }else{
            let formData = new FormData;
            setTargetValue(document.getElementById('selectTarget').value);
            formData.append('memberId', user.userId);
            formData.append('target', targetValue);

            if (user.userId !== "") {
                updateTarget(formData).then(res => {
                    if(res.data.success === 'Y'){
                        dispatch(updateReduceTarget(targetValue));
                        localStorage.setItem("user", JSON.stringify( {userId:user.userId,nickName:user.nickName,email:user.email,type:user.type,target:targetValue}))
                        alert("목표금액 설정이 완료되었습니다.");
                        window.location.reload();
                    }
                })
            } else {
                alert('로그인 후 이용해 주세요');
                navigate('/signin');
            }
        }
    }


    return (
            <div className="p-1">
                <div>
                    <h1>안녕하세요<strong> {user.nickName} </strong>님</h1>
                    {idYn &&

                        <h1>고유 아이디<strong> {user.userId} </strong>입니다.</h1>
                    }
                    <button className="btn btn-success" onClick={() =>{
                        setIdYn(!idYn);
                    }}>고유 아이디 {!idYn ? '확인' : '숨김'}</button>
                </div>
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
                        <Container className="p-3">
                            <ListGroup>
                                <ListGroup.Item action variant="info">
                                  <strong>{year}년 {month}월</strong> 목표금액 : <strong>{user.target}</strong> 원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="info">
                                    <strong>{year}년 {month}월</strong> 사용금액 : <strong>{statist.useMoney ?  statist.useMoney : '0'}</strong> 원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="info">
                                    <strong>{year}년 {month}월</strong> 사용가능 금액 : {statist.useCanMoney < 0 ? '0' : statist.useCanMoney}원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="info">
                                    <strong>{year}년 {month}월</strong> 남은기간 : <strong>{day_calc}</strong> 일
                                </ListGroup.Item>
                                <ListGroup.Item action variant="secondary">
                                    주별 사용권장 금액 : {statist.dayUseMoney * 7} 원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="secondary">
                                    일별 사용권장 금액 : {statist.dayUseMoney} 원
                                </ListGroup.Item>
                                <ListGroup.Item action variant="light">
                                    <strong>금주 사용 금액 : {statist.weekUseMoney ?  statist.weekUseMoney : '0'} 원</strong>
                                </ListGroup.Item>
                                <ListGroup.Item action variant="light">
                                    <strong>금주 사용가능 금액 : {statist.weekCanUseMoney < 0 ? '0' : statist.weekCanUseMoney} 원</strong>
                                </ListGroup.Item>
                                {
                                    statist.useCanMoney < 0 &&
                                    <ListGroup.Item action variant="danger">
                                        초과 사용 금액 : <strong className="text-danger"> {Math.abs(statist.useCanMoney)} </strong>원
                                    </ListGroup.Item>
                                }
                                <ListGroup.Item action variant="warning">
                                    달성여부 :
                                    {
                                        user.target > statist.useMoney ?
                                            <strong className="text-primary">
                                                달성중
                                            </strong>
                                           :
                                            <strong className="text-danger">
                                                실패함!!!
                                            </strong>
                                    }
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