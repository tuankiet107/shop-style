import React, { Component } from 'react';
import Slider from "react-slick";
import img1 from '../img/clothes/img1.png';
import img2 from '../img/clothes/img2.png';
import img3 from '../img/clothes/img3.png';

class Clothes extends Component {
    render(){
        let settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true
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
        <div className="product">
        <div className="title">Clothes</div>
        <Slider {...settings}>
                <div className="info-product">
                    <img alt="" src={img1} className="model" />
                    <div className="details">
                        <span>T-Shirt</span>
                        <span>$45.50</span>
                        <button className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
                <div className="info-product">
                    <img alt="" src={img2} className="model" />
                    <div className="details">
                        <span>T-Shirt</span>
                        <span>$45.50</span>
                        <button className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
                <div className="info-product">
                    <img alt="" src={img3} className="model" />
                    <div className="details">
                        <span>T-Shirt</span>
                        <span>$45.50</span>
                        <button className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
                <div className="info-product">
                    <img alt="" src={img1} className="model" />
                    <div className="details">
                        <span>T-Shirt</span>
                        <span>$45.50</span>
                        <button className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
                <div className="info-product">
                    <img alt="" src={img2} className="model" />
                    <div className="details">
                        <span>T-Shirt</span>
                        <span>$45.50</span>
                        <button className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
        </Slider>
        </div>
        )
    }
}

export default Clothes;