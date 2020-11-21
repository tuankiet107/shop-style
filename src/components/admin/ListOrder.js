import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import MenuLeft from "./MenuLeft";
import ConvertPrice from "../../routes/ConvertPrice";
import ConvertDate from "../features/ConvertDate";

function ListOrder() {
  const [order, setOrder] = useState();
  const [type, setType] = useState("all");
  let listOrder = [],
    result;

  useEffect(() => {
    async function getUserFromDB() {
      firebase
        .firestore()
        .collection("orders")
        .doc("orders")
        .onSnapshot((doc) => {
          setOrder(doc.data());
        });
    }
    getUserFromDB();
  }, []);

  function deleteOrderFn(item) {
    if (order) {
      Object.keys(order).forEach((key) => {
        if (order[key] === item) {
          firebase
            .firestore()
            .collection("orders")
            .doc("orders")
            .update({
              [key]: firebase.firestore.FieldValue.delete(),
            });
        }
      });
    }
    return;
  }

  function orderStatusFn(item) {
    if (order) {
      Object.keys(order).forEach((itemKey) => {
        if (item === order[itemKey]) {
          firebase
            .firestore()
            .collection("orders")
            .doc("orders")
            .update({
              [`${itemKey}.status`]: true,
            });
        }
      });
    }
  }

  if (order) {
    Object.keys(order).forEach((item) => {
      switch (type) {
        case "all":
          listOrder.push(order[item]);
          break;
        case "wait":
          if (order[item].status === false) {
            listOrder.push(order[item]);
          }
          break;
        case "actived":
          if (order[item].status === true) {
            listOrder.push(order[item]);
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
      let obj = ConvertDate(item);
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.fullName}</td>
          <td>{item.id}</td>
          <td>{item.address}</td>
          <td>{item.phone}</td>
          <td>
            {obj.year}/{obj.day}/{obj.month} {obj.hour}:{obj.minutes}:
            {obj.seconds}
          </td>
          <td>{ConvertPrice(item.totals)}</td>
          <td>{item.note}</td>
          <td onClick={() => orderStatusFn(item)}>
            {item.status === true ? (
              <span className="active-status">Đã xác nhận</span>
            ) : (
              <span className="wait-status">Chờ xác nhận</span>
            )}
          </td>
          <td className="btn-custom">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" variant="outline-primary">
                Xem
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <span>Chi tiết đơn hàng {index + 1}</span>
                <Table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hình ảnh</th>
                      <th>Size</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products.map((item2, index2) => {
                      return (
                        <tr key={index2}>
                          <td>{index2 + 1}</td>
                          <td>
                            <img
                              src={item2.image}
                              alt=""
                              style={{ width: "60px", height: "60px" }}
                            />
                          </td>
                          <td>{item2.size}</td>
                          <td>{item2.name}</td>
                          <td>{item2.quantity}</td>
                          <td>{ConvertPrice(item2.price * item2.quantity)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Dropdown.Menu>
            </Dropdown>
            <Button
              variant="outline-danger"
              onClick={() => deleteOrderFn(item)}
            >
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

        <Col xl={12} lg={12} md={12} sm={12} style={{ marginLeft: "auto" }}>
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
                  <th>Mã KH</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Chú thích</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>{result}</tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ListOrder;
