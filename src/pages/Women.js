import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

import girl1 from '../img/girls/img1.jpg';
import girl2 from '../img/girls/img2.webp';
import girl3 from '../img/girls/img3.webp';
import girl4 from '../img/girls/img4.webp';
import girl5 from '../img/girls/img5.jpg';
import girl6 from '../img/girls/img6.jpg';

function Women({addBasket}){
    // this is here to get all product from store
    let products = 
    [{
        id: "91e00493-6c62-4e1a-ad2c-54d380d2c904",
        name: "Kaymbo",
        price: 24.00,
        image: girl1,
        numbers: 0,
        inCart: false
      }, {
        id: "a5b8f2a3-83b5-4cbd-b1b0-4d422779b29a",
        name: "Realbuzz",
        price: 31.00,
        image: girl2,
        numbers: 0,
        inCart: false
      }, {
        id: "c1235be2-1c47-4ca2-aa21-18ef9435953b",
        name: "Photobug",
        price: 28.00,
        image: girl3,
        numbers: 0,
        inCart: false
      }, {
        id: "66b0908b-7846-4079-85a2-13d0dd155cbe",
        name: "Oyoyo",
        price: 48.00,
        image: girl4,
        numbers: 0,
        inCart: false
      }, {
        id: "35601403-06a5-439f-b90a-5e17909ba3da",
        name: "Photobean",
        price: 67.00,
        image: girl5,
        numbers: 0,
        inCart: false
      }, {
        id: "356sf03-061-439f-050a-3d0ddasfd",
        name: "Blackbean",
        price: 67.00,
        image: girl6,
        numbers: 0,
        inCart: false
      }
    ]

    let result = products.map((product,index) => {
        return  <div className="info-product" key={index}>
                    <img alt="" src={product.image} />
                    <div className="details">
                        <span>{product.name}</span>
                        <span>{product.price}.000đ</span>
                    </div>
                    <div className="overlay"></div>
                    <div onClick={ () => addBasket(product)} className="button"><a> Add to cart </a> </div>
                </div>
    })
    return(
        <div className="page-products">
            <div className="title">Women</div>
            <Container>
                <Row>
                    <Col xs={12}>
                        {result}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default connect(null, { addBasket })(Women);