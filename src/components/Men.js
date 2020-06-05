import React, { Component } from 'react';
import Slider from "react-slick";
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

import img1 from '../img/boys/img1.webp';
import img2 from '../img/boys/img2.webp';
import img3 from '../img/boys/img3.webp';
import img4 from '../img/boys/img4.webp';
import img5 from '../img/boys/img5.webp';
import img6 from '../img/boys/img6.webp';

class Men extends Component {
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
      image: img1,
      numbers: 0,
      inCart: false,
    }, 
    {
      id: "37f16990-6173-4789-b911-046bd3c75aab",
      name: "Dabjam",
      price: 45.00,
      image: img2,
      numbers: 0,
      inCart: false
    }, 
    {
      id: "e40a2186-d52c-4a39-a24f-491801e50317",
      name: "Fivespan",
      price: 45.00,
      image: img3,
      numbers: 0,
      inCart: false
    },
    {
      id: "a8cb4b55-4cdb-4cc4-9f59-84fa107df631",
      name: "Trilith",
      price: 15.00,
      image: img4,
      numbers: 0,
      inCart: false
    },
    {
      id: "a84bfsaf-4casf-4cfas-9f00-fasfajsfassf",
      name: "Triple",
      price: 85.00,
      image: img5,
      numbers: 0,
      inCart: false
    },
    {
      id: "fasfasfsaf-jfj6u-4cfas-0100-1asf5sfas5",
      name: "Banana",
      price: 40.00,
      image: img6,
      numbers: 0,
      inCart: false
    }
  ];

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
          <div className="title">Men</div>
          <Slider {...settings}>

                {result}
          
          </Slider>
        </div>
        )
    }
}

export default connect(null, { addBasket })(Men);
