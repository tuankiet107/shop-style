import React, { Component } from 'react';
import Slider from "react-slick";

class Clothes extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    let products = [{
        "id": "91e00493-6c62-4e1a-ad2c-54d380d2c904",
        "name": "Kaymbo",
        "price": "$24.35",
        "image": "https://s1.thcdn.com/productimg/1600/1600/11676398-1394552253457309.png"
      }, {
        "id": "a5b8f2a3-83b5-4cbd-b1b0-4d422779b29a",
        "name": "Realbuzz",
        "price": "$31.64",
        "image": "https://www.pngkit.com/png/full/439-4395154_superhero-work-out-clothing-superman-batman-ironman-avengers.png"
      }, {
        "id": "c1235be2-1c47-4ca2-aa21-18ef9435953b",
        "name": "Photobug",
        "price": "$28.31",
        "image": "https://s1.thcdn.com/productimg/1600/1600/11676434-1924552259011185.png"
      }, {
        "id": "66b0908b-7846-4079-85a2-13d0dd155cbe",
        "name": "Oyoyo",
        "price": "$48.40",
        "image": "https://www.pngkit.com/png/full/439-4395154_superhero-work-out-clothing-superman-batman-ironman-avengers.png"
      }, {
        "id": "35601403-06a5-439f-b90a-5e17909ba3da",
        "name": "Photobean",
        "price": "$67.77",
        "image": "https://i.pinimg.com/originals/17/d6/46/17d646c165b87504fe32d61a5af51423.png"
      }, {
        "id": "bfdb8bff-f0bc-411f-ba35-0fe8f8f2e173",
        "name": "Vitz",
        "price": "$73.16",
        "image": "https://s1.thcdn.com/productimg/1600/1600/11676434-1924552259011185.png"
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
        
        let result = products.map((product,index) => {
          return <div className="info-product" key={index}>
                      <img alt="" src={product.image} className="model" />
                      <div className="details">
                          <span>{product.name}</span>
                          <span>{product.price}</span>
                          <button className="btn btn-danger" onClick={this.addItem}>Add to cart</button>
                      </div>
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

export default Clothes;