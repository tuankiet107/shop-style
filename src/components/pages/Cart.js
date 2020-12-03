import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  CLEAR_PRODUCT,
  DECREASE_QUANTITY,
  INCREASE_QUANTITY,
  WRITE_QUANTITY,
} from "../../actions/types";
import Header from "../views/Header";
import Footer from "../views/Footer";
import ConvertPrice from "../features/ConvertPrice";

function Cart() {
  let productsInCart = [];
  const basketProps = useSelector((state) => state.basketState);
  const dispatch = useDispatch();
  const history = useHistory();
  const [qtyInput, setQtyInput] = useState();

  basketProps.products.forEach(function (item) {
    productsInCart.push(item);
  });

  function onCheckoutFn() {
    if (basketProps.products.length >= 1) {
      history.push("/checkouts");
    } else {
      alert("Vui lòng chọn sản phẩm trước khi thanh toán.");
    }
  }

  function onMinusQtyFn(product) {
    if (product.quantity <= 1) {
      dispatch({ type: CLEAR_PRODUCT, payload: product });
    } else {
      dispatch({ type: DECREASE_QUANTITY, payload: product });
    }
  }

  // function handleChangeQty(e, product) {
  //   setQtyInput(e.target.value);
  //   dispatch({ type: WRITE_QUANTITY, payload: product, quantity: qtyInput });
  // }

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
          <div className="header-item">
            <h3>{product.name}</h3>
            <div className="size"> size: {product.size}</div>
          </div>
          {product.priceDiscount ? (
            <p>{ConvertPrice(product.priceDiscount)}</p>
          ) : (
            <p>{ConvertPrice(product.price)}</p>
          )}
          <div className="qty-parent">
            <span>{product.quantity}</span>
            {/* <input
              type="number"
              onChange={(e) => handleChangeQty(e, product)}
            /> */}
            <div className="btn-qty">
              <span
                className="fas fa-plus"
                onClick={() =>
                  dispatch({ type: INCREASE_QUANTITY, payload: product })
                }
              ></span>
              <span
                className="fas fa-minus"
                onClick={() => onMinusQtyFn(product)}
              ></span>
            </div>
          </div>
          {product.priceDiscount ? (
            <p className="price">
              {ConvertPrice(product.quantity * product.priceDiscount)}
            </p>
          ) : (
            <p className="price">
              {ConvertPrice(product.quantity * product.price)}
            </p>
          )}
        </td>

        <td className="remove">
          <i
            className="fas fa-trash"
            onClick={() => dispatch({ type: CLEAR_PRODUCT, payload: product })}
          ></i>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Header />

      <div className="container main-cart">
        <div className="header-page">
          <h1>Giỏ hàng của bạn</h1>
          <p className="count-cart">
            Có {basketProps.basketNumbers === 0 ? 0 : basketProps.basketNumbers}{" "}
            sản phẩm trong giỏ hàng
          </p>
        </div>

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
            <h3>Tổng tiền: </h3>
            <span>{ConvertPrice(basketProps.cartCost)}</span>
          </div>

          <button onClick={onCheckoutFn} className="btn btn-checkout">
            Thanh toán
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;
