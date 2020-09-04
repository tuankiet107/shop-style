import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT_BASKET } from "../../actions/types";

import { Link } from 'react-router-dom';
import Header from "../views/Header";
import Footer from '../views/Footer';

import firebase from "firebase";

function Women() {
  const [data, setData] = useState(null);
  let listProducts = [];
  let result;

  useEffect(() => {
    async function fetchDataFromDB(){
      firebase
      .firestore()
      .collection("products")
      .doc("veTsDR2nMSiv3ldp7J0F")
      .get()
      .then( doc => {
        if(doc.exists){
          setData(doc.data().products);
        }else{
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      })
  }

    fetchDataFromDB();
  }, []);

  const dispatch = useDispatch();

  if(data){
    Object.keys(data).filter(item => {
      if(data[item].sex === 'women'){
        listProducts.push(data[item])
      }
    })
  }

  result = listProducts.map(product => {
    return (
      <Col
        className="info-product"
        xl={4}
        lg={4}
        md={6}
        sm={6}
        xs={12}
        key={product.id}
      >
        <img alt="" src={product.image} />
        <div className="details">
          <span>{product.name}</span>
          <span>{product.price}.000đ</span>
        </div>
        <div className="overlay"></div>
        <div
          onClick={() =>
            dispatch({ type: ADD_PRODUCT_BASKET, payload: product })
          }
          className="button"
        >
          <span> Add to cart </span>
        </div>
      </Col>
    );
  })

  return (
    <div>
      <Header />
      {
        data === null ? 
        
          <div className="page-loading">Page is loading...</div>  :

          <div className="page-products">
            <h2 className="title">Men</h2>
            <Container>
              <Row>{result}</Row>
            </Container>

            <Footer />

            <div className="footer-copyright">
                <p>
                All Rights Reserved. © 2020  
                <Link to="/"> The Kstore  </Link>
                Design By: Tuan Kiet
                </p>
            </div>
          </div>
      }
    </div>
  );
}

export default Women;
