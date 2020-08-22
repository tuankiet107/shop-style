import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ADD_PRODUCT_BASKET } from '../../actions/types';

function Details({location}){
        
    const { data } = location.state;
    console.log(data)
    const dispatch = useDispatch();
        
    return (
        <div className="productDetail-page">
        <Container>
            <Row className="product-detail-wrapper">
                <Col lg="7" md="12" sm="12" xs="12" id="image-product">
                    <img src={data.image} alt="" />
                </Col>
                
                <Col lg="5" md="12" sm="12" xs="12" id="detail-product">
                    <div className="product-title">
                        <h1>{data.name}</h1>
                        <span>SKU: {data.id}</span>
                    </div>
                    <div className="product-price">Price: {data.price}.000đ</div>
                    <div onClick={ () => dispatch({type: ADD_PRODUCT_BASKET, payload: data})} className="btn btn-primary">
                        <span> Add to cart </span>
                    </div>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Details
