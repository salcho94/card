/*eslint-disable*/
import {useNavigate, useParams} from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import {useContext, useEffect, useRef, useState} from "react";
import {getWishItem,deleteWishItem,wishDoneItem} from '../../apis/wish/WishListApi'
import noImg from "../../img/no_img.jpg";
import Button from "react-bootstrap/Button";

const Detail = () => {
    let navigate = useNavigate();
    let {id} = useParams();
    let [fade,setFade] = useState('');
    let [detail,setDetail] = useState({
        cateName: "",
        imgPath:"",
        itemLink:"",
        itemPrice:"",
        itemReason:"",
        itemTitle:"",
        writer:"",
        regDate:""
    })

    const deleteHandler = (id) =>{
        let formData = new FormData;
        formData.append("wishItemId",id);
        if(window.confirm("정말 삭제하시겠습니까?")){
            deleteWishItem(formData).then((res) =>{
                if(res.success == 'Y'){
                    alert(res.msg);
                    navigate("/");
                }else{
                    alert(res.msg);
                    return false;
                }
            })
        }
    }

    const wishDoneHandler = (id) =>{
        let formData = new FormData;
        formData.append("wishItemId",id);
        if(window.confirm("구매를 하셨나요?")){
            wishDoneItem(formData).then((res) =>{
                if(res.success == 'Y'){
                    alert(res.msg);
                    navigate("/mypage");
                }else{
                    alert(res.msg);
                    return false;
                }
            })
        }
    }

    useEffect(()=>{
        if(id){
            getWishItem(id).then((res) =>{
                setDetail(res);
            })
        }
        let showFade = setTimeout(()=>{setFade('end')},200)
        return () => {
            clearTimeout(showFade);
            setFade('');
        }
    },[])

    return  (
        <div className={`start container ${fade}`}>
            <Container>
                <Card className="mt-5 mb-5" >
                    <Card.Img variant="top" src={detail.imgPath  ? detail.imgPath  : noImg  }   style={{height:"500px"}} className="p-3"/>
                    <Card.Body>
                        {
                            [
                                {
                                    title : "상품명",
                                    value : detail.itemTitle
                                }, 
                                {
                                    title : "분류",
                                    value : detail.cateName
                                },
                                {
                                    title : "구매링크",
                                    value : detail.itemLink
                                },
                                {
                                    title : "구매이유",
                                    value : detail.itemReason
                                },
                                {
                                    title : "등록일",
                                    value : detail.regDate
                                },
                                {
                                    title : "구매희망자",
                                    value : detail.writer
                                },
                            ].map((data,index) => {
                                return(
                                    <Row className="p-1" key={index}>
                                        <Col xs={4} md={4}>
                                            <Card.Text><strong>{data.title}</strong></Card.Text>
                                        </Col>
                                        <Col xs={8} md={8}>
                                            <Card.Title>{data.value}</Card.Title>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        <Row className="p-3 pt-5">
                            <Col xs={6} md={6} style={{textAlign:"right"}}>
                                <Button variant="danger" onClick={(e) => deleteHandler(id)}>구매안함!</Button>
                            </Col>
                            <Col xs={6} md={6} style={{textAlign:"left"}}>
                                <Button onClick={(e) => wishDoneHandler(id)}>구매함!</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default Detail;