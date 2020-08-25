import React, { Component } from "react";

import { Link } from 'react-router-dom';

import Slides from "./Slides";
import NewNow from "./NewNow";
import Women from "./Women";
import Men from "./Men";
import Footer from './Footer';

class Products extends Component {
  render() {
    return (
      <div>
        <Slides />

        <NewNow />

        <Women />

        <Men />

        <Footer />

        <div className="footer-copyright">
            <p>
            All Rights Reserved. © 2020  
            <Link to="/"> The Kstore  </Link>
            Design By: Tuan Kiet
            </p>
        </div>
      </div>
    );
  }
}

export default Products;
