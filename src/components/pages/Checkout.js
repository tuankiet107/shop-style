import React, { useEffect, useState } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import firebase from "firebase";
import { RESET_BASKET } from "../../actions/types";

import Swal from "sweetalert2";

function Checkout() {
  const history = useHistory();
  const basket = useSelector((state) => state.basketState);
  const dispatch = useDispatch();
  let mail;

  const [info_checkout, setInfo_checkout] = useState({});
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

  async function onClickSubmit() {
    let id = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length; // 62
    for (let i = 0; i < 5; i++) {
      id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    if (localStorage.getItem("user")) {
      mail = localStorage.getItem("user").split("@")[0];
      firebase
        .firestore()
        .collection("cart")
        .doc("cart")
        .update({
          [id + mail]: {
            fullName: info_checkout.fullname,
            phone: info_checkout.phone,
            address: info_checkout.address,
            products: basket.products,
            totals: basket.cartCost,
            orderDate: new Date(),
            note: info_checkout.note,
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
    }
  }

  function minusQtyProductBought() {
    const products = basket.products.filter((item) => {
      return Object.keys(data).map((item1) => {
        return item.id === data[item1].id;
      });
    });
    // console.log(products);
    products.forEach((item3) => {
      Object.keys(data).forEach((item4) => {
        if (item3.id === data[item4].id) {
          firebase
            .firestore()
            .collection("products")
            .doc("veTsDR2nMSiv3ldp7J0F")
            .update({
              [`products.${item3.id}`]: {
                ...item3,
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
        {errors.fullname ? (
          <Alert variant="danger">Bạn phải nhập đầy đủ thông tin</Alert>
        ) : (
          ""
        )}
        <h3>KStore</h3>
        <h5>Thông tin đơn hàng</h5>
        <Form>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Họ và tên"
                name="fullname"
                ref={register({ required: true })}
                onChange={(e) =>
                  setInfo_checkout({
                    ...info_checkout,
                    fullname: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                type="text"
                name="phone"
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
              <Form.Control
                type="text"
                placeholder="Địa chỉ"
                name="address"
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
                placeholder="Ghi chú"
                ref={register({ required: true })}
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
