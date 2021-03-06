import React from "react";
import { Link } from "react-router-dom";

import img from "../../img/women.png";

import { Container, Row, Col } from "react-bootstrap";

function Women() {
  return (
    <Container fluid>
      <div className="category">
        <div className="product-wrapper">
          <Row>
            <Col
              className="col-img col-4"
              xl={4}
              lg={4}
              md={4}
              sm={4}
              xs={4}
              data-aos="zoom-in"
              data-aos-offset="500"
            >
              <img alt="" src={img} />
            </Col>
            <Col
              className="col-intro col-8"
              xl={8}
              lg={8}
              md={8}
              sm={8}
              xs={8}
              data-aos="zoom-in"
              data-aos-offset="500"
              data-aos-delay="500"
            >
              <div className="intro-product">
                <h1>Thời trang nữ</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Reiciendis, expedita?
                </p>
              </div>
              <Link to="/women" className="btn">
                Mua ngay
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
}
export default Women;
