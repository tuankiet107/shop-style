import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header';
import Slides from './components/Slides';
import Products from './components/Products';
import SlideSlick from './components/SlideSlick';
import Footer from './components/Footer';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cartQty: 0,
      products: []
    }
  }

  onAddItem = (product) => {
    let {cartQty,products} = this.state;
    products = [];

      this.setState({
        cartQty: cartQty + 1,
        products: products.push(product)
      })

    localStorage.setItem('products', JSON.stringify(products));
  }

  render() {
    return(
      <div>
          <header className="main-header">
            <Header cartQty={this.state.cartQty} products={this.state.products} />
          </header>

          <div className="main-slides">
            <Slides />
          </div>

          <div className="container">
            <SlideSlick />
          </div>

          <Products onAddItem={this.onAddItem} />

          <footer>
            <Footer />
          </footer>

          <div className="footer-copyright">
              <p>
                All Rights Reserved. © 1999  
                <a href="/home"> The ShopStyle  </a>
                Design By: 
                <a href="/home"> Tuan Kiet</a>
              </p>
          </div>
      </div>
    )
  }
}

export default App;
