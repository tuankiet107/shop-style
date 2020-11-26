import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MenuLeft from "./MenuLeft";
import RandomId from "../features/RandomId";
import firebase from "firebase";
import Swal from "sweetalert2";

function AddUser() {
  const [user, setUser] = useState({
    name: "",
    id: RandomId(),
    email: "",
    password: "",
    phone: "",
    role: "employee",
    createError: "",
  });
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        firebase
          .firestore()
          .collection("users")
          .doc("7inkEUK5Q6FdvMEw2K5j")
          .update({
            [user.id]: {
              email: user.email,
              name: user.name,
              id: user.id,
              phone: user.phone,
              password: user.password,
              date: new Date(),
              status: true,
              role: user.role,
            },
          })
          .then(
            async () => {
              const Toast = await Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
              });

              Toast.fire({
                icon: "success",
                title: "Tạo tài khoản thành công",
              });

              history.push("/list-user");
              return;
            },
            (err) => {
              console.log(err);
              setUser({
                ...user,
                createError: "Tạo tài khoản không thành công!",
              });
            }
          );
      })
      .catch((authErr) => {
        let errCode = authErr.code.split("/")[1];
        if (errCode === "email-already-in-use") {
          setUser({
            ...user,
            createError: "Email đã tồn tại.",
          });
        } else {
          setUser({
            ...user,
            createError: "* Ví dụ: example@gmail.com",
          });
        }
      });
  }

  return (
    <Row>
      <MenuLeft />
      <Col xl={10} lg={10} md={10} sm={10} style={{ marginLeft: "auto" }}>
        <Container className="admin-add-users">
          <h3>Thêm tài khoản</h3>

          <Form>
            <Form.Group>
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Vai trò</Form.Label>
              <Form.Control
                as="select"
                defaultValue={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="employee">Nhân viên</option>
                <option value="guest">Khách hàng</option>
              </Form.Control>
            </Form.Group>

            {user.createError ? (
              <Alert variant="danger">{user.createError}</Alert>
            ) : (
              ""
            )}

            <Button variant="primary" onClick={handleSubmit}>
              Thêm
            </Button>
          </Form>
        </Container>
        <Link to="/list-user" className="btn-back">
          <i className="fas fa-chevron-left"></i> Quay về
        </Link>
      </Col>
    </Row>
  );
}

export default AddUser;
