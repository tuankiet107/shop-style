import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
// import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { RESET_BASKET } from "../../actions/types";
import RandomId from "../features/RandomId";
import ConvertPrice from "../features/ConvertPrice";
import { Button } from "react-bootstrap";

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
  // const { register, handleSubmit, errors } = useForm();
  const [errFullName, setErrFullName] = useState({
    state: false,
    message: "",
  });
  const [errPhone, setErrPhone] = useState({
    state: false,
    message: "",
  });
  const [errAddress, setErrAddress] = useState({
    state: false,
    message: "",
  });
  const [errNote, setErrNote] = useState({
    state: false,
    message: "",
  });

  useEffect(() => {
    sessionStorage.setItem("fullName", info_checkout.fullName);
    sessionStorage.setItem("phone", info_checkout.phone);
    sessionStorage.setItem("address", info_checkout.address);
    // sessionStorage.setItem("note", info_checkout.note);
  }, [info_checkout]);

  function handleTyping(type, e) {
    setInfo_checkout({
      ...info_checkout,
      [type]: e.target.value,
    });
    validation();
  }
  const setNullState = () => {
    setErrFullName({
      state: false,
      message: "",
    });
    setErrPhone({
      state: false,
      message: "",
    });
    setErrAddress({
      state: false,
      message: "",
    });
    setErrNote({
      state: false,
      message: "",
    });
  };
  const validation = () => {
    setNullState();
    const validateState = {
      fullName: setErrFullName,
      phone: setErrPhone,
      address: setErrAddress,
      note: setErrNote,
    };
    for (let field in info_checkout) {
      if (info_checkout[field] === "") {
        validateState[field]({
          state: true,
          message: "* Bắt buộc",
        });
      }
    }
  };

  async function onClickSubmit() {
    validation();
    let x = document.forms["myForm"]["phone"].value;
    if (isNaN(x)) {
      alert("Phone phải là số");
      return false;
    }

    if (info_checkout.fullName === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (info_checkout.phone === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (info_checkout.address === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

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
          <i className="fas fa-shopping-cart">
            <span className="badge">Hiển thị thông tin đơn hàng </span>
          </i>
        </div>
        <h5>Thông tin đơn hàng</h5>
        <Form name="myForm">
          <Row>
            <Col>
              {errFullName.state && (
                <span style={{ color: "red" }}>* Bắt buộc</span>
              )}
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                name="fullName"
                value={info_checkout.fullName}
                onChange={(e) => handleTyping("fullName", e)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {errPhone.state && (
                <span style={{ color: "red" }}>* Bắt buộc</span>
              )}
              <Form.Control
                type="text"
                name="phone"
                value={info_checkout.phone}
                placeholder="Số điện thoại"
                onChange={(e) => handleTyping("phone", e)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              {errAddress.state && (
                <span style={{ color: "red" }}>* Bắt buộc</span>
              )}
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                name="address"
                value={info_checkout.address}
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
          {/* { && (
            <Alert variant="danger">Bạn phải nhập đầy đủ thông tin</Alert>
          )} */}
          <Row>
            <Col>
              <Button onClick={onClickSubmit}>Hoàn tất đơn hàng</Button>
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
                          {product.priceDiscount
                            ? ConvertPrice(product.priceDiscount)
                            : ConvertPrice(product.price)}
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
