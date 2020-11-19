import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { RESET_BASKET } from "../../actions/types";

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
    async function fetDataFromDB() {
      firebase
        .firestore()
        .collection("products")
        .doc("veTsDR2nMSiv3ldp7J0F")
        .get()
        .then((doc) => {
          setData_DB(doc.data().products);
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }
    fetDataFromDB();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("fullName", info_checkout.fullName);
    sessionStorage.setItem("phone", info_checkout.phone);
    sessionStorage.setItem("address", info_checkout.address);
    sessionStorage.setItem("note", info_checkout.note);
  }, [info_checkout]);

  async function onClickSubmit() {
    let id = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if (localStorage.getItem("id")) {
      idUser = localStorage.getItem("id");
      firebase
        .firestore()
        .collection("orders")
        .doc("orders")
        .update({
          [id]: {
            fullName: info_checkout.fullName,
            id: idUser,
            phone: info_checkout.phone,
            address: info_checkout.address,
            products: basket.products,
            totals: basket.cartCost,
            orderDate: new Date(),
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

      minusQtyProductBought();

      history.push("/");

      dispatch({
        type: RESET_BASKET,
      });

      sessionStorage.clear();
    }
  }

  function minusQtyProductBought() {
    const products = basket.products.filter((item) => {
      return Object.keys(data).map((item1) => {
        return item.id === data[item1].id;
      });
    });
    products.forEach((item3) => {
      Object.keys(data).forEach((item4) => {
        if (item3.id === data[item4].id) {
          firebase
            .firestore()
            .collection("products")
            .doc("veTsDR2nMSiv3ldp7J0F")
            .update({
              [`products.${item3.id}`]: {
                ...data[item4],
                quantity: data[item4].quantity - item3.quantity,
              },
            });
        }
      });
    });
  }

  return (
    <div>
      <div className="checkouts">
        {errors && (
          <Alert variant="danger">Bạn phải nhập đầy đủ thông tin</Alert>
        )}
        <h3>KStore</h3>
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
                onChange={(e) =>
                  setInfo_checkout({
                    ...info_checkout,
                    fullName: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setInfo_checkout({ ...info_checkout, phone: e.target.value })
                }
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
                onChange={(e) =>
                  setInfo_checkout({
                    ...info_checkout,
                    address: e.target.value,
                  })
                }
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
                onChange={(e) =>
                  setInfo_checkout({
                    ...info_checkout,
                    note: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
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
    </div>
  );
}

export default Checkout;
