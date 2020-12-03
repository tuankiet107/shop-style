import React, { useState } from "react";
import PropTypes from "prop-types";

import { Modal, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import Header from "../views/Header";

function Login() {
  const history = useHistory();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    errEmail: "",
    errPassword: "",
  });

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
        () => {
          if (value.email === "admin@gmail.com") {
            localStorage.setItem("user", value.email);
            localStorage.setItem("role", "admin");
            sessionStorage.removeItem("user");
            history.push("/list-product");
          } else {
            firebase
              .firestore()
              .collection("users")
              .doc("7inkEUK5Q6FdvMEw2K5j")
              .get()
              .then((doc) => {
                let temp = doc.data();
                Object.keys(temp).filter(async (item) => {
                  if (
                    temp[item].email === value.email &&
                    temp[item].status === false
                  ) {
                    alert("Tài khoản bị vô hiệu hóa.");
                    return;
                  } else if (
                    temp[item].status === true &&
                    temp[item].email === value.email
                  ) {
                    if (temp[item].role === "employee1") {
                      await localStorage.setItem("user", value.email);
                      await localStorage.setItem("id", temp[item].id);
                      await localStorage.setItem("role", temp[item].role);
                      sessionStorage.removeItem("user");
                      history.push("/list-product");
                    } else if (temp[item].role === "employee2") {
                      await localStorage.setItem("user", value.email);
                      await localStorage.setItem("id", temp[item].id);
                      await localStorage.setItem("role", temp[item].role);
                      sessionStorage.removeItem("user");
                      history.push("/list-user");
                    } else {
                      await localStorage.setItem("user", value.email);
                      await localStorage.setItem("name", temp[item].name);
                      await localStorage.setItem("id", temp[item].id);
                      await localStorage.setItem("role", temp[item].role);
                      sessionStorage.clear();
                      history.push("/");
                    }
                  }
                });
              });
          }
        },
        (err) => {
          console.log(err);
          let errCode = err.code.split("/")[1];
          if (errCode === "user-not-found") {
            setError({
              ...error,
              errEmail: "Email không tìm thấy.",
            });
          } else {
            setError({
              ...error,
              errPassword: "Mật khẩu không đúng.",
            });
          }
        }
      );
  }

  return (
    <div className="page-account">
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
          {error.errEmail ? (
            <Alert variant="danger">{error.errEmail}</Alert>
          ) : (
            ""
          )}
          {error.errPassword ? (
            <Alert variant="danger">{error.errPassword}</Alert>
          ) : (
            ""
          )}
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
