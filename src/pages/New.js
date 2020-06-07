import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ADD_PRODUCT_BASKET } from '../actions/types';

function New(){
    // this is here to get all product from store
    let products = 
    [{
        "id": "111111133333wfds",
        "name": "Steel",
        "price": 28,
        "image": "https://i.pinimg.com/564x/0e/c7/43/0ec7438397829070cf700e77751463c9.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "2vdcfdad2dasfasf",
        "name": "Rubber",
        "price": 57,
        "image": "https://i.pinimg.com/564x/09/9b/1c/099b1c6bb7288b65938d9e26c512dc84.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "fdfcxzcvzxv3",
        "name": "Fresh",
        "price": 31,
        "image": "https://i.pinimg.com/564x/fa/ea/1d/faea1d351e107c99ff353d6b53053d27.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "sfdgdhwgweg566y4",
        "name": "Granite",
        "price": 82,
        "image": "https://i.pinimg.com/564x/16/67/95/166795527d67b7b3c38ef2d7c7809d44.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "1545645641dsafsaf",
        "name": "Fresh",
        "price": 51,
        "image": "https://i.pinimg.com/564x/37/92/25/379225a034b69dc5ae7326b9c689b4fb.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "6sf514vc5vaa",
        "name": "Plastic",
        "price": 35,
        "image": "https://i.pinimg.com/564x/8e/c7/e2/8ec7e2cf9f091ec4c8a6cc0b27e5baba.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      }]

    const dispatch = useDispatch();

    let result = products.map((product,index) => {
        return  <div className="info-product" key={index}>
                    <img alt="" src={product.image} />
                    <div className="details">
                        <span>{product.name}</span>
                        <span>{product.price}.000đ</span>
                    </div>
                    <div className="overlay"></div>
                    <div onClick={ () => dispatch({type: ADD_PRODUCT_BASKET, payload: product})} className="button">
                        <a> Add to cart </a> 
                    </div>
                </div>
    })
    return(
        <div className="page-products">
            <div className="title">New</div>
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
export default New;