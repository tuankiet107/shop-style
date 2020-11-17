import React, { useEffect, useState } from "react";
import { Container, Table, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import MenuLeft from "./MenuLeft";
import Swal from "sweetalert2";

import ConvertPrice from "../../routes/ConvertPrice";
import Pagination from "./Pagination";

function ListProduct() {
  const history = useHistory();
  let products = [],
    result,
    lengthData;
  const [type, setType] = useState("all");
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    async function fetchDataFromDB() {
      firebase
        .firestore()
        .collection("products")
        .doc("veTsDR2nMSiv3ldp7J0F")
        .onSnapshot(async (doc) => {
          const temp = await doc.data().products;
          Object.keys(temp).forEach((item) => {
            products.push(temp[item]);
          });
          setData(products);
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

  function paginateFn(pageNumber) {
    return setCurrentPage(pageNumber);
  }

  if (data) {
    data.forEach((item) => {
      switch (type) {
        case "all":
          products.push(item);
          break;
        case "discount":
          if (item.priceDiscount) {
            products.push(item);
          }
          break;
        case item.sex:
          products.push(item);
          break;
        default:
          break;
      }
    });
    lengthData = products.length;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    products.sort(function (a, b) {
      return b.date - a.date;
    });

    const curentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

    result = curentPosts.map((product, index) => {
      return (
        <tr key={product.id}>
          <td>{index + 1}</td>
          <td className="image">
            <img src={product.image} alt="" />
            {product.discount ? (
              <span className="discount">Giảm giá {product.discount}%</span>
            ) : (
              ""
            )}
            <span className="id">Mã: {product.id}</span>
          </td>
          <td className="name-product">{product.name}</td>
          <td>
            {product.priceDiscount ? (
              <p>{ConvertPrice(Math.ceil(product.priceDiscount))}</p>
            ) : (
              ""
            )}
            {product.priceDiscount ? (
              <span className="origin-price">
                {ConvertPrice(product.price)}
              </span>
            ) : (
              <span>{ConvertPrice(product.price)}</span>
            )}
          </td>
          {product.quantity <= 0 ? (
            <td style={{ color: "red" }}>Hết</td>
          ) : (
            <td>
              <span>{product.quantity}</span>
            </td>
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
              </div>

              <Table style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>{result}</tbody>
              </Table>

              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={lengthData}
                paginate={paginateFn}
              />
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
