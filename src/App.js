import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/views/Home";
import Cart from "./components/pages/Cart";
import Discount from "./components/pages/Discount";
import Women from "./components/pages/Women";
import Men from "./components/pages/Men";
import Checkout from "./components/pages/Checkout";
import Search from "./components/pages/Search";

import Product from "./components/pages/Product";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

import ListProduct from "./components/admin/ListProduct";
import AddProduct from "./components/admin/AddProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import ListOrder from "./components/admin/ListOrder";
import ListUser from "./components/admin/ListUser";
import Chat from "./components/admin/Chat";
import PrivateRoutes from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/cart" component={Cart} />
          <Route path="/discount" component={Discount} />
          <Route path="/women" component={Women} />
          <Route path="/men" component={Men} />
          <Route path="/search" component={Search} />
          <Route path="/product" component={Product} />

          <PrivateRoutes path="/list-product" component={ListProduct} />
          <PrivateRoutes path="/add-product" component={AddProduct} />
          <PrivateRoutes path="/update-product" component={UpdateProduct} />
          <PrivateRoutes path="/list-order" component={ListOrder} />
          <PrivateRoutes path="/list-user" component={ListUser} />
          <PrivateRoutes path="/list-chat" component={Chat} />

          <Route path="/checkouts" component={Checkout} />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

function NotFound() {
  return <div className="not-found">404 NOT FOUND</div>;
}

export default App;
