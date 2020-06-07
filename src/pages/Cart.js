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
        console.log(productsInCart);
    })

    productsInCart = productsInCart.map((product, index) => {        
        return (
            <tr key={index}>
                <td><i className="fas fa-times" onClick={() => clearProduct(product)}></i></td>
                <td><img src={product.image} style={{width: '50px', height: '50px'}} alt=""/></td>
                <td>{product.name}</td>
                <td>{product.price}.000đ</td>
                <td style={{width: '250px'}}>
                    <i className="fas fa-minus mr-5" onClick={() => productQuantity('decrease',product)}></i>
                    <span>{product.numbers}</span>
                    <i className="fas fa-plus ml-5" onClick={() => productQuantity('increase',product)}></i>
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
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
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