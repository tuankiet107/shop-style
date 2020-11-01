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

function Search() {
  const location = useLocation();
  const [search, setSearch] = useState();
  const [products, setProducts] = useState({});
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

  function moreProduct(product) {
    history.push({
      pathname: "/product",
      search: `?id=${product.id}`,
      state: product,
    });
  }

  function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
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
        </Col>
      );
    });
  }

  return (
    <div>
      <Header />

      {search === undefined ? (
        <div className="page-loading">Loading...</div>
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
