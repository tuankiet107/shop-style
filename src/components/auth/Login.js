import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import Header from "../views/Header";

function Login() {
  const history = useHistory();
  const [value, setValue] = useState({});
  const [error, setError] = useState("");

  const userTyping = (type, e) => {
    switch (type) {
      case "email":
        setValue({ ...value, email: e.target.value });
        break;
      case "password":
        setValue({ ...value, password: e.target.value });
        break;
      default:
        break;
    }
  };

  function handleLogin(e) {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(value.email, value.password)
      .then(
        async () => {
          if (value.email === "admin@gmail.com") {
            localStorage.setItem("user", value.email);
            sessionStorage.removeItem("user");
            history.push("/list-product");
          } else {
            await localStorage.setItem("user", value.email);
            sessionStorage.removeItem("user");
            history.push("/");
          }
        },
        (err) => {
          console.log(err);
          setError("Đăng nhập không thành công!");
        }
      );
  }

  return (
    <div>
      <Header />

      <div className="sign-in">
        <Modal.Dialog>
          <div className="modal-header">
            <h4>Đăng nhập</h4>
          </div>

          <Modal.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => userTyping("email", e)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => userTyping("password", e)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Đăng nhập
              </Button>
            </Form>
          </Modal.Body>
          {error ? <Alert variant="danger">{error}</Alert> : ""}
          <Modal.Footer>
            <Form.Text className="text-muted">
              Bạn chưa có tài khoản ?
            </Form.Text>
            <Link to="/signup">Đăng ký</Link>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}

Login.propTypes = {
  onSubmit: PropTypes.func,
};

Login.defaultProps = {
  obSubmit: null,
};

export default Login;
