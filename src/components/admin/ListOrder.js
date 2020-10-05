import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row, Table } from "react-bootstrap";
import MenuLeft from "./MenuLeft";

function ListOrder() {
  const [cart, setCart] = useState();
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
  }, []);

  // function showModal(products) {
  //   console.log(products);
  // }

  if (cart) {
    Object.keys(cart).forEach((item) => {
      listOrder.push(cart[item]);
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
        <tbody>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.fullName}</td>
            <td>{item.address}</td>
            <td>{item.phone}</td>
            <td>
              {year}/{day}/{month} {hour}:{minutes}:{seconds}
            </td>
            <td>{item.totals}.000đ</td>
            <td>{item.note}</td>
            <td>Đang giao</td>
            <td className="btn-custom">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">Xem</Dropdown.Toggle>

                <Dropdown.Menu>
                  {item.products.map((item2) => {
                    return (
                      <Dropdown.Item>
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
              <Button className="pl-2" variant="danger">
                Xóa
              </Button>
            </td>
          </tr>

          {/* {item.products.map((item2) => {
            return (
              <tr id={item.id}>
                <td>
                  <img
                    src={item2.image}
                    alt=""
                    style={{ width: "80px", height: "80px" }}
                  />
                </td>
                <td>{item2.name}</td>
                <td>{item2.name}</td>
              </tr>
            );
          })} */}
        </tbody>
      );
    });
  }

  console.log("Render list order");

  return (
    <div className="list-order">
      <Row>
        <MenuLeft />

        <Col xl={11} lg={11} md={11} sm={11} style={{ marginLeft: "auto" }}>
          <div className="admin-order">
            <h3>Quản lí đơn hàng</h3>
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

              {result}
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ListOrder;
