import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Col, Dropdown, Form, ListGroup, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConvertDate from "../features/ConvertDate";
import removeVietnameseTones from "../features/rmVietnameseTones";
import MenuLeft from "./MenuLeft";

function ListUser() {
  let result,
    history,
    listSearch,
    lists = [];
  const [users, setUsers] = useState([]);
  const [listOrd, setListOrd] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    async function getUserFromDB() {
      firebase
        .firestore()
        .collection("users")
        .doc("7inkEUK5Q6FdvMEw2K5j")
        .onSnapshot(async (doc) => {
          const temp = await doc.data();
          let listsTemp = [];
          Object.keys(temp).forEach((item) => {
            listsTemp.push(temp[item]);
          });
          setUsers(listsTemp);
        });
    }

    getUserFromDB();
  }, []);

  if (users.length > 0) {
    let list;
    if (localStorage.getItem("role") === "admin") {
      list = users.filter((info) => {
        return info.role !== "admin";
      });
    }
    if (localStorage.getItem("role") === "employee2") {
      list = users.filter((info) => {
        return info.role === "guest";
      });
    }

    list.sort(function (a, b) {
      return b.date - a.date;
    });

    listSearch = list.filter((item) => {
      if (
        removeVietnameseTones(item.name.toLowerCase()).includes(
          removeVietnameseTones(search.toLowerCase())
        )
      ) {
        return item;
      }
    });

    listSearch.forEach((item) => {
      switch (type) {
        case "all":
          lists.push(item);
          break;
        case "not locked":
          if (item.status === true) {
            lists.push(item);
          }
          break;
        case "locked":
          if (item.status === false) {
            lists.push(item);
          }
          break;
        case "employee":
          if (item.role === "employee1" || item.role === "employee2") {
            lists.push(item);
          }
          break;
        case "guest":
          if (item.role === "guest") {
            lists.push(item);
          }
          break;
        default:
          break;
      }
    });

    result = lists.map((user, index) => {
      let item = ConvertDate(user);
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.id}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>
            {item.year}/{item.day}/{item.month} {item.hour}:{item.minutes}:
            {item.seconds}
          </td>
          <td>{user.role === "guest" ? "Khách hàng" : "Nhân viên"}</td>
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

      <Col xl={12} lg={12} md={12} sm={12}>
        <div className="admin-users">
          <h3>Quản lí người dùng</h3>

          <div className="custom">
            <Link to="/add-user" className="btn-add-user">
              <i className="fas fa-plus"> Thêm tài khoản</i>
            </Link>

            <Form className="form-action">
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Tìm ai đó</Form.Label>
                  <Form.Control
                    className="form-search"
                    type="text"
                    value={search}
                    placeholder="Tìm theo tên"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Sắp xếp</Form.Label>
                  <Form.Control
                    className="form-sort"
                    as="select"
                    defaultValue="all"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="all">Tất cả</option>
                    {localStorage.getItem("role") === "employee2" ? (
                      ""
                    ) : (
                      <option value="employee">Nhân viên</option>
                    )}
                    {localStorage.getItem("role") === "employee2" ? (
                      ""
                    ) : (
                      <option value="guest">Khách hàng</option>
                    )}
                    <option value="not locked">Chưa khóa</option>
                    <option value="locked">Bị khóa</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên khách hàng</th>
                <th>Id</th>
                <th>Email</th>
                <th>Mật khẩu</th>
                <th>Ngày tạo</th>
                <th>Vai trò</th>
                <th>Lịch sử mua hàng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>{result}</tbody>
          </Table>

          <div className="list-order">
            {listOrd.map((item, index) => {
              let dateObj = ConvertDate(item);
              return (
                <Dropdown key={index}>
                  <Dropdown.Toggle>Đơn hàng {index + 1}</Dropdown.Toggle>

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
                            {dateObj.year}/{dateObj.day}/{dateObj.month}
                            {dateObj.hour}:{dateObj.minutes}:{dateObj.seconds}
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
