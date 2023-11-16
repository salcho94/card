import {useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import {getWishCode,wishSubmit} from '../../apis/wish/WishListApi'
import Container from 'react-bootstrap/Container';
import InputGroup from "react-bootstrap/InputGroup";
import defaultImg from "../../img/default.png";

const CreateWishList = () =>{
    let user = useSelector(state =>{
        return state.user
    })
    const [imgFileView, setImgFileView] = useState("");
    const [wishCate, setWishCate] = useState("1");
    const [resImg, setResImg] = useState("");
    const [wishTitle, setWishTitle] = useState("");
    const [wishLink, setWishLink] = useState("");
    const [wishPrice, setWishPrice] = useState("");
    const [wishReason, setWishReason] = useState("");
    const [wishCode,setWishCode] = useState([{codeId:'',cateName:''}])
    const imgRef = useRef();

    useEffect(()=>{
        getWishCode().then((res) => {
                setWishCode(res);
        });

    },[])

    const saveWishCate = (e) =>{
        setWishCate(e.target.value);
    }
    const saveWishTitle = (e) =>{
        setWishTitle(e.target.value);
    }
    const saveWishLink = (e) =>{
        setWishLink(e.target.value);
    }
    const saveWishPrice = (e) =>{
        setWishPrice( e.target.value.replace(/[^0-9]/g,''));
    }
    const saveWishReason = (e) =>{
        setWishReason(e.target.value);
    }

    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFileView(reader.result);
        };
    };
    useEffect(()=>{

    },[resImg])
    const submitWish = () =>{
        if(!wishTitle){
            alert("상품명을 입력해 주세요");
        }else if(!wishPrice){
            alert("상품가격을 입력해 주세요");
        }else{
            if(window.confirm("상품을 추가하시겠습니까?")){
                const formData = new FormData;
                if(imgRef.current.files[0]){
                    formData.append('imgFile', imgRef.current.files[0]);
                }
                formData.append('memberId',user.userId);
                formData.append('wishSiteLink',wishLink);
                formData.append('wishItemPrice',wishPrice);
                formData.append('wishItemTitle',wishTitle);
                formData.append('wishItemCate',wishCate);
                formData.append('wishReason',wishReason);

                wishSubmit(formData).then((res)=>{
                    alert(res.data.msg);
                    window.location.reload();
                })
            }
        }

    }
    return(
        <>
            <img
                src={imgFileView ? imgFileView : defaultImg}
                alt="상품 이미지"
                style={{  height: "330px", width: "auto", padding: "30px"}}
            />
            <Container className="p-5">
                <InputGroup className="mb-3">
                    <Form.Control
                        type="file"
                        placeholder="상품 이미지 파일을 등록해 주세요"
                        accept="image/*"
                        id="wishImg"
                        onChange={saveImgFile}
                        ref={imgRef}
                    />
                    <InputGroup.Text><strong>상품 이미지</strong></InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text><strong>상품 카테고리</strong></InputGroup.Text>
                    <Form.Select aria-label="카테고리를 선택해 주세요" onChange={(e)=>{saveWishCate(e)}}>
                        {
                            wishCode.map((data,i)=> {
                                return(
                                    <option key={i} value={data.cateId}>{data.cateName}</option>
                                )
                            })
                        }
                    </Form.Select>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text><strong>상품명 💥</strong></InputGroup.Text>
                    <Form.Control
                        onChange={(e)=>{saveWishTitle(e)}}
                        placeholder="상품의 이름을 등록해 주세요"
                        aria-label="NickName"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text><strong>상품 링크</strong></InputGroup.Text>
                    <Form.Control
                        onChange={(e)=>{saveWishLink(e)}}
                        placeholder="상품의 구매 링크를 등록해 주세요"
                        aria-label="NickName"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text><strong>상품 가격 💥</strong></InputGroup.Text>
                    <Form.Control
                        onKeyUp={(e) =>{e.target.value = e.target.value.replace(/[^0-9]/g,'')}}
                        onChange={(e)=>{saveWishPrice(e)}}
                        placeholder="상품의 가격을 등록해 주세요( 숫자만 입력 가능합니다.)"
                        aria-label="NickName"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Text ><strong>구매 희망 이유</strong></InputGroup.Text>
                    <Form.Control
                        onChange={(e)=>{saveWishReason(e)}}
                        placeholder="구매를 희망하는 이유를 등록해 주세요"
                        aria-label="NickName"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button className="align-content-center" variant="secondary" onClick={submitWish} >업로드</Button>
            </Container>
        </>
    )
}



export default CreateWishList;