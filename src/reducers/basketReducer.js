import { ADD_PRODUCT_BASKET, 
    INCREASE_QUANTITY, 
    DECREASE_QUANTITY, 
    CLEAR_PRODUCT
} from '../actions/types';

import axios from 'axios';

const initialState = {
    basketNumbers: 0,
    cartCost: 0,
    products: 
    [
        {
            "id": "tttttttegfa1",
            "name": "Shirt",
            "price": 4,
            "image": "https://i.pinimg.com/564x/dc/fb/a2/dcfba2a3c0f7f2e4285feb48efb36f26.jpg",
            "numbers": 0,
            "inCart": false
          },
          {
            "id": "24444444tget",
            "name": "Shoes",
            "price": 46,
            "image": "https://i.pinimg.com/564x/a9/36/3f/a9363f3ff0c628426d68180d1e60d39f.jpg",
            "numbers": 0,
            "inCart": false
          },
          {
            "id": "3hhhhhhhhhhhsgf",
            "name": "Bacon",
            "price": 89,
            "image": "https://i.pinimg.com/564x/cf/fe/2a/cffe2a099ff419f869790fb5843f3efe.jpg",
            "numbers": 0,
            "inCart": false
          },
          {
            "id": "4777777775yy5g",
            "name": "Soap",
            "price": 42,
            "image": "https://i.pinimg.com/564x/ab/53/55/ab5355be225cd517d28be0de023d3871.jpg",
            "numbers": 0,
            "inCart": false
          },
          {
            "id": "5assssssds",
            "name": "Cheese",
            "price": 19,
            "image": "https://i.pinimg.com/564x/ef/4e/0b/ef4e0b760a19b6a5404f92c57a19cdaf.jpg",
            "numbers": 0,
            "inCart": false
          },
          {
            "id": "6sssssssssffffffffsf",
            "name": "Soap",
            "price": 24,
            "image": "https://i.pinimg.com/564x/06/ae/16/06ae1616d931fc54011f3012edb5dc3c.jpg",
            "numbers": 0,
            "inCart": false
          },
        {
            "id": "1faskfjasf",
            "name": "name 1",
            "price": 51,
            "image": "https://i.pinimg.com/564x/83/9f/d3/839fd3f0d22c6eea27d1ccaa77bb722e.jpg",
            "numbers": 0,
            "inCart": false
        },
        {
            "id": "2fasfasggd",
            "name": "name 2",
            "price": 30,
            "image": "https://i.pinimg.com/564x/2e/aa/dd/2eaadd83a29543bfed7a920280c94818.jpg",
            "numbers": 0,
            "inCart": false
        },
        {
            "id": "3bvbfhfhfdaf",
            "name": "name 3",
            "price": 26,
            "image": "https://i.pinimg.com/564x/aa/6d/83/aa6d83808165fb25e0b8a1d958cda5e6.jpg",
            "numbers": 0,
            "inCart": false
        },
        {
            "id": "4fasfsfewsay",
            "name": "name 4",
            "price": 69,
            "image": "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67050513_99.jpg?ts=1573828488276&imwidth=508&imdensity=2",
            "numbers": 0,
            "inCart": false
        },
        {
            "id": "5fasfy575iuka",
            "name": "name 5",
            "price": 20,
            "image": "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67010505_37.jpg?ts=1576488844293&imwidth=508&imdensity=2",
            "numbers": 0,
            "inCart": false
        },
        {
            "id": "6a45651asafsas",
            "name": "name 6",
            "price": 32,
            "image": "https://st.mngbcn.com/rcs/pics/static/T6/fotos/S20/67000588_99.jpg?ts=1574681709606&imwidth=508&imdensity=2",
            "numbers": 0,
            "inCart": false
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

            console.log(productSelected);
            
            return {
                ...state, // trải state ra để update các state con 
                basketNumbers: state.basketNumbers + 1,
                cartCost: state.cartCost + productSelected.price, // productSelected.price để cộng giá tiền sp đó
                products: [ // update products trong giỏ hàng chỉ gồm những sp đc click 
                    ...state.products
                ]
            }

        case INCREASE_QUANTITY:
            productSelected = state.products.find(product => product.id === action.payload.id);

            productSelected.numbers += 1;
            console.log(productSelected);
            
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
                newCartCost = state.cartCost;
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