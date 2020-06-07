import React from 'react';
import Slider from "react-slick";
import { useDispatch } from 'react-redux'; // look like mapDispatchToProps 
import { ADD_PRODUCT_BASKET } from '../actions/types';

function Men() {

    let products = [
      {
        "id": "1faskfjasf",
        "name": "name 1",
        "price": 51,
        "image": "https://i.pinimg.com/564x/83/9f/d3/839fd3f0d22c6eea27d1ccaa77bb722e.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "2fasfasggd",
        "name": "name 2",
        "price": 30,
        "image": "https://i.pinimg.com/564x/2e/aa/dd/2eaadd83a29543bfed7a920280c94818.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "3bvbfhfhfdaf",
        "name": "name 3",
        "price": 26,
        "image": "https://i.pinimg.com/564x/aa/6d/83/aa6d83808165fb25e0b8a1d958cda5e6.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "4fasfsfewsay",
        "name": "name 4",
        "price": 69,
        "image": "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67050513_99.jpg?ts=1573828488276&imwidth=508&imdensity=2",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "5fasfy575iuka",
        "name": "name 5",
        "price": 20,
        "image": "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67010505_37.jpg?ts=1576488844293&imwidth=508&imdensity=2",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "6a45651asafsas",
        "name": "name 6",
        "price": 32,
        "image": "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67000588_99.jpg?ts=1574681709606&imwidth=508&imdensity=2",
        "numbers": 0,
        "inCart": false
      }
  ];

      let settings = {
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
        return <div className="info-product" key={index}>
                    <img alt="" src={product.image} />
                    <div className="details">
                        <span>{product.name}</span>
                        <span>${product.price}.00</span>
                    </div>
                    <div className="overlay"></div>
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