import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Slides from './components/Slides';

class App extends Component {

  render() {
    return(
      <div>
          <header className="main-header">
            <Header />
          </header>

          <Slides />

      </div>
    )
  }
}

export default App;
