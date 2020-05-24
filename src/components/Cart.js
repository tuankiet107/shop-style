import React, { useState } from 'react';
import CartItem from './CartItem';
import { Row, Col, Toast, Button } from 'react-bootstrap';

function Cart() {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    // const [count, setCount] = useState(0);
    
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
                    <Button onClick={toggleShowA} variant className="d-flex pt-2">
                        <i className="fas fa-shopping-cart"></i>
                        <span class="badge">{count}</span>
                    </Button>
                </Col>
                <Col xs={10}>
                <Toast show={showA} onClose={toggleShowA} style={{height: 'auto', width: '270px',position: 'absolute',top: 0, zIndex: '2'}}>
                    <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                    />
                    </Toast.Header>
                    <Toast.Body>

                        <CartItem />

                    </Toast.Body>
                </Toast>
                </Col>
            </Row>
        </div>
    );
}

  export default Cart;