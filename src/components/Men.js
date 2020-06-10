import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { useDispatch } from 'react-redux'; // look like mapDispatchToProps 
import { ADD_PRODUCT_BASKET } from '../actions/types';

import axios from 'axios';
import { Link } from 'react-router-dom';

function Men() {
  
  const [products, setProducts] = useState([]);
    
  useEffect(() => {
    async function getApiProducts() {

        try {
          const response = await axios.get('https://5ed1c80d4e6d7200163a0b7e.mockapi.io/api/products');
          const data = response.data;
          setProducts(data[0].men);
          
        } catch (error) {
          console.log('Failed to fetch api: ', error);
        }

    }

    getApiProducts();
  }, []);

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
            }
          ]
      };

      const dispatch = useDispatch();
      
      let result = products.map((product,index) => {
        return <div className="info-product" key={index} >
                      <img alt="" src={product.image} />
                      <div className="details">
                          <span>{product.name}</span>
                          <span>${product.price}.00</span>
                      </div>
                      <Link to={{pathname: '/detail', state: { data: product}}}>
                        <div className="overlay"></div>
                      </Link>
                      <div onClick={ () => dispatch({type: ADD_PRODUCT_BASKET, payload: product})} className="button">
                        <a> Add to cart </a>
                      </div>
                </div>
      })

      return(
      <div className="product">
        <div className="title">Men</div>
        <Slider {...settings}>

           {result}
        
        </Slider>
      </div>
      )
}

export default Men;