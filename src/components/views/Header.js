import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { RESET_BASKET } from "../../actions/types";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.basketState);

  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);
  let name = localStorage.getItem("name");

  useEffect(() => {
    async function fetchDataFromForm() {
      setUser(localStorage.getItem("user"));
    }
    fetchDataFromForm();
  }, [refresh]);

  function handleChangeFromSearch(e) {
    setSearch(e.target.value);
  }

  function handleSubmitFromSearch(e) {
    e.preventDefault();
    history.push({
      pathname: "/search",
      search: `?result=${search}`,
      state: {
        search: search,
      },
    });
    document.getElementById("input-val").value = "";
  }

  function logOut() {
    dispatch({
      type: RESET_BASKET,
    });

    localStorage.clear();
    sessionStorage.clear();
    setRefresh(Math.random());
    history.push("/");
  }

  function logIn() {
    history.push("/login");
  }

  // When the user clicks on the button, scroll to the bottom of the document
  function topFunction() {
    document.body.scrollTo(0, 3000);
    document.documentElement.scrollTo(0, 3000);
  }

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
                    <Link to="/discount" className="nav-link">
                      Giảm giá
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/women" className="nav-link">
                      Nữ
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/men" className="nav-link">
                      Nam
                    </Link>
                  </Nav.Item>
                  <Nav.Item onClick={topFunction}>
                    <a className="nav-link contact">Liên hệ</a>
                  </Nav.Item>
                </Nav>
              </div>

              <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                <div className="fix-card">
                  <form onSubmit={handleSubmitFromSearch}>
                    <input
                      placeholder="Tìm kiếm sản phẩm..."
                      id="input-val"
                      onChange={handleChangeFromSearch}
                    />
                    <div
                      className="search-icon"
                      onClick={handleSubmitFromSearch}
                    >
                      <i className="fas fa-search"></i>
                    </div>
                  </form>
                  <div className="shopping-card">
                    <Link to="/cart">
                      <i className="fas fa-shopping-cart">
                        <span className="badge">{basket.basketNumbers}</span>
                      </i>
                    </Link>
                  </div>

                  {user ? (
                    <button className="btn" onClick={logOut}>
                      Logout
                    </button>
                  ) : (
                    <button className="btn" onClick={logIn}>
                      LogIn
                    </button>
                  )}

                  {name ? (
                    <div className="name-account">Xin chào, {name}</div>
                  ) : null}
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
