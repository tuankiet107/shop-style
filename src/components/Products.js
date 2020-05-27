import React, { Component } from 'react';
import Clothes from './Clothes';
import Accessories from './Accessories';
import { Container } from 'react-bootstrap';


class Products extends Component {

  onAddItem = (product) => {
    this.props.onAddItem(product);
  }

  render() {
    return(
      <Container>
      
        <Clothes onAddItem={this.onAddItem} />

        <Accessories onAddItem={this.onAddItem} />

      </Container>
    )
  }
}

export default Products;
