import firebase from "firebase";
import React, { Component } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import MenuLeft from "./MenuLeft";
import Swal from "sweetalert2";

class AddProduct extends Component {
  constructor(props) {
    super();
    this.state = {
      id: "",
      name: "",
      sex: "",
      image: "",
      price: "",
      quantity: "",
      nameStorage: "",
      date: "",
    };
  }

  handleChange = async (type, e) => {
    switch (type) {
      case "image":
        await this.setState({
          image: e.target.files[0],
          nameStorage: e.target.files[0].name,
          date: new Date(),
        });
        break;
      case "id":
        await this.setState({ id: e.target.value });
        break;
      case "name":
        await this.setState({ name: e.target.value });
        break;
      case "sex":
        await this.setState({ sex: e.target.value });
        break;
      case "quantity":
        await this.setState({ quantity: parseInt(e.target.value) });
        break;
      case "price":
        await this.setState({ price: parseInt(e.target.value) });
        break;
      default:
        break;
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    let { id, image, nameStorage } = this.state;
    let obj = this.state;
    let url;

    let storageRef = firebase.storage().ref("images/" + nameStorage);

    let uploadTask = storageRef.put(image);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " % done");
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
              [`products.${id}`]: { ...obj, image: url },
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

  render() {
    return (
      <Row>
        <MenuLeft />

        <Col xl={10} lg={10} md={10} sm={10} style={{ marginLeft: "auto" }}>
          <Container className="add-product-page">
            <h2>Thêm sản phẩm</h2>
            <Form>
              <Form.Row>
                <Col
                  xl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  className="form-group"
                >
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => this.handleChange("name", e)}
                  />
                </Col>
                <Col
                  xl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  className="form-group"
                >
                  <Form.Label>Id</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => this.handleChange("id", e)}
                  />
                </Col>
                <Col
                  xl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  className="form-group"
                >
                  <Form.File
                    className="position-relative"
                    required
                    name="file"
                    label="Ảnh"
                    onChange={(e) => this.handleChange("image", e)}
                  />
                </Col>
              </Form.Row>

              <Form.Row>
                <Col
                  xl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  className="form-group"
                >
                  <Form.Label>Giá (.000đ)</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => this.handleChange("price", e)}
                  />
                </Col>

                <Col
                  xl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  className="form-group"
                >
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => this.handleChange("quantity", e)}
                  />
                </Col>

                <Col
                  xl={4}
                  lg={4}
                  md={12}
                  sm={12}
                  xs={12}
                  className="form-group"
                >
                  <Form.Label>Giới tính</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => this.handleChange("sex", e)}
                  >
                    <option>Chọn...</option>
                    <option value="men">Nam</option>
                    <option value="women">Nữ</option>
                  </Form.Control>
                </Col>
              </Form.Row>
              <Button
                variant="primary"
                type="button"
                onClick={this.handleSubmit}
              >
                Thêm
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
}

export default AddProduct;
