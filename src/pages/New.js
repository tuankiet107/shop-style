import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ADD_PRODUCT_BASKET } from '../actions/types';

import axios from 'axios';

function New() {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
      async function getApiProducts() {

          try {
            const response = await axios.get('https://5ed1c80d4e6d7200163a0b7e.mockapi.io/api/products');
            const data = response.data;
            setProducts(data[2].new);
            
          } catch (error) {
            console.log('Failed to fetch api: ', error);
          }
      }

      getApiProducts();
    }, []);

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