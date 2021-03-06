import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { ADD_PRODUCT_BASKET } from "../../actions/types";
import Footer from "../views/Footer";
import Header from "../views/Header";
import ConvertPrice from "../features/ConvertPrice";
import removeVietnameseTones from "../features/rmVietnameseTones";

function Search() {
  const location = useLocation();
  const [search, setSearch] = useState();
  const [products, setProducts] = useState({});
  const [size, setSize] = useState("S");
  const [sortBy, setSortBy] = useState("new");
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

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.getElementById("backToTop")) {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        document.getElementById("backToTop").style.display = "block";
      } else {
        document.getElementById("backToTop").style.display = "none";
      }
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

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

    listResult.sort(function (a, b) {
      return b.date - a.date;
    });

    switch (sortBy) {
      case "plus":
        listResult.sort(function (a, b) {
          if (a.priceDiscount) {
            return a.priceDiscount - b.price;
          } else if (b.priceDiscount) {
            return a.price - b.priceDiscount;
          } else if (a.priceDiscount && b.priceDiscount) {
            return a.priceDiscount - b.priceDiscount;
          } else {
            return a.price - b.price;
          }
        });
        break;
      case "minus":
        listResult.sort(function (a, b) {
          if (a.priceDiscount && b.priceDiscount) {
            return b.priceDiscount - a.priceDiscount;
          } else if (a.priceDiscount && !b.priceDiscount) {
            return b.price - a.priceDiscount;
          } else if (!a.priceDiscount && b.priceDiscount) {
            return b.priceDiscount - a.price;
          } else {
            return b.price - a.price;
          }
        });
        break;
      case "new":
        listResult.sort(function (a, b) {
          return b.date - a.date;
        });
        break;
      case "old":
        listResult.sort(function (a, b) {
          return a.date - b.date;
        });
        break;
      default:
        return products;
    }

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
          {product.quantity <= 0 ? (
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
          <div className="filter-sort d-flex justify-content-between">
            <h2 className="title">
              Kết quả tìm kiếm cho "<span>{location.state.search}"</span> (
              {listResult.length})
            </h2>

            <div className="sort-by">
              <Form.Group>
                <Form.Label>Bộ lọc</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue="new"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="new">Mới nhất</option>
                  <option value="old">Cũ nhất</option>
                  <option value="plus">Giá: Tăng dần</option>
                  <option value="minus">Giá: Giảm dần</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

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
      <div onClick={topFunction} id="backToTop">
        <i className="fas fa-arrow-up"></i>
      </div>
    </div>
  );
}

export default Search;
