import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { ADD_PRODUCT_BASKET } from "../../actions/types";
import Footer from "../views/Footer";
import Header from "../views/Header";
import ConvertPrice from "../../routes/ConvertPrice";
import removeVietnameseTones from "../features/rmVietnameseTones";

function Search() {
  const location = useLocation();
  const [search, setSearch] = useState();
  const [products, setProducts] = useState({});
  const [size, setSize] = useState("S");
  let sizes = ["S", "M", "L", "XL"];
  const dispatch = useDispatch();
  const history = useHistory();

  let listResult = [],
    result;

  useEffect(() => {
    async function getSearchInput() {
      setSearch(removeVietnameseTones(location.state.search));
    }
    getSearchInput();
  });

  useEffect(() => {
    async function getProductsFromDB() {
      firebase
        .firestore()
        .collection("products")
        .doc("veTsDR2nMSiv3ldp7J0F")
        .get()
        .then((doc) => {
          setProducts(doc.data().products);
        });
    }
    getProductsFromDB();
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

  function moreProduct(product) {
    history.push({
      pathname: "/product",
      search: `?id=${product.id}`,
      state: product,
    });
  }

  if (search) {
    Object.keys(products).filter((product) => {
      if (removeVietnameseTones(products[product].name).includes(search)) {
        listResult.push(products[product]);
      }
      return listResult;
    });

    result = listResult.map((product) => {
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
            <p onClick={() => moreProduct(product)}>{product.name}</p>
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
          <div className="sizes">
            {sizes.map((sz, index) => {
              return (
                <button
                  className="btn-size"
                  key={index}
                  value={sz}
                  onClick={(e) => setSize(e.target.value)}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </Col>
      );
    });
  }

  return (
    <div>
      <Header />

      {search === undefined ? (
        <div className="page-loading">Đang tải...</div>
      ) : (
        <div className="page-products">
          <h2 className="title">
            Kết quả tìm kiếm cho "<span>{location.state.search}"</span>
          </h2>
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

export default Search;
