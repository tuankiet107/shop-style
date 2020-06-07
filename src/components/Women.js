import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

import axios from 'axios';

class Women extends Component {
    constructor(props){
      super(props);
      this.state = {
        products: []
      }
    }

    componentDidMount(){
        axios.get('https://5ed1c80d4e6d7200163a0b7e.mockapi.io/api/products-girl')
        .then(res => {
            this.setState({
              products: res.data
            })
        })
        .catch(err => console.log(err))
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

        let {products} = this.state;
    
        let result = products.map((product,index) => {
          return <div className="info-product" key={index}>
                      <img alt="" src={product.image} />
                      <div className="details">
                          <span>{product.name}</span>
                          <span>{product.price}.000đ</span>
                      </div>
                      <div className="overlay"></div>
                      <div onClick={ () => addBasket(product)} className="button">
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
}

export default connect(null, {addBasket} )(Women); // addBasket đã dispatch bên file addAction