import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ADD_PRODUCT_BASKET } from '../actions/types';

function Men(){
    // this is here to get all product from store
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
            <div className="title">Men</div>
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

export default Men;