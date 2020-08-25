import React, { Component } from "react";
import { Container, Table, Form } from "react-bootstrap";

import { Link } from "react-router-dom";

import firebase from "firebase";

class ListProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    firebase
    .firestore()
    .collection("products")
    .doc("wPi6Oe5LCwQKTJobOiB0")
    .get()
    .then( doc => {
      this.setState({
        data: doc.data()
      })
    })
    .catch((err) => console.log(err));
  }

  render() {
    const {data} = this.state;
    let loading;
    let menProducts,womenProducts;
    if(data){
      menProducts = data.men.map(item => {
        return  <tr key={item.id}>
                  <td><img src={item.image} alt="" /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span className="btn btn-success">Edit</span>
                    <span className="btn btn-danger">Delete</span>
                  </td>
                </tr>
      })
      womenProducts = data.women.map(item => {
        return  <tr key={item.id}>
                  <td><img src={item.image} alt="" /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span className="btn btn-success">Edit</span>
                    <span className="btn btn-danger">Delete</span>
                  </td>
                </tr>
      })
    }else{
      loading = <div className="page-loading">Page is loading...</div>
    }
    return (
      <div>
        { 
          data === null ? 
          
          loading  : 
          
          <Container className="list-product-page">
            <div className="custome">
              <Link to="/addProduct" className="btn btn-primary">
                Add Product
              </Link>
              <Form>
                <Form.Control as="select" custom>
                  <option value="0">Men</option>
                  <option value="1">Women</option>
                </Form.Control>
              </Form>
            </div>
  
            <Table style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {menProducts}
                  {womenProducts}
              </tbody>
            </Table>
        </Container>
        }
      </div>
    );
  }
}

export default ListProduct;
