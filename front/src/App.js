/*eslint-disable*/
import './App.css';

import NavBar  from './components/common/NavBar';
import MainList  from './components/main/MainList';
import RecentView from './components/common/RecentView';

import Footer from "./components/common/Footer";
import About from "./components/About";

import {Routes, Route, Link, Outlet} from 'react-router-dom'
import Error from "./components/common/Error";
import {createContext, lazy, Suspense, useEffect, useState} from "react";
import data from "./data";

// 바로 로드할필요 없으니까 천천히 렌더링 하라는 함수
const Detail = lazy(() => import("./components/detail/Detail.js"));
const Cart = lazy(() => import("./components/cart/Cart.js"));
function App() {


    const [shoes,setShoes] = useState(data)
    let [recentItem,setRecentItem] = useState([]);
    if(!localStorage.getItem('watched')){
        localStorage.setItem('watched', JSON.stringify( [] ))
    }


  return (

    <div className="App">
        <NavBar />
        <RecentView shoes ={shoes} setRecentItem = {setRecentItem} recentItem={recentItem}/>
        <Suspense fallback={<div>loding...</div>}>
        <Routes>
            <Route path ="/" element={<MainList shoes={shoes} setShoes={setShoes}/>}/>
            <Route path ="/detail/:id" element={<Detail shoes={shoes} />}/>
            <Route path ="/cart" element={<Cart/>}/>
            <Route path ="/about" element={<About/>}/>
            <Route path ="*" element={<Error/>}/>
        </Routes>
        </Suspense>
        <Footer />
    </div>
  );
}

export default App;
