import Nav from 'react-bootstrap/Nav';
import {useEffect, useState} from "react";


function DetailTab(props) {

    let [tab,setTap] = useState(0);

    return (
        <div>
        <Nav variant="underline" defaultActiveKey="/tab1">
            <Nav.Item>
                <Nav.Link eventKey="/tab1" onClick={(e) => {setTap(0)}}>Option 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/tab2"  onClick={(e) => {setTap(1)}}>Option 2</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/tab3"  onClick={(e) => {setTap(2)}}>Option 3</Nav.Link>
            </Nav.Item>
        </Nav>
            <TabContent tab={tab}   shose ={props.shose}/>
        </div>
    )
}

let Tab1 = ({shose}) => {return( <div>{shose.title}</div>)}
let Tab2 = () => {return( <div>tab2</div>)}
let Tab3 = () => {return( <div>tab3</div>)}
let TabContent = ({tab,shose}) =>{
    let [fade,setFade] = useState('');

    useEffect(()=>{
        let showFade = setTimeout(()=>{setFade('end')},200)
        return () => {
            clearTimeout(showFade);
            setFade('');
        }
    },[tab])
    return (
        <div className={`start ${fade}`}>
            {
                [<Tab1 shose = {shose}/>,<Tab2/>,<Tab3/>][tab]
            }
        </div>
    )

}








export default DetailTab;