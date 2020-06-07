import React from 'react';
import  { useDispatch } from 'react-redux';
import { ENJOY_PRODUCT } from '../actions/types';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import new1 from '../img/new/new1.webp';
import new2 from '../img/new/new2.webp';
import new3 from '../img/new/new3.webp';
import new4 from '../img/new/new4.jpg';
import new5 from '../img/new/new5.webp';
import new6 from '../img/new/new6.webp';

function NewNow(){
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 0,
        responsive: [
            {
            breakpoint: 1324,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
            },
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
                initialSlide: 0
            }
            }
        ]
    };

    let products = 
    [{
        "id": "a20105e4-d876-453d-8a46-67ae409e2ad8",
        "name": "Chocolate",
        "image": new1,
        "price": 10,
        "heart": false
    }, {
        "id": "19d3b2aa-d3e2-446e-84b0-8667eebe355a",
        "name": "Red Oakridge",
        "image": new2,
        "price": 20,
        "heart": false
    }, {
        "id": "7a380483-e7bb-4f31-9b4c-60eca76de5bc",
        "name": "Noodles",
        "image": new3,
        "price": 30,
        "heart": false
    }, {
        "id": "2e571dc1-8492-486e-bdf8-e1d510cf8534",
        "name": "Bay Leaf",
        "image": new4,
        "price": 40,
        "heart": false
    }, {
        "id": "2678270f-b040-458e-8116-a8c351455ef0",
        "name": "Pastry",
        "image": new5,
        "price": 50,
        "heart": false
    }, {
        "id": "bcbc1e58-47c7-430f-baaa-d594b28fe08d",
        "name": "Long Grain",
        "image": new6,
        "price": 60,
        "heart": false
    }]

    const dispatch = useDispatch();

    let result = products.map((product,index) => {
        return  <div className="box" key={index}>
                    <div className="image">
                        <img alt="" src={product.image} />
                    </div>
                    <div className="details">
                            <span className="name">{product.name}</span>
                            <span className="price">{product.price}.000đ</span>
                            <span onClick={() => dispatch({type: ENJOY_PRODUCT, payload: product})} 
                                  className={(product.heart === false) ? "far fa-heart" : "far fa-heart set-color"}>
                            </span>
                    </div>
                </div>
    })
    
    return(
    <div className="newnow">
        <div className="title">
            <h2>New Now</h2>
        </div>
        <Slider {...settings}>
            {result}
        </Slider>
    </div>
    )
}

export default NewNow;
