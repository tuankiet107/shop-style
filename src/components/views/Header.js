import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { RESET_BASKET } from '../../actions/types';

function Header() {
  const history = useHistory();
  const basket = useSelector((state) => state.basketState);
  const favorites = useSelector((state) => state.enjoyState);
  const dispatch = useDispatch();

  const [user, setUser] = useState('');

  useEffect(() => {
    async function fetchDataFromForm(){
      setUser(localStorage.getItem('user'))
    }
    fetchDataFromForm();
  })

  function handleChangeFromSearch() {}

  function handleSubmitFromSearch() {}

  function logOut() {
    dispatch({
        type: RESET_BASKET
    })
    localStorage.removeItem("user");
    history.push("/");
  }

  function logIn() {
    history.push("/login");
  }

  console.log('Render Header');
  
  return (
    <header>
      <Container
        fluid
        style={{
          position: "fixed",
          top: "0",
          zIndex: "99999",
          width: "100%",
        }}
      >
        <Row>
          <Navbar expand="lg">
            <div className="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-2">
              <Link
                to="/"
                style={{
                  fontFamily: "fantasy",
                  fontSize: "2rem",
                  color: "black",
                }}
              >
                Kstore
              </Link>
            </div>

            <Navbar.Toggle aria-controls="responsive-navbar-nav col-10" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                <Nav className="main-menu">
                  <Nav.Item>
                    <Link to="/new" className="nav-link">
                      New
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/women" className="nav-link">
                      Women
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/men" className="nav-link">
                      Men
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <a href="#contact" className="nav-link">
                      Contact Us
                    </a>
                  </Nav.Item>
                </Nav>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="fix-card">
                  <form onSubmit={handleSubmitFromSearch}>
                    <input
                      placeholder="Search products"
                      className="input-val"
                      onChange={handleChangeFromSearch}
                    />
                    <div className="search-icon" onClick={handleSubmitFromSearch}>
                      <i className="fas fa-search"></i>
                    </div>
                  </form>

                  <div className="favorit-items">
                    <i className="far fa-heart">
                      <span className="badge">{favorites.heartNumber}</span>
                    </i>
                  </div>

                  <div className="shopping-card">
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart">
                        <span className="badge">{basket.basketNumbers}</span>
                      </i>
                    </Link>
                  </div>

                  { user ? (
                    <button className="btn" onClick={logOut}>
                      Logout
                    </button>
                  ) : (
                      <button className="btn" onClick={logIn}>
                      LogIn
                    </button>
                  )}
                </div>
              </div>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
    </header>
  );
}

export default Header;