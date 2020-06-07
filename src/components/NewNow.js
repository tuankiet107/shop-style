import React from 'react';
import  { useDispatch } from 'react-redux';
import { ENJOY_PRODUCT } from '../actions/types';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
        "id": "111111133333wfds",
        "name": "Steel",
        "price": 28,
        "image": "https://i.pinimg.com/564x/0e/c7/43/0ec7438397829070cf700e77751463c9.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "2vdcfdad2dasfasf",
        "name": "Rubber",
        "price": 57,
        "image": "https://i.pinimg.com/564x/09/9b/1c/099b1c6bb7288b65938d9e26c512dc84.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "fdfcxzcvzxv3",
        "name": "Fresh",
        "price": 31,
        "image": "https://i.pinimg.com/564x/fa/ea/1d/faea1d351e107c99ff353d6b53053d27.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "sfdgdhwgweg566y4",
        "name": "Granite",
        "price": 82,
        "image": "https://i.pinimg.com/564x/16/67/95/166795527d67b7b3c38ef2d7c7809d44.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "1545645641dsafsaf",
        "name": "Fresh",
        "price": 51,
        "image": "https://i.pinimg.com/564x/37/92/25/379225a034b69dc5ae7326b9c689b4fb.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "6sf514vc5vaa",
        "name": "Plastic",
        "price": 35,
        "image": "https://i.pinimg.com/564x/8e/c7/e2/8ec7e2cf9f091ec4c8a6cc0b27e5baba.jpg",
        "numbers": 0,
        "inCart": false,
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
                            <span onClick={() => dispatch({type: ENJOY_PRODUCT, payload: product})} className="far fa-heart"></span>
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
