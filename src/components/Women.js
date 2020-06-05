import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

import img1 from '../img/girls/img1.jpg';
import img2 from '../img/girls/img2.webp';
import img3 from '../img/girls/img3.webp';
import img4 from '../img/girls/img4.webp';
import img5 from '../img/girls/img5.jpg';
import img6 from '../img/girls/img6.jpg';

class Clothes extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    let products = [
      {
        id: "91e00493-6c62-4e1a-ad2c-54d380d2c904",
        name: "Kaymbo",
        price: 24.00,
        image: img1,
        numbers: 0,
        inCart: false
      }, {
        id: "a5b8f2a3-83b5-4cbd-b1b0-4d422779b29a",
        name: "Realbuzz",
        price: 31.00,
        image: img2,
        numbers: 0,
        inCart: false
      }, {
        id: "c1235be2-1c47-4ca2-aa21-18ef9435953b",
        name: "Photobug",
        price: 28.00,
        image: img3,
        numbers: 0,
        inCart: false
      }, {
        id: "66b0908b-7846-4079-85a2-13d0dd155cbe",
        name: "Oyoyo",
        price: 48.00,
        image: img4,
        numbers: 0,
        inCart: false
      }, {
        id: "35601403-06a5-439f-b90a-5e17909ba3da",
        name: "Photobean",
        price: 67.00,
        image: img5,
        numbers: 0,
        inCart: false
      }, {
        id: "356sf03-061-439f-050a-3d0ddasfd",
        name: "Blackbean",
        price: 67.00,
        image: img6,
        numbers: 0,
        inCart: false
      }];

      this.setState({
        products
      })

  }

    render(){
        let settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
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

        let {products} = this.state;
        let {addBasket} = this.props;
        
        let result = products.map((product,index) => {
          return <div className="info-product" key={index}>
                      <img alt="" src={product.image} />
                      <div className="details">
                          <span>{product.name}</span>
                          <span>${product.price}</span>
                      </div>
                      <div className="overlay"></div>
                      <div onClick={ () => addBasket(product)} className="button"><a> Add to cart </a> </div>
                  </div>
        })

        return(
        <div className="product">
          <div className="title">Women</div>
          <Slider {...settings}>

                {result}
          
          </Slider>
        </div>
        )
    }
}

export default connect(null, { addBasket })(Clothes);