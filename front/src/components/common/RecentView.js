import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useEffect, useState} from "react";


const RecentView = (props) => {
    let copyRecent = [...props.recentItem];
    useEffect(()=>{
        copyRecent = JSON.parse(localStorage.getItem('watched'));
        props.setRecentItem(copyRecent);
    },[])




    return (
            <Container>
                <strong>최근 본 상품 리스트</strong>
                <Row>
                    {props.recentItem &&
                        props.recentItem.map((data,index) => {
                            return(
                            <RecentItem recentItem={data} shoes = {props.shoes} key={index}/>
                            )
                        })
                    }
                </Row>
            </Container>
    )
}

const RecentItem = ({recentItem,shoes}) => {
    let findData = shoes.find((data) => {
        return data.id == recentItem;
    })

    return(
        <Col>{findData.title}</Col>
    )
}
export default RecentView;