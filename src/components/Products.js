import React, { Component } from 'react';
import SlideSlick from './SlideSlick';
import Product from './Product';
import { Container } from 'react-bootstrap';


class Products extends Component {
  render() {


    return(
      <Container>

        <SlideSlick />

        <Product />

      </Container>
    )
  }
}

export default Products;
