import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ADD_PRODUCT_BASKET } from "../../actions/types";
import ConvertPrice from "../../routes/ConvertPrice";
import Header from "../views/Header";

function Details({ location }) {
  const dispatch = useDispatch();
  const product = location.state;

  return (
    <div className="detail-page">
      <Header />

      <Container>
        <Row className="product-detail-wrapper">
          <Col lg="7" md="7" sm="7" xs="7" id="image-product">
            <img src={product.image} alt="" />
          </Col>

          <Col lg="5" md="5" sm="5" xs="5" id="detail-product">
            <div className="product-title">
              <h1> {product.name} </h1>
              <span>Mã sản phẩm: {product.id} </span>
            </div>
            <div className="product-price">
              {product.priceDiscount ? (
                <div>
                  <span>Giá: {ConvertPrice(product.priceDiscount)} </span>
                  <span className="price-discount">
                    {ConvertPrice(product.price)}
                  </span>
                </div>
              ) : (
                <span>{ConvertPrice(product.price)}</span>
              )}
            </div>
            <div
              onClick={() =>
                dispatch({ type: ADD_PRODUCT_BASKET, payload: product })
              }
              className="btn-add-cart"
            >
              Add to cart
            </div>
          </Col>
          <div className="intro">
            <h3>Giới thiệu</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Details;
