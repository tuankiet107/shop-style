import React from 'react';
import  { useDispatch, useSelector } from 'react-redux';
import { ENJOY_PRODUCT } from '../../actions/types';

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

    const products = useSelector(state => state.enjoyState.products);

    const dispatch = useDispatch();

    let result = products.map((product,index) => {
        return  <div className="box" key={index}>
                    <div className="image">
                        <img alt="" src={product.image} />
                    </div>
                    <div className="details">
                        <span className="name">{product.name}</span>
                        <span className="price">{product.price}.000đ</span>
                        <span 
                            onClick={() => dispatch({type: ENJOY_PRODUCT, payload: product})} 
                            className={(product.heart === true) ? 'like fas fa-heart' : 'fas fa-heart'}>
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
