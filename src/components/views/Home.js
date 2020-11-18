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
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (document.getElementById("backToTop")) {
        if (
          document.body.scrollTop > 300 ||
          document.documentElement.scrollTop > 300
        ) {
          document.getElementById("backToTop").style.display = "block";
        } else {
          document.getElementById("backToTop").style.display = "none";
        }
      }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

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

        <div onClick={topFunction} id="backToTop">
          <i className="fas fa-arrow-up"></i>
        </div>
      </div>
    );
  }
}

export default Products;
