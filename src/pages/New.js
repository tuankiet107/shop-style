import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addBasket } from '../actions/addAction';

import new1 from '../img/new/new1.webp';
import new2 from '../img/new/new2.webp';
import new3 from '../img/new/new3.webp';
import new4 from '../img/new/new4.jpg';
import new5 from '../img/new/new5.webp';
import new6 from '../img/new/new6.webp';

function New({addBasket}){
    // this is here to get all product from store
    let products = 
    [{
        id: "a20105e4-d876-453d-8a46-67ae409e2ad8",
        name: "Chocolate",
        image: new1,
        price: 10.00,
        numbers: 0,
        inCart: false,
        heart: false
    }, {
        id: "19d3b2aa-d3e2-446e-84b0-8667eebe355a",
        name: "Oakridge",
        image: new2,
        price: 20.00,
        numbers: 0,
        inCart: false,
        heart: false
    }, {
        id: "7a380483-e7bb-4f31-9b4c-60eca76de5bc",
        name: "Noodles",
        image: new3,
        price: 30.00,
        numbers: 0,
        inCart: false,
        heart: false
    }, {
        id: "2e571dc1-8492-486e-bdf8-e1d510cf8534",
        name: "BayLeaf",
        image: new4,
        price: 40.00,
        numbers: 0,
        inCart: false,
        heart: false
    }, {
        id: "2678270f-b040-458e-8116-a8c351455ef0",
        name: "Pastry",
        image: new5,
        price: 50.00,
        numbers: 0,
        inCart: false,
        heart: false
    }, {
        id: "bcbc1e58-47c7-430f-baaa-d594b28fe08d",
        name: "LongGrain",
        image: new6,
        price: 60.00,
        numbers: 0,
        inCart: false,
        heart: false
    }]

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
export default connect(null, { addBasket })(New);