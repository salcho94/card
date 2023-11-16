/*eslint-disable*/

import React, {useEffect, useState} from "react";
import data from "../../data";
import {getWishCode, getWishList} from '../../apis/wish/WishListApi'
import {Route, useNavigate} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Button from "react-bootstrap/Button"
import axios from "axios";
import {useSelector} from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import noImg from './../../img/no_img.jpg'

const WishList = () => {

    const navigate = useNavigate();
    const [wishCate,setWishCate] =  useState([{codeId:'',cateName:''}])
    const [cate,setCate] =  useState("all")
    let user = useSelector((state) => state.user);


    const [wishList,setWishList] = useState([{
        wishItemId:''
        ,wishItmeTitle:''
        ,wishItmeImgPath :''
        ,wishItmePrice :''
        ,cateId:''
        ,cateName:''
    }])

    useEffect(() => {
        let storeUser = JSON.parse(localStorage.getItem("user"));

        getWishCode().then((res) => {
            setWishCate(res);
        });
        
        if(storeUser){
            getWishList(storeUser.userId,cate).then((res) => {

                setWishList(res);
            });
        }

    }, [cate]);
        return(
            <>

                { user.userId ?
                        <>
                            <div className="page-wrapper">
                                <div className="container-fluid main-bg">
                                    <div>
                                        <div className="static-slider-head ">
                                            <div className="static-slider10">
                                                <Container>
                                                </Container>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="7" className="text-center d-flex">
                                        <Button  className="btn  btn-dark m-3 w-75" onClick={() =>{navigate("/addWish")}}> 상품 추가</Button>
                                        <InputGroup className="m-3">
                                            <InputGroup.Text><strong>상품 카테고리</strong></InputGroup.Text>
                                            <Form.Select aria-label="카테고리를 선택해 주세요" onChange={(e)=>{setCate(e.target.value)}}>
                                                <option value="all" >전체</option>
                                                {
                                                    wishCate.map((data,i)=> {
                                                        return(
                                                            <option key={i} value={data.cateId}>{data.cateName}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Container>
                                    <div>

                                            <>
                                                <div>
                                                    <div className="spacer">
                                                        <Container>
                                                            <Row className="m-t-40">
                                                                {
                                                                    wishList.length > 0  &&
                                                                    wishList.map((data,index) =>{
                                                                    return(
                                                                        <Col md="4" key={index}>
                                                                            <Card className="card-shadow m-3">
                                                                                <img className="card-img-top" src={data.wishItmeImgPath ? data.wishItmeImgPath : noImg}  style={{height:"300px"}} alt="wrappixel kit" />
                                                                                <CardBody>
                                                                                    <h5 className="font-medium m-b-0">상품명:{data.wishItmeTitle}</h5>
                                                                                    <h5 className="font-medium m-b-0">가격:{data.wishItmePrice}원</h5>
                                                                                    <p>분류:{data.cateName}</p>
                                                                                    <Button variant="primary" onClick={()=>{alert("준비중이에용")}}>상세보기</Button>
                                                                                </CardBody>
                                                                            </Card>
                                                                        </Col>
                                                                        )
                                                                    })
                                                                }
                                                            </Row>
                                                        </Container>
                                                    </div>
                                                </div>
                                            </>

                                        {wishList.length == 0  &&
                                            <Container>
                                                <Row className="justify-content-center">
                                                    <Col md="7" className="text-center" style={{height:"600px"}}>
                                                        <h1 className="title font-bold" > 상품이 존재하지 않습니다.</h1>
                                                        <h6 className="subtitle">구매를 희망하는 상품을 등록해 주세요</h6>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        }
                                </div>
                        </>
                    :
                    <>
                        <div className="container">
                            <Card.Subtitle className="mb-2 text-muted mb-3"><h2>지출 관리 홈페이지</h2></Card.Subtitle>
                            <Card.Text className="p-3">
                                안녕하세요 이 홈페이지는 지출을 효율적으로 관리하도록
                            </Card.Text>
                            <Card.Text className="p-3">
                                개발된 홈페이지 입니다. 로그인 후 이용이 가능합니다.
                            </Card.Text>
                            <Card.Text>
                                <button className="btn btn-dark" onClick={() => navigate('signin')}>로그인</button>
                            </Card.Text>
                        </div>
                    </>
                }
                </>
        )
}
export default WishList;