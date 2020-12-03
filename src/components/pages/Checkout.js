import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { RESET_BASKET } from "../../actions/types";
import RandomId from "../features/RandomId";
import ConvertPrice from "../features/ConvertPrice";

function Checkout() {
  const history = useHistory();
  const basket = useSelector((state) => state.basketState);
  const dispatch = useDispatch();
  let idUser;

  const [info_checkout, setInfo_checkout] = useState({
    fullName: sessionStorage.getItem("fullName") || "",
    phone: sessionStorage.getItem("phone") || "",
    address: sessionStorage.getItem("address") || "",
    note: sessionStorage.getItem("note") || "",
  });
  const [data, setData_DB] = useState();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    sessionStorage.setItem("fullName", info_checkout.fullName);
    sessionStorage.setItem("phone", info_checkout.phone);
    sessionStorage.setItem("address", info_checkout.address);
    sessionStorage.setItem("note", info_checkout.note);
  }, [info_checkout]);

  function handleTyping(type, e) {
    switch (type) {
      case "fullName":
        setInfo_checkout({ ...info_checkout, fullName: e.target.value });
        break;
      case "phone":
        setInfo_checkout({ ...info_checkout, phone: e.target.value });
        break;
      case "address":
        setInfo_checkout({ ...info_checkout, address: e.target.value });
        break;
      case "note":
        setInfo_checkout({ ...info_checkout, note: e.target.value });
        break;
      default:
        break;
    }
  }

  async function onClickSubmit() {
    let id = RandomId();

    if (localStorage.getItem("id")) {
      idUser = localStorage.getItem("id");
      firebase
        .firestore()
        .collection("orders")
        .doc("HoHkP9DFHkPdW04iewmG")
        .update({
          [id]: {
            fullName: info_checkout.fullName,
            id: idUser,
            phone: info_checkout.phone,
            address: info_checkout.address,
            products: basket.products,
            totals: basket.cartCost,
            date: new Date(),
            note: info_checkout.note ? info_checkout.note : "",
            status: false,
          },
        });

      await Swal.fire({
        position: "center",
        icon: "success",
        title: "Mua thành công.",
        showConfirmButton: false,
        timer: 1500,
      });

      history.push("/");

      dispatch({
        type: RESET_BASKET,
      });

      sessionStorage.clear();
    }
  }

  function onShowProductList() {
    let sidebar = document.getElementById("sidebar-products");
    sidebar.classList.toggle("show-sidebar");
  }

  return (
    <div className="wrap">
      <div className="checkouts">
        <h3>KStore</h3>
        <div className="show-cart-mini" onClick={onShowProductList}>
          <i class="fas fa-shopping-cart">
            <span class="badge">Hiển thị thông tin đơn hàng </span>
          </i>
        </div>
        <h5>Thông tin đơn hàng</h5>
        <Form>
          <Row>
            <Col>
              {errors.fullName && (
                <span style={{ color: "red" }}>* Bắt buộc</span>
              )}
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                name="fullName"
                value={info_checkout.fullName}
                ref={register({ required: true })}
                onChange={(e) => handleTyping("fullName", e)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {errors.phone && <span style={{ color: "red" }}>* Bắt buộc</span>}
              <Form.Control
                type="text"
                name="phone"
                value={info_checkout.phone}
                placeholder="Số điện thoại"
                ref={register({ required: true })}
                onChange={(e) => handleTyping("phone", e)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {errors.address && (
                <span style={{ color: "red" }}>* Bắt buộc</span>
              )}
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                name="address"
                value={info_checkout.address}
                ref={register({ required: true })}
                onChange={(e) => handleTyping("address", e)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                as="textarea"
                type="text"
                rows={3}
                name="note"
                value={info_checkout.note}
                placeholder="Ghi chú"
                onChange={(e) => handleTyping("note", e)}
              />
            </Col>
          </Row>
          {errors && (
            <Alert variant="danger">Bạn phải nhập đầy đủ thông tin</Alert>
          )}
          <Row>
            <Col>
              <button onClick={handleSubmit(onClickSubmit)}>
                Hoàn tất đơn hàng
              </button>
            </Col>
          </Row>
        </Form>

        <Link to="/cart" className="btn-back">
          <i className="fas fa-chevron-left"></i>Giỏ hàng
        </Link>
      </div>

      <div className="sidebar" id="sidebar-products">
        <div className="sidebar-content">
          <div className="order-summary-sections">
            <div className="order-summary-section-product-list">
              <table>
                <thead></thead>
                <tbody>
                  {basket.products.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td className="product-image">
                          <img src={product.image} alt="" />
                          <span>{product.quantity}</span>
                        </td>
                        <td className="product-description">
                          <span>{product.name}</span>
                          <span className="size-small">
                            Size: {product.size}
                          </span>
                        </td>
                        <td className="product-price">
                          {ConvertPrice(product.price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="order-summary-section-total-lines">
              <span>Tổng cộng: </span>
              <span>{ConvertPrice(basket.cartCost)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
