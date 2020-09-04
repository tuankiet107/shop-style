import React, { useState } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import firebase from "firebase";

function UpdateProduct(props) {
    const history = useHistory();
    const [value, setValue] = useState();
    const productSelected = props.location.state;
    let url;
    
    function handleChange(type, e){
        switch (type) {
            case "image":
              setValue({...value, image : e.target.files[0], nameStorage: e.target.files[0].name })
              break;
            case "id":
              setValue({...value, id: e.target.value })
              break;
            case "name":
              setValue({...value, name: e.target.value })
              break;
            case "sex":
              setValue({...value, sex: e.target.value })
              break;
            case "quantity":
              setValue({...value, quantity: parseInt(e.target.value) })
              break;
            case "price":
              setValue({...value, price: parseInt(e.target.value) })
              break;
            default:
              break;
        }
    }

    function handleSubmit(e){
        e.preventDefault();
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
                  [`products.${productSelected.id}`]: { ...value, image: url }
                })
                .then(
                  () => {
                    history.push("/listProduct");
                  },
                  (err) => {
                    console.log('Update is error ', err);
                  }
                );
            });
          }
        );
    }

    return (
        <Container className="add-product-page">
          <Form>
            <Form.Row>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Name product</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("name", e)}
                />
              </Col>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Id</Form.Label>
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
                  label="File"
                  onChange={(e) => handleChange("image", e)}
                />
              </Col>
            </Form.Row>

            <Form.Row>
              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("price", e)}
                />
              </Col>

              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange("quantity", e)}
                />
              </Col>

              <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
                <Form.Label>Sex</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handleChange("sex", e)}
                >
                  <option>...</option>
                  <option>men</option>
                  <option>women</option>
                </Form.Control>
              </Col>
            </Form.Row>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Update
            </Button>
          </Form>
        </Container>
    )
}

export default UpdateProduct