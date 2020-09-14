import React from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_PRODUCT, DECREASE_QUANTITY, INCREASE_QUANTITY } from '../../actions/types';
import Header from "../views/Header";


function Cart() {
  let productsInCart = [];

  const basketProps = useSelector((state) => state.basketState);
  const dispatch = useDispatch();

  basketProps.products.forEach(function(item) {
    productsInCart.push(item);
  });

  productsInCart = productsInCart.map((product, index) => {
    return (
      <tr key={index}>
        <td>
          <i className="fas fa-trash" 
            onClick={() => dispatch({ type: CLEAR_PRODUCT, payload: product})}>
          </i>
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
            onClick={() => dispatch({ type: DECREASE_QUANTITY, payload: product })}
          ></span>
          <span>{product.quantity}</span>
          <span
            className="fas fa-plus"
            onClick={() => dispatch({ type: INCREASE_QUANTITY, payload: product })}
          ></span>
        </td>
        <td>
          {product.quantity * product.price}.000đ
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

export default Cart;
