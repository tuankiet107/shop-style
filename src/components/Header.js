import React, { Component } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { Nav, Navbar, NavDropdown, ListGroup} from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { Link } from "react-router-dom";

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            formSearch: false
        }
    }

    closeFormSearch = () => {
        this.setState({
            formSearch: !this.state.formSearch
        })
    }

    render(){
        const {basketProps} = this.props;

        let productsInCart = [];
        Object.keys(basketProps.products).forEach(function(item){
            if(basketProps.products[item].inCart === true){
                productsInCart.push(basketProps.products[item])
            }
        })

        productsInCart = productsInCart.map(function(product, index){
            return (
                <Link to="/cart" className="nav-link" key={index}>
                    <ListGroup.Item className="mini-cart">
                        <img src={product.image} style={{width: '50px', height: '50px'}} alt="" />
                        <div className="details">
                            <h6>{product.name}</h6>
                            <p>{product.numbers} - <span> ${product.price}</span></p>
                        </div>
                    </ListGroup.Item>
                </Link>
            )
        })        
        
        return (
        <header className="main-header">
        <div style={{position: 'fixed', zIndex: '99999', width: '100%'}}>
            <Container fluid>
                <Row>
                    <Navbar style={{width:"100%", height: "auto", background: '#ffff', borderBottom: '1px solid #D7D7D8'}} expand="lg">
                        <Link to="/"><Navbar.Brand style={{fontFamily: 'Audrey', fontSize: '2rem'}}>
                            ShopStyle
                        </Navbar.Brand></Link>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="m-auto p-2">
                                <Nav.Item>
                                    <Link to="/new" className="nav-link">New</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="/women" className="nav-link">Women</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Link to="/men" className="nav-link">Men</Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <a href="#contact" className="nav-link">Contact Us</a>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant="" onClick={this.closeFormSearch}>
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </Nav.Item>
                                <Nav.Item>

                                    <NavDropdown title={
                                                    <i className="fas fa-shopping-cart">
                                                        <span className="badge">{basketProps.basketNumbers}</span>
                                                    </i>
                                                }
                                                id="basic-nav-dropdown"
                                    >
                                        <ListGroup>
                                        
                                            { productsInCart }
                                            
                                        <ListGroup horizontal style={{margin: '5px 15px'}}>
                                                <button className="btn">BUY NOW</button>
                                        </ListGroup>
                                        </ListGroup>
                                    </NavDropdown>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
            
                </Row>
            </Container>

            <Form style={{ padding: '0 60px'}}
                className={(this.state.formSearch === false) ? 'closeFormSearch form-search' : 'form-search'}>
                <Row>
                    <Col  md="1" lg="1" >
                        <i className="fas fa-search"></i>
                    </Col>
                    <Col md="10" lg="10" >
                        <input type="text" name="search" placeholder="Search"/>
                    </Col>
                    <Col md="1" lg="1" >
                        <Button variant="" onClick={this.closeFormSearch}>
                            <i className="fas fa-times"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
        </header>
        )
    }
}

const mapStateToProps = state => ({
    basketProps: state.basketState
})

export default connect(mapStateToProps,null)(Header);