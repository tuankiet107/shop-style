import React, { Component } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

import firebase from "firebase";
import Header from "../views/Header";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      sex: "",
      image: "",
      price: null,
      quantity: null,
      nameStorage: "",
      date: '',
      discount: ""
    };
  }

  handleChange = async (type, e) => {
    switch (type) {
      case "image":
        await this.setState({
          image: e.target.files[0],
          nameStorage: e.target.files[0].name,
          date: toString(new Date())
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
      case "discount":
        await this.setState({ discount: parseInt(e.target.value) });
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
              [`products.${id}`]: { ...obj, image: url }
            })
            .then(
              () => {
                history.push("/listProduct");
              },
              (err) => {
                console.log('Add is error ', err);
              }
            );
        });
      }
    );
  };

  render() {
    return (
      <div>
        <Header />

        <Container className="add-product-page">
          <Form>
            <Form.Row>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Name product</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => this.handleChange("name", e)}
                />
              </Col>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => this.handleChange("id", e)}
                />
              </Col>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.File
                  className="position-relative"
                  required
                  name="file"
                  label="File"
                  onChange={(e) => this.handleChange("image", e)}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => this.handleChange("price", e)}
                />
              </Col>

              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => this.handleChange("quantity", e)}
                />
              </Col>

              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Sex</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => this.handleChange("sex", e)}
                >
                  <option>...</option>
                  <option>men</option>
                  <option>women</option>
                </Form.Control>
              </Col>
              
              <Col xl={3} lg={3} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Only numbers or empty"
                  onChange={(e) => this.handleChange("discount", e)}
                />
              </Col>

            </Form.Row>
            <Button variant="primary" type="button" onClick={this.handleSubmit}>
              Add
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AddProduct;