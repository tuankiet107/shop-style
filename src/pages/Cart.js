import React from 'react';
import { connect } from 'react-redux';
import { productQuantity, clearProduct } from '../actions/productQuantity';

import { Table } from 'react-bootstrap';

function Cart({basketProps, productQuantity, clearProduct}){      
    console.log(basketProps);

    let productsInCart = [];

    Object.keys(basketProps.products).forEach(function(item){
        console.log(item);
        console.log(basketProps.products[item].inCart);
        if(basketProps.products[item].inCart === true){
            productsInCart.push(basketProps.products[item])
        }
        console.log(productsInCart);
    })

    productsInCart = productsInCart.map((product, index) => {        
        return (
            <tr key={index}>
                <td><i className="fas fa-times" onClick={() => clearProduct(product.name)}></i></td>
                <td><img src={product.image} style={{width: '50px', height: '50px'}} alt=""/></td>
                <td>{product.name}</td>
                <td>{product.price}.00</td>
                <td style={{width: '250px'}}>
                    <i className="fas fa-minus mr-5" onClick={() => productQuantity('decrease',product.name)}></i>
                    <span>{product.numbers}</span>
                    <i className="fas fa-plus ml-5" onClick={() => productQuantity('increase',product.name)}></i>
                </td>
                <td style={{width: '250px'}}>${product.numbers * product.price}.00</td>
            </tr>
        )
    })
    
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
        </div>
    )
}



const mapStateToProps = state => {
    return {
        basketProps: state.basketState
    }
}

export default connect(mapStateToProps, {productQuantity, clearProduct})(Cart);