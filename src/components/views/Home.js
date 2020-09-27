import React, { Component } from "react";
import { Link } from "react-router-dom";
import Discount from "./Discount";
import Footer from "./Footer";
import Header from "./Header";
import Men from "./Men";
import Slides from "./Slides";
import Women from "./Women";
import Chat from "./Chat";

class Products extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  }

  render() {
    return (
      <div className="home-page">
        <Chat />

        <Header />

        <Slides />

        <Discount />

        <Women />

        <Men />

        <Footer />

        <div className="footer-copyright">
          <p>
            All Rights Reserved. © 2020
            <Link to="/"> The Kstore </Link>
            Design By: Tuan Kiet
          </p>
        </div>
      </div>
    );
  }
}

export default Products;
