import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

class Accessories extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    let products = [
    {
      id: "83eccdfe-753c-41bb-99f8-69d42f3bf892",
      name: "Photocat",
      price: 19.00,
      image: "https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/99e1a716127b41d6bfb15a41dd976747_Large.png",
      numbers: 0,
      inCart: false,
    }, 
    {
      id: "37f16990-6173-4789-b911-046bd3c75aab",
      name: "Dabjam",
      price: 45.00,
      image: "https://m.media-amazon.com/images/I/717ysJGdBIL._SR500,500_.jpg",
      numbers: 0,
      inCart: false
    }, 
    {
      id: "e40a2186-d52c-4a39-a24f-491801e50317",
      name: "Fivespan",
      price: 45.00,
      image: "https://www.dhresource.com/600x600/f2/albu/g10/M01/CD/09/rBVaVlzeHlGAE4pmAAGmNpC5DTg711.jpg",
      numbers: 0,
      inCart: false
    },
    {
      id: "a8cb4b55-4cdb-4cc4-9f59-84fa107df631",
      name: "Trilith",
      price: 15.00,
      image: "https://http2.mlstatic.com/iron-man-usb-20-flash-drive-de-almacenamiento-de-memoria-u-D_NQ_NP_692653-MLB31847775369_082019-F.webp",
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

        let {products} = this.state;
        let {addBasket} = this.props;
        
        let result = products.map((product,index) => {
          return <div className="info-product" key={index}>
                      <img alt="" src={product.image} />
                      <div className="details">
                          <span>{product.name}</span>
                          <span>${product.price}.00</span>
                      </div>
                      <div className="overlay"></div>
                      <div onClick={ () => addBasket(product)} className="button"><a> Add to cart </a> </div>
                  </div>
        })

        return(
        <div className="product">
          <div className="title">Clothes</div>
          <Slider {...settings}>

                {result}
          
          </Slider>
        </div>
        )
    }
}

export default connect(null, { addBasket })(Accessories);