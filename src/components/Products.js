import React, { Component } from 'react';
import Clothes from './Clothes';
import Accessories from './Accessories';
import { Container } from 'react-bootstrap';


class Products extends Component {
  render() {
    return(
      <Container>
      
        <Clothes />

        <Accessories />

      </Container>
    )
  }
}

export default Products;
