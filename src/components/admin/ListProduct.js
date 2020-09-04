import React, { useEffect, useState } from "react";
import { Container, Table, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import firebase from "firebase";
import Header from "../views/Header";

function ListProduct() {
  const history = useHistory();
  const [data, setData] = useState(null);
  let products = [], result;
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

  function onUpdate(value){
    history.push({
      pathname: '/updateProduct',
      state: value
    })
  }

  function onDelete(value) {
    let storageRef = firebase
      .storage()
      .ref()
      .child("images/" + value.nameStorage);
    storageRef
      .delete()
      .then(function () {
        firebase
          .firestore()
          .collection("products")
          .doc("veTsDR2nMSiv3ldp7J0F")
          .update({
            [`products.${value.id}`]: firebase.firestore.FieldValue.delete(),
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function selectType(e) {
    setType(e.target.value);
  }

  if (data) {
    Object.keys(data).filter((item) => {
      switch (type) {
        case "all":
          products.push(data[item]);
          break;
        case data[item].sex:
          products.push(data[item]);
          break;
        default:
          break;
      }
    });

    result = products.map((product) => {
      return (
        <tr key={product.id}>
          <td>
            <img src={product.image} alt="" />
          </td>
          <td>{product.name}</td>
          <td>${product.price}.00</td>
          <td>{product.quantity}</td>
          <td>
            <span className="btn btn-success" onClick={() => onUpdate(product)}>Edit</span>
            <span className="btn btn-danger" onClick={() => onDelete(product)}>
              Delete
            </span>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Header />

      <div>
        {data === null ? (
          <div className="page-loading">Page is loading...</div>
        ) : (
          <Container className="list-product-page">
            <div className="custome">
              <Link to="/addProduct" className="btn btn-primary">
                Add Product
              </Link>
              <Form>
                <span>Sort</span>
                <Form.Control
                  as="select"
                  defaultValue="all"
                  onChange={selectType}
                >
                  <option value="all">all</option>
                  <option value="men">men</option>
                  <option value="women">women</option>
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
              <tbody>{result}</tbody>
            </Table>
          </Container>
        )}
      </div>
    </div>
  );
}

export default ListProduct;