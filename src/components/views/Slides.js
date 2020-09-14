import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import girl from '../../img/girl_slider.png';

import AOS from 'aos';
import 'aos/dist/aos.css';

function Slides() {
    return (
        <div className="slider-area">
            <div className="single-slider">
                <Container>
                    <Row>
                        <Col data-aos="fade-out" className="hero_img" xl={6} lg={6} md={6} sm={6}>
                            <img src={girl} alt="" />
                        </Col>
                        <Col className="hero_caption" xl={5} lg={5} md={5} sm={5} 
                            data-aos="fade-up">
                            <span>50% discount</span>
                            <h1>Winter Collection</h1>
                            <p>Best Cloth Collection By 2020!</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
AOS.init({
  offset: 400,
  duration: 1000
});
export default Slides
