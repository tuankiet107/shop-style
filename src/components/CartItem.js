import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap';

class CartItem extends Component {
    render(){
        return(
            <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>

            <ListGroup horizontal style={{margin: '5px 15px'}}>
                    <button className="btn">VIEW CART</button>
                    <div className="total-price">Total: $1500</div>
            </ListGroup>
            
            </ListGroup>
        )
    }
}

export default CartItem;