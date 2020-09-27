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
              className="col-img"
              xl={4}
              lg={4}
              data-aos="zoom-in"
              data-aos-offset="600"
            >
              <img alt="" src={img} />
            </Col>
            <Col
              className="col-intro"
              xl={8}
              lg={8}
              md={12}
              sm={12}
              xs={12}
              data-aos="zoom-in"
              data-aos-offset="600"
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
