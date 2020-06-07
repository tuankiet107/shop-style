import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ADD_PRODUCT_BASKET } from '../actions/types';

function Women(){
    // this is here to get all product from store
    let products = 
    [{
      "id": "tttttttegfa1",
      "name": "Shirt",
      "price": 4,
      "image": "https://i.pinimg.com/564x/dc/fb/a2/dcfba2a3c0f7f2e4285feb48efb36f26.jpg",
      "numbers": 0,
      "inCart": false
    },
    {
      "id": "24444444tget",
      "name": "Shoes",
      "price": 46,
      "image": "https://i.pinimg.com/564x/a9/36/3f/a9363f3ff0c628426d68180d1e60d39f.jpg",
      "numbers": 0,
      "inCart": false
    },
    {
      "id": "3hhhhhhhhhhhsgf",
      "name": "Bacon",
      "price": 89,
      "image": "https://i.pinimg.com/564x/cf/fe/2a/cffe2a099ff419f869790fb5843f3efe.jpg",
      "numbers": 0,
      "inCart": false
    },
    {
      "id": "4777777775yy5g",
      "name": "Soap",
      "price": 42,
      "image": "https://i.pinimg.com/564x/ab/53/55/ab5355be225cd517d28be0de023d3871.jpg",
      "numbers": 0,
      "inCart": false
    },
    {
      "id": "5assssssds",
      "name": "Cheese",
      "price": 19,
      "image": "https://i.pinimg.com/564x/ef/4e/0b/ef4e0b760a19b6a5404f92c57a19cdaf.jpg",
      "numbers": 0,
      "inCart": false
    },
    {
      "id": "6sssssssssffffffffsf",
      "name": "Soap",
      "price": 24,
      "image": "https://i.pinimg.com/564x/06/ae/16/06ae1616d931fc54011f3012edb5dc3c.jpg",
      "numbers": 0,
      "inCart": false
    }
    ];

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

export default Women;