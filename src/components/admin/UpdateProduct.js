import firebase from "firebase";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MenuLeft from "./MenuLeft";
import Swal from "sweetalert2";

import ConvertPrice from "../../routes/ConvertPrice";

function UpdateProduct(props) {
  const history = useHistory();
  const [value, setValue] = useState({});
  const productSelected = props.location.state;
  let url;
  let priceDiscount;

  function handleChange(type, e) {
    switch (type) {
      case "image":
        setValue({
          ...value,
          image: e.target.files[0],
          nameStorage: e.target.files[0].name,
          date: new Date(),
        });
        break;
      case "id":
        setValue({ ...value, id: e.target.value });
        break;
      case "name":
        setValue({ ...value, name: e.target.value });
        break;
      case "sex":
        setValue({ ...value, sex: e.target.value });
        break;
      case "quantity":
        setValue({ ...value, quantity: parseInt(e.target.value) });
        break;
      case "price":
        setValue({ ...value, price: parseInt(e.target.value) });
        break;
      case "discount":
        setValue({ ...value, discount: parseInt(e.target.value) });
        break;
      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    priceDiscount = value.price - (value.price * value.discount) / 100;
    let storageRef = firebase.storage().ref("images/" + value.nameStorage);
    let uploadTask = storageRef.put(value.image);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Update is " + progress + " % done");
      },
      function (err) {
        console.log(err.message);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
          url = downloadUrl;
          firebase
            .firestore()
            .collection("products")
            .doc("veTsDR2nMSiv3ldp7J0F")
            .update({
              [`products.${value.id}`]: {
                ...value,
                image: url,
                priceDiscount: Math.ceil(priceDiscount),
              },
            })
            .then(
              () => {
                if (value.id !== productSelected.id) {
                  firebase
                    .firestore()
                    .collection("products")
                    .doc("veTsDR2nMSiv3ldp7J0F")
                    .update({
                      [`products.${productSelected.id}`]: firebase.firestore.FieldValue.delete(),
                    });
                }
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                });
                history.push("/list-product");
                Toast.fire({
                  icon: "success",
                  title: "Đã cập nhât sản phẩm",
                });

                localStorage.removeItem("price");
                localStorage.removeItem("discount");
              },
              (err) => {
                console.log("Update is error ", err);
              }
            );
        });
      }
    );
  }

  return (
    <Row>
      <MenuLeft />

      <Col xl={10} lg={10} md={10} sm={10} style={{ marginLeft: "auto" }}>
        <Container className="update-product-page">
          <h1>Sản phẩm đang cập nhật</h1>
          <Table bordered style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Mã (Id)</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Giới tính</th>
                <th>Giảm giá</th>
              </tr>
            </thead>
            <tbody style={{ lineHeight: "100px" }}>
              <tr>
                <td>
                  <img
                    src={productSelected.image}
                    style={{ width: "100px", height: "100px" }}
                    alt=""
                  />
                </td>
                <td>{productSelected.name}</td>
                <td>{productSelected.id}</td>
                <td>{ConvertPrice(productSelected.price)}</td>
                <td>{productSelected.quantity}</td>
                <td>{productSelected.sex}</td>
                {productSelected.discount ? (
                  <td>{productSelected.discount} %</td>
                ) : (
                  <td>0 %</td>
                )}
              </tr>
            </tbody>
          </Table>

          <Form>
            <Form.Row>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("name", e)}
                />
              </Col>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Mã (Id)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("id", e)}
                />
              </Col>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.File
                  className="position-relative"
                  required
                  name="file"
                  label="Ảnh"
                  onChange={(e) => handleChange("image", e)}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("price", e)}
                />
              </Col>

              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("quantity", e)}
                />
              </Col>

              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handleChange("sex", e)}
                >
                  <option>Chọn...</option>
                  <option value="men">Nam</option>
                  <option value="women">Nữ</option>
                </Form.Control>
              </Col>

              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Giảm giá (%)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Only numbers or empty"
                  onChange={(e) => handleChange("discount", e)}
                />
              </Col>
            </Form.Row>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Cập nhật
            </Button>
          </Form>

          <Link to="/list-product">
            <i className="fas fa-chevron-left"></i> Quay về
          </Link>
        </Container>
      </Col>
    </Row>
  );
}

export default UpdateProduct;
