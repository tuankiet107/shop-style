import React, { Component } from 'react';
import Slider from "react-slick";

class Accessories extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    let products = [{
        "id": "83eccdfe-753c-41bb-99f8-69d42f3bf892",
        "name": "Photobug",
        "price": "$19.62",
        "image": "https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/99e1a716127b41d6bfb15a41dd976747_Large.png"
      }, {
        "id": "37f16990-6173-4789-b911-046bd3c75aab",
        "name": "Dabjam",
        "price": "$45.26",
        "image": "https://m.media-amazon.com/images/I/717ysJGdBIL._SR500,500_.jpg"
      }, {
        "id": "e40a2186-d52c-4a39-a24f-491801e50317",
        "name": "Fivespan",
        "price": "$45.73",
        "image": "https://www.dhresource.com/600x600/f2/albu/g10/M01/CD/09/rBVaVlzeHlGAE4pmAAGmNpC5DTg711.jpg"
      }, {
        "id": "9550e005-dc75-44f6-9dd9-79ea6466059c",
        "name": "Podcat",
        "price": "$34.62",
        "image": "https://image.dhgate.com/0x0s/f2-albu-g8-M00-A2-33-rBVaVFy3BPiAZFTLAAF2vRbHPuI885.jpg/deadpool-superhero-keyring.jpg"
      }, {
        "id": "a8cb4b55-4cdb-4cc4-9f59-84fa107df631",
        "name": "Trilith",
        "price": "$15.61",
        "image": "https://http2.mlstatic.com/iron-man-usb-20-flash-drive-de-almacenamiento-de-memoria-u-D_NQ_NP_692653-MLB31847775369_082019-F.webp"
      }, {
        "id": "5d9d0cb9-9aa2-4424-a0ce-bbb24e27719d",
        "name": "Jabbertype",
        "price": "$16.71",
        "image": "https://warriorfightstore.com/wp-content/uploads/2019/07/CapMarvel_shopIMG.png"
      }];

      this.setState({
        products
      })
  }

  addItem = (product) => {
    this.props.onAddItem(product);
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
                        <button className="btn btn-danger" onClick={ () => this.addItem(product)}>Add to cart</button>
                    </div>
                </div>
      })

      return(
      <div className="product">
        <div className="title">Accessories</div>
        <Slider {...settings}>
                
            {result}

        </Slider>
      </div>
      )
  }
}

export default Accessories;