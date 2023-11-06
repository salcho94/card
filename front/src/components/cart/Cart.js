import Table from 'react-bootstrap/Table';
import {useDispatch, useSelector} from "react-redux";
import {plusCount, minusCount, deleteCart} from "../../store/cart";
import {changeName} from "../../store/user";
import Button from "react-bootstrap/Button";
import {memo, useMemo, useState} from "react";

// memo 사용법
const Child = memo(({count}) => {
    console.log('replay')
    console.log(count)
    return <div>자식임</div>
})

const Cart = () => {
    //useMemo 사용법 최초에 한번만 실행한다.(렌더링시) 차이점 useEffect => 렌더링 후
    //let result = useMemo(() => {return 무거운함수()},[state])
    let user = useSelector((state) => state.user);
    let cart = useSelector((state) => state.cart);
    let dispatch = useDispatch()
// memo 사용법
//    let [count,setCount] = useState(0);

    return (
        <div>
            <div style={{padding:"50px"}}>
                <h1>{user} 님의 장바구니</h1><button onClick={() =>{dispatch(changeName('se'))}}>full name</button>
                {/*<Child count ={count}></Child>
                <button onClick={() => setCount(count+1)}>++</button>*/}
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody>
                {
                    cart.map((data,index) =>
                        <tr key={index}>
                            <td></td>
                            <td>{data.title}</td>
                            <td>{data.count}</td>
                            <td>
                                <button onClick={() =>{dispatch(plusCount(data.id))}}>+</button>
                                <button onClick={() =>{dispatch(minusCount(data.id))}}>-</button>
                            </td>
                            <td><Button variant="danger" onClick={() =>{dispatch(deleteCart(index))}}>삭제</Button></td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;