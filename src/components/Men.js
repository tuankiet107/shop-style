import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

import axios from 'axios';

class Men extends Component {
    constructor(props){
      super(props);
      this.state = {
        products: []
      }
    }

    componentDidMount(){
        // axios.patch('https://5ed1c80d4e6d7200163a0b7e.mockapi.io/api/products')
        // .then(res => {
        //     this.setState({
        //       products: res.data
        //     })
        // })
        // .catch(err => console.log(err))

        let products = 
        [
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
          },
          {
            "id": "7",
            "name": "name 7",
            "price": 63,
            "image": "image 7",
            "numbers": 71,
            "inCart": false
          }
        ]

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

export default connect(null, {addBasket} )(Men); // addBasket đã dispatch bên file addAction