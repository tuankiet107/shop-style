import { ADD_PRODUCT_BASKET, 
    INCREASE_QUANTITY, 
    DECREASE_QUANTITY, 
    CLEAR_PRODUCT
} from '../actions/types';

const initialState = {
    basketNumbers: 0,
    cartCost: 0,
    products: [
      {
        "id": "men1",
        "name": "name 1",
        "price": 51,
        "image": "https://i.pinimg.com/564x/83/9f/d3/839fd3f0d22c6eea27d1ccaa77bb722e.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "men2",
        "name": "name 2",
        "price": 30,
        "image": "https://i.pinimg.com/564x/2e/aa/dd/2eaadd83a29543bfed7a920280c94818.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "men3",
        "name": "name 3",
        "price": 26,
        "image": "https://i.pinimg.com/564x/39/a4/5b/39a45b54d9cb0d60b904656151cd9ac2.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "men4",
        "name": "name 4",
        "price": 69,
        "image": "https://i.pinimg.com/564x/fa/d5/df/fad5df15926373bf4c9a440de4c558bf.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "men5",
        "name": "name 5",
        "price": 20,
        "image": "https://i.pinimg.com/564x/53/ba/be/53babe8251a397733775d4d60899a708.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "men6",
        "name": "name 6",
        "price": 32,
        "image": "https://i.pinimg.com/564x/bd/aa/88/bdaa8842b68645f23a9abf10379a2c43.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "women1",
        "name": "Shirt",
        "price": 4,
        "image": "https://i.pinimg.com/564x/dc/34/9f/dc349f3275d75505405e41077e5db099.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "women2",
        "name": "Bacon",
        "price": 89,
        "image": "https://i.pinimg.com/564x/07/c1/94/07c194f7be42968f8e435b52de41d771.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "women3",
        "name": "Soap",
        "price": 42,
        "image": "https://i.pinimg.com/564x/ab/53/55/ab5355be225cd517d28be0de023d3871.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "women4",
        "name": "Cheese",
        "price": 19,
        "image": "https://i.pinimg.com/564x/ef/4e/0b/ef4e0b760a19b6a5404f92c57a19cdaf.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "women5",
        "name": "Soap",
        "price": 24,
        "image": "https://i.pinimg.com/564x/dc/fb/a2/dcfba2a3c0f7f2e4285feb48efb36f26.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "women6",
        "name": "Shoes",
        "price": 46,
        "image": "https://i.pinimg.com/564x/cf/fe/2a/cffe2a099ff419f869790fb5843f3efe.jpg",
        "numbers": 0,
        "inCart": false
      },
      {
        "id": "new1",
        "name": "Steel",
        "price": 28,
        "image": "https://i.pinimg.com/564x/0e/c7/43/0ec7438397829070cf700e77751463c9.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "new2",
        "name": "Rubber",
        "price": 57,
        "image": "https://i.pinimg.com/564x/09/9b/1c/099b1c6bb7288b65938d9e26c512dc84.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "new3",
        "name": "Fresh",
        "price": 31,
        "image": "https://i.pinimg.com/564x/fa/ea/1d/faea1d351e107c99ff353d6b53053d27.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "new4",
        "name": "Granite",
        "price": 82,
        "image": "https://i.pinimg.com/564x/16/67/95/166795527d67b7b3c38ef2d7c7809d44.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "new5",
        "name": "Fresh",
        "price": 51,
        "image": "https://i.pinimg.com/564x/37/92/25/379225a034b69dc5ae7326b9c689b4fb.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      },
      {
        "id": "new6",
        "name": "Plastic",
        "price": 35,
        "image": "https://i.pinimg.com/564x/8e/c7/e2/8ec7e2cf9f091ec4c8a6cc0b27e5baba.jpg",
        "numbers": 0,
        "inCart": false,
        "heart": false
      }
    ]
}

export default (state = initialState, action) => {
    let productSelected = "";
    switch(action.type){
        case ADD_PRODUCT_BASKET:
            productSelected = state.products.find(product => product.id === action.payload.id);
            productSelected.numbers += 1;
            productSelected.inCart = true;
            
            return {
                ...state, // trải state ra để update các state con 
                basketNumbers: state.basketNumbers + 1,
                cartCost: state.cartCost + productSelected.price, // productSelected.price để cộng giá tiền sp đó
                products: [ // update products trong giỏ hàng chỉ gồm những sp đc click 
                    ...state.products, // spread để clone ra giá trị mới
                ]
            }

        case INCREASE_QUANTITY:
            productSelected = state.products.find(product => product.id === action.payload.id);
            productSelected.numbers += 1;
            return {
                ...state,
                basketNumbers: state.basketNumbers + 1,
                cartCost: state.cartCost + productSelected.price,
                products: [
                    ...state.products
                ]
            };

        case DECREASE_QUANTITY:
            productSelected = state.products.find(product => product.id === action.payload.id);
            let newCartCost = 0;
            let newBasketNumbers = 0;
            if(productSelected.numbers === 0){
                productSelected.numbers = 0;
                newCartCost = state.cartCost
                newBasketNumbers = state.basketNumbers
            } else {
                productSelected.numbers -= 1;
                newCartCost = state.cartCost - productSelected.price;
                newBasketNumbers = state.basketNumbers - 1;
            }
            return {
                ...state,
                basketNumbers: newBasketNumbers,
                cartCost: newCartCost,
                products: [
                    ...state.products
                ]
            };

        case CLEAR_PRODUCT:
            productSelected = state.products.find(product => product.id === action.payload.id);
            let numbersBackup = productSelected.numbers;
            productSelected.numbers = 0;
            productSelected.inCart = false;
            return {
                ...state,
                basketNumbers: state.basketNumbers - numbersBackup,
                cartCost: state.cartCost - ( numbersBackup * productSelected.price ),
                products: [
                    ...state.products
                ]
            }
            
        default:
            return state;
    }
}