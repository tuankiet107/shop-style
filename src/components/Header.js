import React, { Component } from 'react';
import Cart from './Cart';
import { Container, Row, Col} from 'react-bootstrap';
import { Nav, Navbar, NavDropdown, Dropdown} from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';

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
        return (
        <div style={{position: 'fixed', zIndex: '99999', width: '100%'}}>
            <Container fluid>
                <Row>

                    <Navbar className="header" style={{width:"100%", height: "auto"}} expand="lg" bg="light" variant="light">
                        <Navbar.Brand href="" style={{fontFamily: 'Audrey', fontSize: '2rem'}}>ShopStyle</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="m-auto p-2">
                                <Nav.Item>
                                    <Nav.Link href="">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="">About Us</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavDropdown title="Product" id="collasible-nav-dropdown">
                                        <Dropdown>
                                        <Dropdown.Toggle variant="" id="dropdown-basic"> Clothes </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Jackets</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Shirts</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">T-Shirts</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown>
                                        <Dropdown.Toggle variant="" id="dropdown-basic"> MEN/WOMEN </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Dress</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">T-Shirts</Dropdown.Item>
                                                <Dropdown.Item href="#/action-1">Jackets</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Trousers</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <Dropdown>
                                        <Dropdown.Toggle variant="" id="dropdown-basic"> ACCESSORIES </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Bags</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Sunglasses</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Fragrances</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Wallets</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="">Contact Us</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant="" onClick={this.closeFormSearch}>
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </Nav.Item>
                                <Nav.Item>

                                    <Cart />
                                
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
        )
    }
}


export default Header;