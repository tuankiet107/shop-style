import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/views/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import New from './components/pages/New';
import Women from './components/pages/Women';
import Men from './components/pages/Men';
import Details from './components/pages/Details';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Footer from './components/views/Footer';

function App(){
    return(
        <Router>
            <div>
                <Header />

                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/new" component={New} />
                  <Route path="/women" component={Women} />
                  <Route path="/men" component={Men} />
                  <Route path="/:detail" component={Details} />
                </Switch>

                <Footer />

                <div className="footer-copyright">
                    <p>
                    All Rights Reserved. © 2020  
                    <Link to="/"> The Kstore  </Link>
                    Design By: Tuan Kiet
                    </p>
                </div>

            </div>
        </Router>
    )
}

export default App;