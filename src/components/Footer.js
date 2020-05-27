import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';

class Footer extends Component{
    render(){
        return(
            <div className="main-footer">
                <Container>
                <Row>
                    <Col lg="4" md="12" sm="12">
                        <div className="footer-widget">
                            <h4>About ShopStyle</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati quae aliquid aperiam impedit aut, quia ipsam quidem repudiandae, sunt numquam perspiciatis tempora ad maiores earum architecto natus, rerum voluptates.</p>
                            <ul>
                                <li>
                                    <i className="fab fa-facebook-square"></i>
                                </li>
                                <li>
                                    <i className="fab fa-youtube"></i>
                                </li>
                                <li>
                                    <i className="fab fa-whatsapp"></i>
                                </li>
                                <li>
                                    <i className="fab fa-google-plus-g"></i>
                                </li>
                                <li>
                                    <i className="fab fa-twitter"></i>
                                </li>
                            </ul>
                        </div>
                    </Col>

                    <Col lg="4" md="12" sm="12">
                        <div className="footer-link">
                            <h4>Information</h4>
                            <ul>
                                <li><a href="/">About Us</a></li>
                                <li><a href="/">Customer Service</a></li>
                                <li><a href="/">Our Sitemap</a></li>
                                <li><a href="/">Terms & Conditions</a></li>
                                <li><a href="/">Privacy Policy</a></li>
                                <li><a href="/">Delivery Information</a></li>
                            </ul>
                        </div>
                    </Col>

                    <Col lg="4" md="12" sm="12">
                        <div className="footer-link-contact">
                            <h4>Contact Us</h4>
                            <ul>
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>
                                    Address: 
                                    <a href="/"> 123ABC, Xuan Khanh, Can Tho City Ahihi</a>
                                </li>
                                <li>
                                    <i className="fas fa-phone-square"></i>
                                    Phone: 
                                    <a href="/"> 1234567890</a>
                                </li>
                                <li>
                                    <i className="fas fa-envelope"></i>
                                    Email: 
                                    <a href="/"> info@gmail.com</a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

export default Footer;