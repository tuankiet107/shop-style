import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT_BASKET } from "../../actions/types";
import ConvertPrice from "../features/ConvertPrice";
import Header from "../views/Header";
import Footer from "../views/Footer";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

function Details({ location }) {
  const [size, setSize] = useState("S");
  let sizes = ["S", "M", "L", "XL"];
  const dispatch = useDispatch();
  const history = useHistory();
  const product = location.state;
  const [getQty, setGetQuantity] = useState();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    // async function getQtyStillDB() {
    //   firebase
    //     .firestore()
    //     .collection("products")
    //     .doc("veTsDR2nMSiv3ldp7J0F")
    //     .get()
    //     .then((doc) => {
    //       let temp = doc.data().products;
    //       let qty = Object.keys(temp).find((item) => {
    //         if (temp[item].id === product.id) {
    //           return temp[item].qty;
    //         }
    //       });
    //       console.log(qty);
    //     });
    // }

    // getQtyStillDB();
  }, []);

  async function onAddToCart(product) {
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
      dispatch({ type: ADD_PRODUCT_BASKET, payload: product, size: size });
    } else {
      await Swal.fire({
        title: "warning",
        text: "Bạn phải đăng nhập trước.",
      });
      history.push("/login");
    }
  }

  return (
    <div className="detail-page">
      <Header />

      <Container>
        <Row className="product-detail-wrapper">
          <Col lg="7" md="7" sm="7" xs="7" id="image-product">
            <img src={product.image} alt="" />
          </Col>

          <Col lg="5" md="5" sm="5" xs="5" id="detail-product">
            <div className="product-title">
              <h1> {product.name} </h1>
              {/* <div className="qty-still">
                Số lượng còn lại: {product.quantity}{" "}
              </div> */}
              <span>Mã sản phẩm: {product.id} </span>
            </div>
            <div className="product-price">
              {product.priceDiscount ? (
                <div>
                  <span>{ConvertPrice(product.priceDiscount)} </span>
                  <span className="price-discount">
                    {ConvertPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span>{ConvertPrice(product.price)}</span>
              )}
            </div>

            <div className="size">
              <span className="title-size">Kích thước</span>
              <Form.Group
                className="list-size"
                defaultValue={size}
                onChange={(e) => setSize(e.target.value)}
              >
                <Form.Control as="select" size="lg">
                  {sizes.map((size, index) => {
                    return (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </div>

            <div onClick={() => onAddToCart(product)} className="btn-add-cart">
              Thêm vào giỏ
            </div>
            <div className="product-item-box">
              <div className="icon-box-item">Bảo hành trong vòng 3 tháng.</div>
              <div className="icon-box-item">
                Đổi trả trong 1 tháng với sản phẩm nguyên giá.
              </div>
            </div>
          </Col>
          <div className="intro">
            <h3>Thông tin sản phẩm</h3>
            <p>
              <span className="name">{product.name}</span> có chất thun nỉ dày
              dặn chống nắng hiệu quả và sở hữu túi trong tiện lợi.
            </p>
            <ul>
              <li>Chất liệu: Nỉ</li>
              <li>Form: Basic</li>
              <li>Màu sắc: Xám, xanh, đỏ, đen</li>
              <li>Sản xuất: Việt Nam</li>
            </ul>
          </div>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

export default Details;
