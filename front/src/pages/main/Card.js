/*eslint-disable*/
import {useNavigate} from "react-router-dom";


const Card = (props) => {
    let navigator = useNavigate();
        return(
                <div className="col-md-4" key={props.i} onClick={() => {navigator('/detail/'+props.shoes.id)}}>
                    <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
                    <h4>{props.shoes.title}</h4>
                    <p>{props.shoes.content}</p>
                    <p>{props.shoes.price}</p>
                </div>
        )
}
export default Card;