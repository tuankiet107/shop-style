import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';


class App extends Component {
  render() {
    return(
      <div>
          <header className="main-header">
            <Header />
          </header>
          
          <div className="main-body">
              <div className="slides-shop">
                  <img src="" alt="" />
              </div>
          </div>

      </div>
    )
  }
}

export default App;
