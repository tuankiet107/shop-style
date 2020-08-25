import React, { Component } from "react";
import { Container, Row, Nav, Navbar } from "react-bootstrap";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    document.querySelector(".input-val").value = "";
    console.log(this.state);
  };

  render() {
    const { basketProps, enjoyProps } = this.props;
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
                    <form onSubmit={this.handleSubmit}>
                      <input
                        placeholder="Search products"
                        className="input-val"
                        onChange={this.handleChange}
                      />
                      <div className="search-icon" onClick={this.handleSubmit}>
                        <i className="fas fa-search"></i>
                      </div>
                    </form>

                    <div className="favorit-items">
                      <i className="far fa-heart">
                        <span className="badge">{enjoyProps.heartNumber}</span>
                      </i>
                    </div>

                    <div className="shopping-card">
                      <Link to="/cart">
                        <i className="fas fa-shopping-cart">
                          <span className="badge">
                            {basketProps.basketNumbers}
                          </span>
                        </i>
                      </Link>
                    </div>

                    <Link to="/login" className="btn">
                      Login
                    </Link>

                  </div>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </Container>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  basketProps: state.basketState,
  enjoyProps: state.enjoyState,
});

export default connect(mapStateToProps, null)(Header);