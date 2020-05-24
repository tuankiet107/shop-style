import React, { Component } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import AntMan from '../img/Ant-Man.png';
import AntManlogo from '../img/AntMan-logo.png';
import DeadPool from '../img/DeadPool.png';
import DeadPoollogo from '../img/Deadpool-logo.png';
import IronMan from '../img/IronMan.png';
import IronManlogo from '../img/IronMan-logo.png';
import CapTain from '../img/captain_marvel.png';
import CapTainlogo from '../img/CaptainMarvel-logo.png';
import SpiderMan from '../img/SpiderMan.png';
import SpiderManlogo from '../img/SpiderMan-logo.png';
import Thor from '../img/Thor.png';
import Thorlogo from '../img/Thor-logo.png';
import Venom from '../img/Venom.png';
import Venomlogo from '../img/Venom-logo.png';

class SlideSlick extends Component {
    render(){
        let settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
        };

        return(
        <Slider {...settings}>
            <div className="slider-slick">
                <div className="box">
                    <img alt="" src={AntMan} className="model" />
                    <div className="details">
                        <img alt="" src={AntManlogo} className="logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas corporis asperiores aut </p>
                    </div>
                </div>
            </div>
            <div className="slider-slick">
                <div className="box">
                    <img alt="" src={DeadPool} className="model" />
                    <div className="details">
                        <img alt="" src={DeadPoollogo} className="logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas corporis asperiores aut </p>
                    </div>
                </div>
            </div>
            <div className="slider-slick">
                <div className="box">
                    <img alt="" src={IronMan} className="model" />
                    <div className="details">
                        <img alt="" src={IronManlogo} className="logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas corporis asperiores aut </p>
                    </div>
                </div>
            </div>
            <div className="slider-slick">
                <div className="box">
                    <img alt="" src={CapTain} className="model" />
                    <div className="details">
                        <img alt="" src={CapTainlogo} className="logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas corporis asperiores aut </p>
                    </div>
                </div>
            </div> 
            <div className="slider-slick">
                <div className="box">
                    <img alt="" src={SpiderMan} className="model" />
                    <div className="details">
                        <img alt="" src={SpiderManlogo} className="logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas corporis asperiores aut </p>
                    </div>
                </div>
            </div> 
            <div className="slider-slick">
                <div className="box">
                    <img alt="" src={Thor} className="model" />
                    <div className="details">
                        <img alt="" src={Thorlogo} className="logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas corporis asperiores aut </p>
                    </div>
                </div>
            </div>
            <div className="slider-slick">
                <div className="box">
                    <img alt="" src={Venom} className="model" />
                    <div className="details">
                        <img alt="" src={Venomlogo} className="logo" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas corporis asperiores aut </p>
                    </div>
                </div>
            </div> 
        </Slider>
        )
    }
}

export default SlideSlick;
