import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import Header from "../views/Header";
import { useForm } from "react-hook-form";
import RandomId from "../features/RandomId";

function SignUp() {
  const [user, setUser] = useState({
    id: RandomId() || "",
    email: sessionStorage.getItem("email") || "",
    name: sessionStorage.getItem("name") || "",
    phone: sessionStorage.getItem("phone") || "",
    password: "",
    passwordConfirm: "",
    errEmail: null,
    errPassword: null,
  });
  const { handleSubmit, register, errors } = useForm();
  const history = useHistory();

  useEffect(() => {
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("name", user.name);
    sessionStorage.setItem("phone", user.phone);
  }, [user]);

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
    let x = document.forms["myForm"]["phone"].value;
    if (isNaN(x)) {
      alert("Phone phải là số");
      return false;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(
        (authUser) => {
          firebase
            .firestore()
            .collection("users")
            .doc("7inkEUK5Q6FdvMEw2K5j")
            .update({
              [user.id]: {
                email: authUser.user.email,
                name: user.name,
                id: user.id,
                phone: user.phone,
                password: user.password,
                date: new Date(),
                status: true,
                role: "guest",
              },
            })
            .then(
              async () => {
                await localStorage.setItem("user", user.email);
                await localStorage.setItem("user", user.name);
                await localStorage.setItem("user", user.id);
                await localStorage.setItem("role", "guest");
                history.push("/");
                sessionStorage.clear();
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
          let errCode = authErr.code.split("/")[1];
          if (errCode === "email-already-in-use") {
            setUser({
              ...user,
              errEmail: "Email đã tồn tại.",
            });
          } else if (errCode === "invalid-email") {
            setUser({
              ...user,
              errEmail: "* Ví dụ: example@gmail.com",
            });
          } else if (errCode === "weak-password") {
            setUser({
              ...user,
              errPassword: "Mật khẩu yếu.",
            });
          }
        }
      );
  }

  return (
    <div className="page-account">
      <Header />

      <div className="sign-up">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Tạo tài khoản</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form name="myForm">
              <Form.Group>
                <Form.Label>
                  Họ và tên
                  {errors.name && (
                    <span style={{ color: "red" }}>* Bắt buộc</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="name"
                  value={user.name}
                  type="text"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("name", e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Phone
                  {errors.phone && (
                    <span style={{ color: "red" }}>* Bắt buộc</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="phone"
                  value={user.phone}
                  type="text"
                  min="8"
                  max="11"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("phone", e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email
                  {errors.email && errors.email.type === "required" && (
                    <span style={{ color: "red" }}>* Bắt buộc</span>
                  )}
                  {user && user.errEmail && (
                    <span style={{ color: "red" }}>{user.errEmail}</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="email"
                  value={user.email}
                  type="email"
                  ref={register({
                    required: true,
                  })}
                  onChange={(e) => userTyping("email", e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Mật khẩu
                  {errors.password && (
                    <span style={{ color: "red" }}>* Bắt buộc</span>
                  )}
                  {user.errPassword && (
                    <span style={{ color: "red" }}>{user.errPassword}</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  ref={register({ required: true })}
                  onChange={(e) => userTyping("password", e)}
                />
              </Form.Group>
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
