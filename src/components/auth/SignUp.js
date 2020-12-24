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
  const [errorName, setErrorName] = useState({
    state: false,
    message: '',
  });
  const [errPwd, setErrPwd] = useState({
    errPwd: false,
    message: '',
  });
  const [errCFPwd, setErrCFPwd] = useState({
    state: false,
    message: '',
  });
  const [errEmail, setErrEmail] = useState({
    state: false,
    message: '',
  });
  const [errPhone, setErrPhone] = useState({
    state: false,
    message: '',
  });
  const history = useHistory();

  // useEffect(() => {
    // sessionStorage.setItem("email", user.email);
    // sessionStorage.setItem("name", user.name);
    // sessionStorage.setItem("phone", user.phone);
    // console.log("useEffect");
  // }, [user]);

  // useEffect(() => {
  //   setUser({
  //     ...user,
  //     email: sessionStorage.getItem("email"),
  //     name: sessionStorage.getItem("name"),
  //     phone: sessionStorage.getItem("phone"),
  //   })
  // })

  function userTyping(type, e) {
    setUser({
      ...user,
      [type]: e.target.value,
    });
    validation();
  }
  const setNullState = () => {
    setErrorName({
      state: false,
      message: '',
    });
    setErrEmail({
      state: false,
      message: '',
    });
    setErrPwd({
      state: false,
      message: '',
    });
    setErrCFPwd({
      state: false,
      message: '',
    });
    setErrPhone({
      state: false,
      message: '',
    });
  }
  const validation = () => {
    setNullState();
    const validateState = {
      email: setErrEmail,
      name: setErrorName,
      phone: setErrPhone,
      password: setErrPwd,
      passwordConfirm: setErrCFPwd,
    }
    for (let field in user){
      if(user[field] === ''){
        validateState[field]({
          state: true,
          message: '* Bắt buộc'
        })
      }
    }
  }
  function handleSignup() {
    validation();
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
                  {errorName.state && (
                    <span style={{ color: "red" }}>{errorName.message}</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="name"
                  value={user.name}
                  type="text"
                  onChange={(e) => userTyping("name", e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Phone
                  {errPhone.state && (
                    <span style={{ color: "red" }}>{errPhone.message}</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="phone"
                  value={user.phone}
                  type="text"
                  onChange={(e) => userTyping("phone", e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email
                  {errEmail.state && (
                    <span style={{ color: "red" }}>{errEmail.message}</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="email"
                  value={user.email}
                  type="email"
                  onChange={(e) => userTyping("email", e)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Mật khẩu
                  {errPwd.state && (
                    <span style={{ color: "red" }}>{errPwd.message}</span>
                  )}
                </Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  onChange={(e) => userTyping("password", e)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSignup}>
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
