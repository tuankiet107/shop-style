import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Slides from './components/Slides';
import Products from './components/Products';

class App extends Component {

  render() {
    return(
      <div>
          <header className="main-header">
            <Header />
          </header>

          <div className="main-slides">
            <Slides />
          </div>

          <Products />

      </div>
    )
  }
}

export default App;
