import React from 'react';
import { connect, useSelector } from 'react-redux';
import { productQuantity, clearProduct } from '../actions/productQuantity';

import { Table } from 'react-bootstrap';

function Cart({productQuantity, clearProduct}){

    let productsInCart = [];

    const basketProps = useSelector(state => state.basketState);

    Object.keys(basketProps.products).forEach(function(item){
        if(basketProps.products[item].inCart === true){
            productsInCart.push(basketProps.products[item])
        }
    })

    productsInCart = productsInCart.map((product, index) => {        
        return (
            <tr key={index}>
                <td><i className="fas fa-trash" onClick={() => clearProduct(product)}></i></td>
                <td><img src={product.image} style={{width: '50px', height: '50px'}} alt=""/></td>
                <td>{product.name}</td>
                <td>{product.price}.000đ</td>
                <td style={{width: '250px'}}>
                    <span className="fas fa-minus" onClick={() => productQuantity('decrease',product)}></span>
                    <span>{product.numbers}</span>
                    <span className="fas fa-plus" onClick={() => productQuantity('increase',product)}></span>
                </td>
                <td style={{width: '250px'}}>{product.numbers * product.price}.000đ</td>
            </tr>
        )
    })

    let totalPrice = basketProps.cartCost;
    
    return(
        <div className="container mt-5">
            <Table striped hover style={{textAlign: 'center'}}>
                <thead>
                    <tr>
                    <th></th>
                    <th>PRODUCTS</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    { productsInCart }    
                </tbody>

            </Table>

            <div className="total-price">
                <h3>Totals: </h3>
                <span>{totalPrice}.000đ</span>
            </div>
        </div>
    )
}


export default connect(null, {productQuantity, clearProduct})(Cart);