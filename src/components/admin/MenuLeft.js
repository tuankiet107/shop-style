import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RESET_BASKET } from "../../actions/types";

function MenuLeft() {
  const [user, setUser] = useState("");
  const [hamburger, setHamburger] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    async function fetchDataFromForm() {
      setUser(localStorage.getItem("user"));
    }
    fetchDataFromForm();
  }, [hamburger]);

  function logOut() {
    dispatch({
      type: RESET_BASKET,
    });
    localStorage.removeItem("user");
    history.push("/");
  }

  function logIn() {
    history.push("/login");
  }

  function showMenuLeft() {
    const menuLeft = document.querySelector(".menu-left");
    menuLeft.classList.toggle("close-menu");
    setHamburger(!hamburger);
  }

  return (
    <Col xl={2} lg={2} md={2} sm={2} className="left">
      <div className="main-header">
        <div className="menu-left">
          <h4>KStore</h4>
          <ul className="list-item">
            <Link to="/">
              <li>Cửa hàng</li>
            </Link>
            <Link to="/list-product">
              <li>Quản lý sản phẩm</li>
            </Link>
            <Link to="/list-order">
              <li>Quản lý đơn hàng</li>
            </Link>
            <Link to="/list-user">
              <li>Quản lý user</li>
            </Link>
            <Link to="/list-chat">
              <li>Messages</li>
            </Link>
          </ul>

          {user ? (
            <button onClick={logOut}>Logout</button>
          ) : (
            <button onClick={logIn}>LogIn</button>
          )}
        </div>

        <div className="hamburger" onClick={showMenuLeft}>
          {hamburger === true ? (
            <i className="fas fa-chevron-circle-left"></i>
          ) : (
            <i className="fas fa-chevron-circle-right"></i>
          )}
        </div>
      </div>
    </Col>
  );
}

export default MenuLeft;
