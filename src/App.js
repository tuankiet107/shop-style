import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/views/Home";
import Cart from "./components/pages/Cart";
import New from "./components/pages/New";
import Women from "./components/pages/Women";
import Men from "./components/pages/Men";
// import Details from './components/pages/Details';
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

import ListProduct from "./components/admin/ListProduct";
import AddProduct from "./components/admin/AddProduct";
import UpdateProduct from './components/admin/UpdateProduct';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/cart" component={Cart} />
          <Route path="/new" component={New} />
          <Route path="/women" component={Women} />
          <Route path="/men" component={Men} />
          {/* <Route path="/:detail" component={Details} /> */}

          <Route path="/listProduct" component={ListProduct} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/updateProduct" component={UpdateProduct} />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

function NotFound(){
  return <div className="not-found" >404 NOT FOUND</div>
}

export default App;
