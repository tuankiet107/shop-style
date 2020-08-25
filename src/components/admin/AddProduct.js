import React, { Component } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

import firebase from 'firebase';

export class AddProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      sex: '',
      image: '',
      price: null,
      quantity: null   
    }
  }

  handleChange = async (type, e) => {
    switch(type){
      case 'image':
        await this.setState({ image: e.target.files[0] })
        break;
      case 'id':
        await this.setState({ id: e.target.value })
        break;
      case 'name':
        await this.setState({ name: e.target.value })
        break;
      case 'sex':
        await this.setState({ sex: e.target.value })
        break;
      case 'quantity':
        await this.setState({ quantity: parseInt(e.target.value)})
        break;
      case 'price':
        await this.setState({ price: parseInt(e.target.value)})
        break;
      default:
        break;
    }
}

handleSubmit = async (e) => {
  e.preventDefault();
  const {history} = this.props;
  let {sex,image} = this.state;
  let obj = this.state;

  let imageName = image.name;

  let storageRef = firebase.storage().ref('images/'+imageName);

  let uploadTask = storageRef.put(image);

  console.log(this.state);
  
  let url;

  await uploadTask.on('state_changed', function(snapshot){
        let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("Upload is " + progress + " % done");
      },function(err){
          console.log(err.message)
        },function(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadUrl){
                  url = downloadUrl;
                  firebase
                    .firestore()
                    .collection('products')
                    .doc("wPi6Oe5LCwQKTJobOiB0")
                    .update({
                      [sex] : firebase.firestore.FieldValue.arrayUnion({...obj, image: url})
                    })
                    .then( () => {
                        history.push('/listProduct');
                    }, err => {
                        console.log(err);
                        this.setState({ signupError: 'Add product is not successfully!'})
                    })
            })
        })
  }

  render() {
    return (
      <Container className="add-product-page">
        <Form>
          <Form.Row>

            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
              <Form.Label>Name product</Form.Label>
              <Form.Control type="text" onChange={(e) => this.handleChange('name',e)} />
            </Col>
            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
              <Form.Label>Id</Form.Label>
              <Form.Control type="text" onChange={(e) => this.handleChange('id',e)} />
            </Col>
            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
              <Form.File
                className="position-relative"
                required
                name="file"
                label="File"
                onChange={(e) => this.handleChange('image',e)}
              />
          </Col>
          </Form.Row>

          <Form.Row>
            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" onChange={(e) => this.handleChange('price',e)} />
            </Col>

            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="text" onChange={(e) => this.handleChange('quantity',e)} />
            </Col>

            <Col xl={4} lg={4} md={12} sm={12} xs={12} className="form-group">
              <Form.Label>Sex</Form.Label>
              <Form.Control as="select" onChange={(e) => this.handleChange('sex',e)}>
                <option>men</option>
                <option>women</option>
              </Form.Control>
            </Col>
          </Form.Row>
          <Button variant="primary" type="button" onClick={this.handleSubmit}>
            Add
          </Button>
        </Form>
      </Container>
    );
  }
}

export default AddProduct;