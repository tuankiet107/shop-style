import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import MenuLeft from "./MenuLeft";
import ConvertPrice from '../../routes/ConvertPrice';

function ListOrder() {
  const [cart, setCart] = useState();
  const [type, setType] = useState("all");
  let listOrder = [],
    result;

  useEffect(() => {
    async function getUserFromDB() {
      firebase
        .firestore()
        .collection("cart")
        .doc("cart")
        .get()
        .then((doc) => {
          setCart(doc.data());
        });
    }

    getUserFromDB();
  },[type]);

  function deleteOrderFn(item) {
    if (cart) {
      Object.keys(cart).forEach((key) => {
        if (cart[key] === item) {
          firebase
            .firestore()
            .collection("cart")
            .doc("cart")
            .update({
              [key]: firebase.firestore.FieldValue.delete(),
            });
        }
      });
    }
    return;
  }

  function orderStatusFn(item){
    if(cart){
      Object.keys(cart).forEach(itemKey => {
        if(item === cart[itemKey]){
          firebase
          .firestore()
          .collection('cart')
          .doc('cart')
          .update({
            [`${itemKey}.status`]: true
          })
        }
      })
    }
  }

  if (cart) {
    Object.keys(cart).forEach((item) => {
      switch (type) {
        case "all":
          listOrder.push(cart[item]);
          break;
        case "wait":
          if(cart[item].status === false){
            listOrder.push(cart[item]);
          }
          break;
        case "actived":
          if(cart[item].status === true){
            listOrder.push(cart[item]);
          }
          break;
        default:
          break;
      }
    });

    listOrder.sort(function (a, b) {
      return b.orderDate - a.orderDate;
    });

    result = listOrder.map((item, index) => {
      let dateObj = new Date(item.orderDate.seconds * 1000);
      let month = dateObj.getMonth() + 1;
      let year = dateObj.getFullYear();
      let day = dateObj.getDate();
      let hour = dateObj.getHours();
      let minutes = dateObj.getMinutes();
      let seconds = dateObj.getSeconds();

      return (

          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.fullName}</td>
            <td>{item.address}</td>
            <td>{item.phone}</td>
            <td>
              {year}/{day}/{month} {hour}:{minutes}:{seconds}
            </td>
            <td>{ConvertPrice(item.totals)}</td>
            <td>{item.note}</td>
            <td onClick={() => orderStatusFn(item)}>
              {
                item.status === true ? <span className="active-status ">Đã xác nhận</span> : <span>Chờ xác nhận</span>
              }
            </td>
            <td className="btn-custom">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" variant="outline-primary">Xem</Dropdown.Toggle>

                <Dropdown.Menu>
                  {item.products.map((item2, index2) => {
                    return (
                      <Dropdown.Item key={index2}>
                        <img
                          src={item2.image}
                          alt=""
                          style={{ width: "60px", height: "60px" }}
                        />
                        <h4>{item2.name}</h4>
                        <span>Số lượng: {item2.quantity}</span>
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
              <Button variant="outline-danger" onClick={() => deleteOrderFn(item)}>
                Xóa
              </Button>
            </td>
          </tr>
      );
    });
  }

  return (
    <div className="list-order">
      <Row>
        <MenuLeft />

        <Col xl={11} lg={11} md={11} sm={11} style={{ marginLeft: "auto" }}>
          <div className="admin-order">
            <div className="title">
              <h3>Quản lí đơn hàng</h3>

              <Form>
                    <span>Sắp xếp</span>
                    <Form.Control
                      as="select"
                      defaultValue="all"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="all">Tất cả</option>
                      <option value="wait">Chờ xác nhận</option>
                      <option value="actived">Đã xác nhận</option>
                    </Form.Control>
                </Form>

            </div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Chú thích</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
              {result}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ListOrder;
