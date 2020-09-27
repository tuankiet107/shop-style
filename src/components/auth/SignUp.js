import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import Header from "../views/Header";
import { useForm } from "react-hook-form";

function SignUp() {
  const [user, setUser] = useState();
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  function userTyping(type, e) {
    switch (type) {
      case "email":
        setUser({ ...user, email: e.target.value });
        break;
      case "name":
        setUser({ ...user, name: e.target.value });
        break;
      case "phone":
        setUser({ ...user, phone: e.target.value });
        break;
      case "password":
        setUser({ ...user, password: e.target.value });
        break;
      case "passwordConfirm":
        setUser({ ...user, passwordConfirm: e.target.value });
        break;
      default:
        break;
    }
  }

  function handleSignup() {
    if (user.password !== user.passwordConfirm) {
      setUser({ ...user, signupError: "Mật khẩu không trùng khớp!" });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        (authUser) => {
          firebase
            .firestore()
            .collection("users")
            .doc(user.email)
            .set({
              email: authUser.user.email,
              name: user.name,
              phone: user.phone,
            })
            .then(
              async () => {
                if (user.email === "admin@gmail.com") {
                  await localStorage.setItem("user", user.email);
                  history.push("/list-product");
                } else {
                  await localStorage.setItem("user", user.email);
                  history.push("/");
                }
              },
              (err) => {
                console.log(err);
                setUser({
                  ...user,
                  signupError: "Tạo tài khoản không thành công!",
                });
              }
            );
        },
        (authErr) => {
          console.log(authErr);
          setUser({ ...user, signupError: "Tạo tài khoản không thành công!" });
        }
      );
  }

  return (
    <div>
      <Header />

      <div className="sign-up">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Tạo tài khoản</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("name", e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("email", e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  type="text"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("phone", e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("password", e)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  name="passwordConfirm"
                  type="password"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("passwordConfirm", e)}
                />
              </Form.Group>

              {errors.email && (
                <div style={{ color: "red" }}>
                  Bạn phải nhập đầy đủ thông tin.
                </div>
              )}

              <Button variant="primary" onClick={handleSubmit(handleSignup)}>
                Đăng ký
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Form.Text className="text-muted">Bạn đã có tài khoản ?</Form.Text>
            <Link to="/login">Đăng nhập</Link>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    </div>
  );
}

export default SignUp;
