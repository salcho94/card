/*eslint-disable*/
import './App.css';

import NavBar  from './pages/common/NavBar';
import MainList  from './pages/main/MainList';
import RecentView from './pages/common/RecentView';

import Footer from "./pages/common/Footer";
import About from "./pages/About";

import {Routes, Route, Link, Outlet} from 'react-router-dom'
import Error from "./pages/common/Error";
import {createContext, lazy, Suspense, useEffect, useState} from "react";
import data from "./data";


// 바로 로드할필요 없으니까 천천히 렌더링 하라는 함수 suspense 로딩중 보여줄 화면 지정
const Detail = lazy(() => import("./pages/detail/Detail.js"));
const MyPage = lazy(() => import("./pages/mypage/MyPage.js"));
const SignUpPage = lazy(() => import("./pages/member/SignUpPage.js"));
const SignInPage = lazy(() => import("./pages/member/SignInPage.js"));
const KakaoLogin = lazy(() => import("./pages/member/KakaoLogin.js"));
const NaverLogin = lazy(() => import("./pages/member/NaverLogin.js"));

function App() {

    const [shoes,setShoes] = useState(data)
    let [recentItem,setRecentItem] = useState([]);
    if(!localStorage.getItem('watched')){
        localStorage.setItem('watched', JSON.stringify( [] ))
    }


  return (

    <div className="wrapper">
        <NavBar />
       {/* <RecentView shoes ={shoes} setRecentItem = {setRecentItem} recentItem={recentItem}/>*/}
        <Suspense fallback={<div>loding...</div>}>
            <div className="contentWrapper">
                <Routes>
                    <Route path ="/" element={<MainList shoes={shoes} setShoes={setShoes}/>}/>
                    <Route path ="/detail/:id" element={<Detail shoes={shoes} />}/>
                    <Route path ="/MyPage" element={<MyPage/>}/>
                    <Route path ="/signup" element={<SignUpPage/>}/>
                    <Route path ="/signin" element={<SignInPage/>}/>
                    <Route path ="/kakaoLogin" element={<KakaoLogin/>}/>
                    <Route path ="/naverLogin" element={<NaverLogin/>}/>
                    <Route path ="/about" element={<About/>}/>
                    <Route path ="*" element={<Error/>}/>
                </Routes>
            </div>
        </Suspense>
        <Footer />
    </div>
  );
}

export default App;
