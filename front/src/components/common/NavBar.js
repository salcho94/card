/*eslint-disable*/
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useQuery} from "react-query"
import {useEffect} from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const NavBar = () => {
    let navigator = useNavigate();

    let result = useQuery('test',()=>
         axios.get(`https://codingapple1.github.io/userdata.json`)
         .then((res) => {  console.log('test'); return res.data} ),
        {staleTime:2000}
    )


    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={() => {navigator('/')}} >salcho</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {navigator('/')}}>Home</Nav.Link>
                        <Nav.Link onClick={() => {navigator('/cart')}}>Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="me-auto text-white">
                    {result.isLoading && "loding..." }
                    {result.error && "error" }
                    {result.data && result.data.name }
                </Nav>
            </Container>
        </Navbar>
        </>
    )
}

export default NavBar;