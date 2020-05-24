import React, { Component } from 'react';
import Slider from "react-slick";
import img1 from '../img/accessories/img1.jpg';
import img2 from '../img/accessories/img2.jpg';
import img3 from '../img/accessories/img3.jpg';
import img4 from '../img/accessories/img4.jpg';

class Accessories extends Component {
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
        <div className="title">Accessories</div>
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
                    <img alt="" src={img4} className="model" />
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
        </Slider>
        </div>
        )
    }
}

export default Accessories;