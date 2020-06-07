import React, { Component } from 'react';

import axios from 'axios';

import {Container, Row, Col} from 'react-bootstrap';
import { addBasket } from '../actions/addAction';

class New extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  componentDidMount(){
    axios.get('https://5ed1c80d4e6d7200163a0b7e.mockapi.io/api/products-new')
    .then(res => {
        this.setState({
          products: res.data
        })
    })
    .catch(err => console.log(err))
  }

  render(){

    const {products} = this.state;

    let result = products.map((product,index) => {
      return  <div className="info-product" key={index}>
                  <img alt="" src={product.image} />
                  <div className="details">
                      <span>{product.name}</span>
                      <span>{product.price}.000đ</span>
                  </div>
                  <div className="overlay"></div>
                  <div onClick={ () => addBasket(product)} className="button">
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
}

export default New;