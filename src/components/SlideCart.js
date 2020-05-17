import React, { useState } from 'react';
import { Row, Col, Toast, Button, ListGroup } from 'react-bootstrap';

function SlideCart() {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    
    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative',
                width: '130px'
            }} >
            <Row style={{flexWrap: 'nowrap'}}>
                <Col xs={2} style={{maxWidth: 'none'}}>
                    <Button onClick={toggleShowA} variant>
                        <i className="fas fa-shopping-cart"></i>
                    </Button>
                </Col>
                <Col xs={10}>
                <Toast show={showA} onClose={toggleShowA} style={{height: '300px', width: '270px',position: 'absolute',top: 0, zIndex: '2'}}>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    </Toast.Header>
                    <Toast.Body>
                        <ListGroup horizontal>
                                <button className="btn">VIEW CART</button>
                                <div className="total-price">Total: $1500</div>
                        </ListGroup>
                    </Toast.Body>
                </Toast>
                </Col>
            </Row>
        </div>
    );
}

  export default SlideCart