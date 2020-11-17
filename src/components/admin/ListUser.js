import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Col, Dropdown, ListGroup, Row, Table } from "react-bootstrap";
import MenuLeft from "./MenuLeft";

function ListUser() {
  let result, history;
  const [users, setUsers] = useState([]);
  const [listOrd, setListOrd] = useState([]);

  useEffect(() => {
    async function getUserFromDB() {
      firebase
        .firestore()
        .collection("users")
        .doc("7inkEUK5Q6FdvMEw2K5j")
        .onSnapshot(async (doc) => {
          const temp = await doc.data();
          let lists = [];
          Object.keys(temp).forEach((item) => {
            lists.push(temp[item]);
          });
          setUsers(lists);
        });
    }

    getUserFromDB();
  }, []);

  if (users.length > 0) {
    let list = users.filter((info) => {
      return info.email !== "admin@gmail.com";
    });

    list.sort(function (a, b) {
      return b.date - a.date;
    });

    result = list.map((user, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>
            <span
              className="watch-history-ord"
              onClick={() => orderHistory(user.id)}
            >
              Xem
              {history}
            </span>
          </td>
          <td>
            {user.status === true ? (
              <span
                onClick={() => deleteUser(user)}
                className="btn-delete-user"
              >
                Vô hiệu hóa
              </span>
            ) : (
              <span className="disabled" onClick={() => deleteUser(user)}>
                Phục Hồi
              </span>
            )}
          </td>
        </tr>
      );
    });
  }

  function orderHistory(idUser) {
    return firebase
      .firestore()
      .collection("orders")
      .doc("orders")
      .get()
      .then((doc) => {
        let listKey = doc.data();
        let temp = [];
        Object.keys(listKey).map((item) => {
          if (listKey[item].id === idUser) {
            temp.push(listKey[item]);
          }
          return temp;
        });
        setListOrd(temp);
      });
  }

  function deleteUser(user) {
    let keyUser = user.id;
    firebase
      .firestore()
      .collection("users")
      .doc("7inkEUK5Q6FdvMEw2K5j")
      .update({
        [`${keyUser}.status`]: !user.status,
      });
  }

  return (
    <Row>
      <MenuLeft />

      <Col xl={11} lg={11} md={11} sm={11} style={{ marginLeft: "auto" }}>
        <div className="admin-users">
          <h3>Quản lí người dùng</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khách hàng</th>
                <th>Id</th>
                <th>Email</th>
                <th>Mật khẩu</th>
                <th>Lịch sử mua hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>{result}</tbody>
          </Table>

          <div className="list-order">
            {listOrd.map((item, index) => {
              let dateObj = new Date(item.orderDate.seconds * 1000);
              let month = dateObj.getMonth() + 1;
              let year = dateObj.getFullYear();
              let day = dateObj.getDate();
              let hour = dateObj.getHours();
              let minutes = dateObj.getMinutes();
              let seconds = dateObj.getSeconds();
              return (
                <Dropdown key={index}>
                  <Dropdown.Toggle id="dropdown-basic">
                    Đơn hàng {index + 1}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Tên khách hàng</th>
                          <th>Địa chỉ</th>
                          <th>Ngày đặt</th>
                          <th>Ghi chú</th>
                          <th>Sđt</th>
                          <th>Sản phẩm</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{item.fullName}</td>
                          <td>{item.address}</td>
                          <td>
                            {year}/{day}/{month} {hour}:{minutes}:{seconds}
                          </td>
                          <td>{item.note}</td>
                          <td>{item.phone}</td>
                          <td>
                            {item.products.map((item2, index2) => {
                              return (
                                <ListGroup key={index2}>
                                  <ListGroup.Item>
                                    <img src={item2.image} alt="" />
                                    <span>Mã: {item2.id}</span>
                                  </ListGroup.Item>
                                </ListGroup>
                              );
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Dropdown.Menu>
                </Dropdown>
              );
            })}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ListUser;
