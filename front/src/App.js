/*eslint-disable*/
import {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios  from "axios";
import './App.css';

import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import ReactAudioPlayer from 'react-audio-player';

import loveSong from "./love.mp3";


function App() {
    const [history,setHistory]=useState([1,2,3])
    const [data,setData] =useState([])
    const [writeYn,setWriteYn] =useState(false)

  useEffect(() => {
    axios.get('/api/board/list')
        .then(res => {
          let boardList = [...res.data];
          setData(boardList);
        })
        .catch(err => console.log(err))
  },[])

  return (
    <div className="App">
        <div className="white">
            <strong >❤사랑하는 뽀둥이❤</strong>
            <strong>700일</strong>
        </div>
                <section className="slider container mb-3">
                    <Carousel>
                        {
                            history.map(x => {
                                return(
                                    <Carousel.Item className='slide'>
                                        <Card style={{ width: '100%' }}>
                                            <Card.Img variant="top"  src={`/img/test${x}.JPG`}/>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the
                                                    bulk of the card's content.
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                            </Card.Body>
                                        </Card>
                                    </Carousel.Item>
                                )
                            })
                        }


                    </Carousel>
                </section>
            <ReactAudioPlayer
                src={loveSong}
                autoPlay
                controls
            />
    </div>
  );

}


export default App;
