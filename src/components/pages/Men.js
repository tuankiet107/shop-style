import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ADD_PRODUCT_BASKET } from "../../actions/types";
import Footer from "../views/Footer";
import Header from "../views/Header";
import ConvertPrice from "../../routes/ConvertPrice";

function Men() {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  let listProducts = [],
    result;

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    async function fetchDataFromDB() {
      firebase
        .firestore()
        .collection("products")
        .doc("veTsDR2nMSiv3ldp7J0F")
        .get()
        .then((doc) => {
          if (doc.exists) {
            setData(doc.data().products);
          } else {
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    }

    fetchDataFromDB();
  }, []);

  function onAddToCart(product) {
    if (localStorage.getItem("user")) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });
      Toast.fire({
        icon: "success",
        title: "Đã thêm vào giỏ hàng.",
      });
      dispatch({ type: ADD_PRODUCT_BASKET, payload: product });
    } else {
      Swal.fire({
        title: "warning",
        text: "Bạn phải đăng nhập trước.",
      });
    }
  }

  if (data) {
    Object.keys(data).forEach((item) => {
      if (data[item].sex === "men") {
        listProducts.push(data[item]);
      }
    });
  }

  listProducts.sort((a, b) => {
    return b.date - a.date;
  });

  result = listProducts.map((product) => {
    return (
      <Col
        className="info-product"
        xl={3}
        lg={4}
        md={4}
        sm={6}
        xs={12}
        key={product.id}
      >
        <img alt="" src={product.image} />
        {product.quantity === 0 ? (
          <span className="over-qty">Hết hàng</span>
        ) : (
          ""
        )}
        <div className="details">
          <p>{product.name}</p>
          <div className="info-price">
            {product.discount ? (
              <span>{ConvertPrice(product.priceDiscount)}</span>
            ) : (
              ""
            )}
            {product.priceDiscount ? (
              <span className="discount">{ConvertPrice(product.price)}</span>
            ) : (
              <span>{ConvertPrice(product.price)}</span>
            )}
          </div>
        </div>
        <div onClick={() => onAddToCart(product)} className="button">
          <span> Thêm vào giỏ </span>
        </div>
      </Col>
    );
  });

  return (
    <div>
      <Header />

      {data === null ? (
        <div className="page-loading">Loading...</div>
      ) : (
        <div className="page-products">
          <h2 className="title">Sản phẩm nam</h2>

          <Container fluid>
            <Row>{result}</Row>
          </Container>

          <Footer />

          <div className="footer-copyright">
            <p>
              All Rights Reserved. © 2020
              <Link to="/"> The Kstore </Link>
              Design By: Tuan Kiet
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Men;
