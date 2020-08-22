import React, { Component } from 'react';
import Women from './Women';
import Men from './Men';


class Products extends Component {
  render() {
    return(
      <div className="container-fluid">
      
        <Women />

        <Men />

      </div>
    )
  }
}

export default Products;
