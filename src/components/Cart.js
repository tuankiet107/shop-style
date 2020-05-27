import React, { Component } from 'react';

import {NavDropdown, ListGroup} from 'react-bootstrap';

class Cart extends Component {

    render(){
        // let {items} = this.props;
        // let result = items.map((item,index) => {
        //     return  <ListGroup.Item key={index}>
        //                 <h6>{item.name}</h6>
        //                 <p>{item.quantity} - <span>{item.price}</span></p>
        //             </ListGroup.Item>
        // })
        return(
            <NavDropdown title={
                            <i className="fas fa-shopping-cart">
                                <span className="badge">{this.props.quantity}</span>
                            </i>
                        }
                        id="basic-nav-dropdown"
            >
            <ListGroup>
                {/* <ListGroup.Item>
                    <h6>Name</h6>
                    <p>1x - <span> 50$</span></p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h6>Name</h6>
                    <p>1x - <span> 50$</span></p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h6>Name</h6>
                    <p>1x - <span> 50$</span></p>
                </ListGroup.Item> */}

                {/* {result} */}

                <ListGroup horizontal style={{margin: '5px 15px'}}>
                        <button className="btn">VIEW CART</button>
                        <div className="total-price">Total: $1500</div>
                </ListGroup>
            </ListGroup>
            </NavDropdown>
        )
    }
}

  export default Cart;