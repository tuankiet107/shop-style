import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { ADD_PRODUCT_BASKET } from "../../actions/types";
import Footer from "../views/Footer";
import Header from "../views/Header";
import ConvertPrice from "../features/ConvertPrice";
import Pagination from "../admin/Pagination";

function Discount() {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [size, setSize] = useState("S");
  const [sortBy, setSortBy] = useState("new");
  let sizes = ["S", "M", "L", "XL"];
  const dispatch = useDispatch();
  const history = useHistory();
  let products = [],
    result,
    lengthData;

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
        .then(async (doc) => {
          if (doc.exists) {
            const temp = await doc.data().products;
            Object.keys(temp).forEach((item) => {
              products.push(temp[item]);
            });
            setData(products);
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

  function paginateFn(pageNumber) {
    return setCurrentPage(pageNumber);
  }

  if (data) {
    data.forEach((item) => {
      if (item.discount) {
        products.push(item);
      }
    });
    lengthData = products.length;

    products.sort(function (a, b) {
      return b.date - a.date;
    });

    switch (sortBy) {
      case "plus":
        products.sort(function (a, b) {
          return a.priceDiscount - b.priceDiscount;
        });
        break;
      case "minus":
        products.sort(function (a, b) {
          return b.priceDiscount - a.priceDiscount;
        });
        break;
      case "new":
        products.sort(function (a, b) {
          return b.date - a.date;
        });
        break;
      case "old":
        products.sort(function (a, b) {
          return a.date - b.date;
        });
        break;
      default:
        return products;
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const curentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

  result = curentPosts.map((product) => {
    return (
      <Col
        className="info-product"
        xl={3}
        lg={4}
        md={4}
        sm={6}
        xs={6}
        key={product.id}
      >
        <span className="dis-percent">-{product.discount}%</span>
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

  return (
    <div>
      <Header />

      {data === undefined ? (
        <div className="page-loading">Đang tải...</div>
      ) : (
        <div className="page-products">
          <div className="filter-sort d-flex justify-content-between">
            <h2 className="title">Sản phẩm giảm giá ({lengthData})</h2>

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

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={lengthData}
            paginate={paginateFn}
          />

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

export default Discount;
