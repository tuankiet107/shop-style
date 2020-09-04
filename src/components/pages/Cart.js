import React from "react";
import { connect, useSelector } from "react-redux";
import { productQuantity, clearProduct } from "../../actions/productQuantity";

import { Table } from "react-bootstrap";
import Header from "../views/Header";

function Cart({ productQuantity, clearProduct }) {
  let productsInCart = [];

  const basketProps = useSelector((state) => state.basketState);

  basketProps.products.forEach(function(item) {
    if (item.inCart === true) {
      productsInCart.push(item);
    }
  });

  productsInCart = productsInCart.map((product, index) => {
    return (
      <tr key={index}>
        <td>
          <i className="fas fa-trash" onClick={() => clearProduct(product)}></i>
        </td>
        <td>
          <img
            src={product.image}
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            alt=""
          />
        </td>
        <td>{product.name}</td>
        <td>{product.price}.000đ</td>
        <td>
          <span
            className="fas fa-minus"
            onClick={() => productQuantity("decrease", product)}
          ></span>
          <span>{product.numbers}</span>
          <span
            className="fas fa-plus"
            onClick={() => productQuantity("increase", product)}
          ></span>
        </td>
        <td>
          {product.numbers * product.price}.000đ
        </td>
      </tr>
    );
  });

  let totalPrice = basketProps.cartCost;

  return (
    <div>
      <Header />

      <div className="container">
        <div className="cart_inner">
          <Table style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{productsInCart}</tbody>
          </Table>

          <div className="subtotal">
            <h3>Subtotal: </h3>
            <span>{totalPrice}.000đ</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default connect(null, { productQuantity, clearProduct })(Cart);
