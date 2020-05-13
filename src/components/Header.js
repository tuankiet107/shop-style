import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
} from 'reactstrap';


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleProduct = () => setDropdownOpen(prevState => !prevState);

  return (
    <Router>
      <Navbar color="light" light expand="md">
        <div href="/" className="logo">ShopStyle</div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="m-auto" navbar>
                <NavItem>
                    <Link to="/" className="nav-link"><span className="btn">Home</span></Link>
                </NavItem>
                <NavItem>
                    <Link to="/about" className="nav-link"><span className="btn">About Us</span></Link>
                </NavItem>
                
                <NavItem>
                    <Link to="" className="nav-link">
                        <span className="btn">Product</span>
                        <table className="type-product">
                            <tr>
                                <ul>
                                    <li><h3>TOP</h3></li>
                                    <li> <a href="#">Jackets</a> </li>
                                    <li> <a href="#">T-Shirts</a> </li>
                                    <li> <a href="#">Shirts</a> </li>
                                    <li> <a href="#">Sweaters & Cardigans</a> </li>
                                </ul>
                                <ul>
                                    <li><h3>BOTTOM</h3></li>
                                    <li> <a href="#">Jeans</a> </li>
                                    <li> <a href="#">Trousers </a> </li>
                                    <li> <a href="#">Swimwear</a> </li>
                                    <li> <a href="#">Swimwear</a> </li>
                                </ul>
                                <ul>
                                    <li><h3>CLOTHING</h3></li>
                                    <li> <a href="#">Top Wear</a> </li>
                                    <li> <a href="#">Party Wear</a> </li>
                                    <li> <a href="#">Bottom Wear</a> </li>
                                    <li> <a href="#">Indian Wear</a> </li>
                                </ul>
                                <ul>
                                    <li><h3>ACCESSORIES</h3></li>
                                    <li> <a href="#">Bags</a> </li>
                                    <li> <a href="#">Sunglasses</a> </li>
                                    <li> <a href="#">Fragrances</a> </li>
                                    <li> <a href="#">Wallets</a> </li>
                                </ul>
                            </tr>
                        </table>

                    </Link>
                </NavItem>

                <NavItem>
                    <Link to="/service" className="nav-link"><span className="btn">Our Service</span></Link>
                </NavItem>
                <NavItem>
                    <Link to="/contact" className="nav-link"><span className="btn">Contact Us</span></Link>
                </NavItem>
                <NavItem>
                    <span className="fas fa-search"></span>
                </NavItem>
                
          </Nav>
        </Collapse>
      </Navbar>

      {/* <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/about">
                <About />
            </Route>
            <Route path="/service">
                <Service />
            </Route>
            <Route path="/contact">
                <Contact />
            </Route>
        </Switch> */}
    </Router>
  );
}



export default Header;