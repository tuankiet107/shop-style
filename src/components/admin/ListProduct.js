import React, { useEffect, useState } from "react";
import { Container, Table, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import MenuLeft from "./MenuLeft";
import Swal from "sweetalert2";

function ListProduct() {
  const history = useHistory();
  const [data, setData] = useState(null);
  let products = [],
    result;
  const [type, setType] = useState("all");

  useEffect(() => {
    async function fetchDataFromDB() {
      firebase
        .firestore()
        .collection("products")
        .doc("veTsDR2nMSiv3ldp7J0F")
        .onSnapshot((doc) => {
          setData(doc.data().products);
        });
    }

    fetchDataFromDB();
  }, []);

  function onUpdate(value) {
    history.push({
      pathname: "/update-product",
      state: value,
    });
  }

  function onDelete(value) {
    let storageRef = firebase
      .storage()
      .ref()
      .child("images/" + value.nameStorage);
    storageRef
      .delete()
      .then(async function () {
        firebase
          .firestore()
          .collection("products")
          .doc("veTsDR2nMSiv3ldp7J0F")
          .update({
            [`products.${value.id}`]: firebase.firestore.FieldValue.delete(),
          });

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: "success",
          title: "Đã xóa sản phẩm",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function selectType(e) {
    setType(e.target.value);
  }

  function onPrevPage() {}

  if (data) {
    Object.keys(data).forEach((item) => {
      switch (type) {
        case "all":
          products.push(data[item]);
          break;
        case "discount":
          if (data[item].priceDiscount) {
            products.push(data[item]);
          }
          break;
        case data[item].sex:
          products.push(data[item]);
          break;
        default:
          break;
      }
    });

    products.sort(function (a, b) {
      return b.date - a.date;
    });

    result = products.map((product) => {
      return (
        <tr key={product.id}>
          <td className="image">
            <img src={product.image} alt="" />
            {product.discount ? (
              <span className="discount">Giảm giá {product.discount}%</span>
            ) : (
              ""
            )}
            <span className="id">Mã: {product.id}</span>
          </td>
          <td>{product.name}</td>
          <td>
            {product.priceDiscount ? (
              <p>{Math.ceil(product.priceDiscount)}.000đ</p>
            ) : (
              ""
            )}
            {product.priceDiscount ? (
              <span className="origin-price">{product.price}.000đ</span>
            ) : (
              <span>{product.price}.000đ</span>
            )}
          </td>
          {product.quantity <= 0 ? (
            <td style={{ color: "red" }}>Hết</td>
          ) : (
            <td>{product.quantity}</td>
          )}
          <td>
            <span className="btn-update" onClick={() => onUpdate(product)}>
              Sửa
            </span>
            <span className="btn-delete" onClick={() => onDelete(product)}>
              Xóa
            </span>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Row>
        <MenuLeft />

        <Col xl={10} lg={10} md={10} sm={10} style={{ marginLeft: "auto" }}>
          {data === null ? (
            <div className="page-loading">Page is loading...</div>
          ) : (
            <Container fluid className="list-product-page">
              <div className="custome">
                <Link to="/add-product" className="btn-plus-product">
                  <i className="fas fa-plus"> Thêm sản phẩm</i>
                </Link>
                <Form>
                  <span>Sắp xếp</span>
                  <Form.Control
                    as="select"
                    defaultValue="all"
                    onChange={selectType}
                  >
                    <option value="all">Tất cả</option>
                    <option value="men">Nam</option>
                    <option value="women">Nữ</option>
                    <option value="discount">Giảm giá</option>
                  </Form.Control>
                </Form>

                {/* <div className="btn-pagination">
                  <button className="btn-prev" onClick={onPrevPage}>
                    Trước
                  </button>
                  <button className="btn-next" onClick={onNextPage}>
                    Sau
                  </button>
                </div> */}
              </div>

              <Table style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>{result}</tbody>
              </Table>
            </Container>
          )}
        </Col>
      </Row>

      <a className="go-top-btn" href="#top">
        <i className="fas fa-arrow-up"></i>
      </a>
    </div>
  );
}

export default ListProduct;
