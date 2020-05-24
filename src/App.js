import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Slides from './components/Slides';
import Products from './components/Products';
import SlideSlick from './components/SlideSlick';
import Footer from './components/Footer';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cart: 0
    }
  }

  render() {
    return(
      <div>
          <header className="main-header">
            <Header />
          </header>

          <div className="main-slides">
            <Slides />
          </div>

          <div className="container">
            <SlideSlick />
          </div>

          <Products />

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
