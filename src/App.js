import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App(){
    return(
        <Router>
            <div>
                <Header />

                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/cart" component={Cart} />
                </Switch>

            </div>
        </Router>
    )
}


export default App;
