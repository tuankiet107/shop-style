import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT_BASKET } from "../../actions/types";

import { Link } from 'react-router-dom';
import Footer from '../views/Footer';

import axios from "axios";
import Header from "../views/Header";

function New() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getApiProducts() {
      try {
        const response = await axios.get(
          "https://5ed1c80d4e6d7200163a0b7e.mockapi.io/api/products"
        );
        const data = response.data;
        setProducts(data[2].new);
      } catch (error) {
        console.log("Failed to fetch api: ", error);
      }
    }

    getApiProducts();
  }, []);

  const dispatch = useDispatch();

  let result = products.map((product, index) => {
    return (
      <Col
        className="info-product"
        xl={4}
        lg={4}
        md={6}
        sm={6}
        xs={12}
        key={index}
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
  });
  return (
    <div>
        <Header />
        
        <div className="page-products">
          <h2 className="title">New</h2>
          <Container>
            <Row>{result}</Row>
          </Container>

          <Footer />

          <div className="footer-copyright">
            <p>
              All Rights Reserved. © 2020
              <Link to="/"> The Kstore </Link>
              Design By: Tuan Kiet
            </p>
          </div>
        </div>
    </div>
  );
}
export default New;
