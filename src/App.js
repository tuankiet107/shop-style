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
import New from './pages/New';
import Women from './pages/Women';
import Men from './pages/Men';

function App(){
    return(
        <Router>
            <div>
                <Header />

                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/new" component={New} />
                  <Route path="/women" component={Women} />
                  <Route path="/men" component={Men} />
                </Switch>

            </div>
        </Router>
    )
}


export default App;
