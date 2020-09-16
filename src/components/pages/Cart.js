import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
        <td className="image">
          <img
            src={product.image}
            style={{ width: "100px", height: "100px" }}
            alt=""
          />
        </td>

        <td className="item">
          <h3>{product.name}</h3>
          <p>${product.price}.00</p>
          <div className="qty-parent">
              <span
                className="fas fa-minus"
                onClick={() => dispatch({ type: DECREASE_QUANTITY, payload: product })}
              ></span>
              <span>{product.quantity}</span>
              <span
                className="fas fa-plus"
                onClick={() => dispatch({ type: INCREASE_QUANTITY, payload: product })}
              ></span>
          </div>
          <p className="price">${product.quantity * product.price}.00</p>
        </td>

        <td className="remove">
          <i className="fas fa-trash" 
            onClick={() => dispatch({ type: CLEAR_PRODUCT, payload: product})}>
          </i>
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
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{productsInCart}</tbody>
          </table>

          <div className="subtotal">
            <h3>Subtotal: </h3>
            <span>${totalPrice}.00</span>
          </div>

          <Link to="/checkouts" className="btn btn-checkout">Checkout</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
