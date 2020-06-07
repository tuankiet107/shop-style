import { INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_PRODUCT } from './types';

export const productQuantity = (action, product) => {
    return(dispatch) => {
        console.log("Inside product Quantity");
        console.log("The action is ", action);
        console.log("The product name is ", product.name);

        dispatch({
            type: action === "increase" ? INCREASE_QUANTITY : DECREASE_QUANTITY,
            payload: product
        })
    }
}

export const clearProduct = (product) => {
    return(dispatch) => {
        console.log("Inside clear product");
        console.log("Product name: ", product.name);

        dispatch({
            type: CLEAR_PRODUCT,
            payload: product
        })
    }
}
