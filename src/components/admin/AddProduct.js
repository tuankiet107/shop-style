import firebase from "firebase";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MenuLeft from "./MenuLeft";
import Swal from "sweetalert2";

function AddProduct() {
  const [data, setData] = useState({
    id: "",
    name: "",
    sex: "",
    image: "",
    price: "",
    quantity: "",
    nameStorage: "",
    date: "",
  });
  const [now, setNow] = useState(0);
  const history = useHistory();

  const handleChange = async (type, e) => {
    switch (type) {
      case "image":
        await setData({
          ...data,
          image: e.target.files[0],
          nameStorage: e.target.files[0].name,
          date: new Date(),
        });
        break;
      case "id":
        await setData({ ...data, id: e.target.value });
        break;
      case "name":
        await setData({ ...data, name: e.target.value });
        break;
      case "sex":
        await setData({ ...data, sex: e.target.value });
        break;
      case "quantity":
        await setData({ ...data, quantity: parseInt(e.target.value) });
        break;
      case "price":
        await setData({ ...data, price: parseInt(e.target.value) });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { id, image, nameStorage } = data;
    let url;

    let storageRef = firebase.storage().ref("images/" + nameStorage);

    let uploadTask = storageRef.put(image);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + " % done");
        setNow(progress);
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
              [`products.${id}`]: { ...data, image: url },
            })
            .then(
              () => {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                });
                history.push("/list-product");
                Toast.fire({
                  icon: "success",
                  title: "Đã thêm sản phẩm",
                });
              },
              (err) => {
                console.log("Add is error ", err);
              }
            );
        });
      }
    );
  };

  if (data.id === "") {
    setData({ ...data, id: Math.random().toString(36).substr(2, 9) });
  }

  return (
    <Row>
      <MenuLeft />
      <Col xl={10} lg={10} md={10} sm={10} style={{ marginLeft: "auto" }}>
        <Container className="add-product-page">
          <h3>Thêm sản phẩm</h3>
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
                <Form.Label>Mã (Id) (Có thể bỏ trống)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("id", e)}
                />
              </Col>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.File
                  className="position-relative"
                  placeholder="Chọn ảnh"
                  required
                  name="file"
                  label="Ảnh"
                  onChange={(e) => handleChange("image", e)}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Giá (vnd)</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("price", e)}
                />
              </Col>

              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("quantity", e)}
                />
              </Col>

              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
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
            </Form.Row>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Thêm
            </Button>
          </Form>

          <Link to="/list-product">
            <i className="fas fa-chevron-left"></i> Quay về
          </Link>
        </Container>

        <ProgressBar now={now} label={`${now}%`} />
      </Col>
    </Row>
  );
}

export default AddProduct;
