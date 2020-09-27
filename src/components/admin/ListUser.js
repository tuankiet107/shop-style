import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import MenuLeft from "./MenuLeft";
import firebase from "firebase";
import Swal from "sweetalert2";

function ListUser() {
  let lists = [],
    result;
  const [users, setUsers] = useState([]);
  let temp = 0;

  useEffect(() => {
    async function getUserFromDB() {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            setUsers((users) => [...users, doc.data()]);
          });
        });
    }

    getUserFromDB();
  }, [temp]);

  if (users.length > 0) {
    let temp = users.filter((info) => {
      return info.email !== "admin@gmail.com";
    });
    temp.filter((item) => {
      return lists.push(item);
    });

    result = lists.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.phone}</td>
          <td>{user.email}</td>
          <td>
            <Button onClick={() => deleteUser(user)} variant="danger">
              Xóa
            </Button>
          </td>
        </tr>
      );
    });
  }

  function deleteUser(user) {
    let account = firebase.auth().currentUser;
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });

    console.log(account.email);
    console.log(user.email);

    // temp = Math.random();

    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(user.email)
    //   .delete()
    //   .then(() => {
    //     account
    //       .delete()
    //       .then(function () {
    //         Toast.fire({
    //           icon: "success",
    //           title: `Đã xóa ${user.email}`,
    //         });
    //       })
    //       .catch(function (error) {
    //         Toast.fire({
    //           icon: "error",
    //           title: `Không thể xóa user`,
    //         });
    //       });
    //   })
    //   .catch(function (error) {
    //     Toast.fire({
    //       icon: "error",
    //       title: `Không thể xóa user`,
    //     });
    //   });
  }

  return (
    <Row>
      <MenuLeft />

      <Col xl={10} lg={10} md={10} sm={10} style={{ marginLeft: "auto" }}>
        <div className="admin-users">
          <h3>Quản lí users</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khách hàng</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>{result}</tbody>
          </Table>
        </div>
      </Col>
    </Row>
  );
}

export default ListUser;
