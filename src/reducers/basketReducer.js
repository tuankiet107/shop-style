import { ADD_PRODUCT_BASKET, 
    GET_NUMBERS_BASKET, 
    INCREASE_QUANTITY, 
    DECREASE_QUANTITY, 
    CLEAR_PRODUCT
} from '../actions/types';

import girl1 from '../img/girls/img1.jpg';
import girl2 from '../img/girls/img2.webp';
import girl3 from '../img/girls/img3.webp';
import girl4 from '../img/girls/img4.webp';
import girl5 from '../img/girls/img5.jpg';
import girl6 from '../img/girls/img6.jpg';

import boy1 from '../img/boys/img1.webp';
import boy2 from '../img/boys/img2.webp';
import boy3 from '../img/boys/img3.webp';
import boy4 from '../img/boys/img4.webp';
import boy5 from '../img/boys/img5.webp';
import boy6 from '../img/boys/img6.webp';

import new1 from '../img/new/new1.webp';
import new2 from '../img/new/new2.webp';
import new3 from '../img/new/new3.webp';
import new4 from '../img/new/new4.jpg';
import new5 from '../img/new/new5.webp';
import new6 from '../img/new/new6.webp';

const initialState = {
    basketNumbers: 0,
    cartCost: 0,
    products: {
        Kaymbo: {
            id: "91e00493-6c62-4e1a-ad2c-54d380d2c904",
            name: "Kaymbo",
            price: 24.00,
            image: girl1,
            numbers: 0,
            inCart: false
        },
        Realbuzz: {
            id: "a5b8f2a3-83b5-4cbd-b1b0-4d422779b29a",
            name: "Realbuzz",
            price: 31.00,
            image: girl2,
            numbers: 0,
            inCart: false
        },
        Photobug: {
            id: "c1235be2-1c47-4ca2-aa21-18ef9435953b",
            name: "Photobug",
            price: 28.00,
            image: girl3,
            numbers: 0,
            inCart: false
        },
        Oyoyo: {
            id: "66b0908b-7846-4079-85a2-13d0dd155cbe",
            name: "Oyoyo",
            price: 48.00,
            image: girl4,
            numbers: 0,
            inCart: false
        },
        Photobean: {
            id: "35601403-06a5-439f-b90a-5e17909ba3da",
            name: "Photobean",
            price: 67.00,
            image: girl5,
            numbers: 0,
            inCart: false
        },
        Blackbean: {
            id: "356sf03-061-439f-050a-3d0ddasfd",
            name: "Blackbean",
            price: 67.00,
            image: girl6,
            numbers: 0,
            inCart: false
          },
        Photocat: {
            id: "83eccdfe-753c-41bb-99f8-69d42f3bf892",
            name: "Photocat",
            price: 19.00,
            image: boy1,
            numbers: 0,
            inCart: false,
          }, 
        Dabjam: {
            id: "37f16990-6173-4789-b911-046bd3c75aab",
            name: "Dabjam",
            price: 45.00,
            image: boy2,
            numbers: 0,
            inCart: false
          }, 
        Fivespan: {
            id: "e40a2186-d52c-4a39-a24f-491801e50317",
            name: "Fivespan",
            price: 45.00,
            image: boy3,
            numbers: 0,
            inCart: false
          },
        Trilith: {
            id: "a8cb4b55-4cdb-4cc4-9f59-84fa107df631",
            name: "Trilith",
            price: 15.00,
            image: boy4,
            numbers: 0,
            inCart: false
          },
        Triple: {
            id: "a84bfsaf-4casf-4cfas-9f00-fasfajsfassf",
            name: "Triple",
            price: 85.00,
            image: boy5,
            numbers: 0,
            inCart: false
          },
        Banana: {
            id: "fasfasfsaf-jfj6u-4cfas-0100-1asf5sfas5",
            name: "Banana",
            price: 40.00,
            image: boy6,
            numbers: 0,
            inCart: false
        },
        Chocolate: {
            id: "a20105e4-d876-453d-8a46-67ae409e2ad8",
            name: "Chocolate",
            image: new1,
            price: 10.00,
            numbers: 0,
            inCart: false,
            heart: false
        }, 
        Oakridge: {
            id: "19d3b2aa-d3e2-446e-84b0-8667eebe355a",
            name: "Oakridge",
            image: new2,
            price: 20.00,
            numbers: 0,
            inCart: false,
            heart: false
        }, 
        Noodles: {
            id: "7a380483-e7bb-4f31-9b4c-60eca76de5bc",
            name: "Noodles",
            image: new3,
            price: 30.00,
            numbers: 0,
            inCart: false,
            heart: false
        }, 
        BayLeaf: {
            id: "2e571dc1-8492-486e-bdf8-e1d510cf8534",
            name: "BayLeaf",
            image: new4,
            price: 40.00,
            numbers: 0,
            inCart: false,
            heart: false
        }, 
        Pastry: {
            id: "2678270f-b040-458e-8116-a8c351455ef0",
            name: "Pastry",
            image: new5,
            price: 50.00,
            numbers: 0,
            inCart: false,
            heart: false
        }, 
        LongGrain: {
            id: "bcbc1e58-47c7-430f-baaa-d594b28fe08d",
            name: "LongGrain",
            image: new6,
            price: 60.00,
            numbers: 0,
            inCart: false,
            heart: false
        }
    }
}

export default (state = initialState, action) => {
    let productSelected = "";
    switch(action.type){
        case ADD_PRODUCT_BASKET:
            productSelected = {...state.products[action.payload]}
            productSelected.numbers += 1;
            productSelected.inCart = true;
            
            return {
                ...state, // trải state ra để update các state con 
                basketNumbers: state.basketNumbers + 1,
                cartCost: state.cartCost + state.products[action.payload].price, // state.products[action.payload].price để cộng giá tiền sp đó
                products: { // update products trong giỏ hàng chỉ gồm những sp đc click 
                    ...state.products,
                    [action.payload]: productSelected
                }
            }
        case GET_NUMBERS_BASKET:
            return {...state};
        case INCREASE_QUANTITY:
            productSelected = {...state.products[action.payload]};
            productSelected.numbers += 1;
            return {
                ...state,
                basketNumbers: state.basketNumbers + 1,
                cartCost: state.cartCost + state.products[action.payload].price,
                products: {
                    ...state.products,
                    [action.payload]: productSelected
                }
            };
        case DECREASE_QUANTITY:
            productSelected = {...state.products[action.payload]};
            let newCartCost = 0;
            let newBasketNumbers = 0;
            if(productSelected.numbers === 0){
                productSelected.numbers = 0;
                newCartCost = state.cartCost
                newBasketNumbers = state.basketNumbers
            } else {
                productSelected.numbers -= 1;
                newCartCost = state.cartCost - state.products[action.payload].price;
                newBasketNumbers = state.basketNumbers - 1;
            }
            return {
                ...state,
                basketNumbers: newBasketNumbers,
                cartCost: newCartCost,
                products: {
                    ...state.products,
                    [action.payload]: productSelected
                }
            };
        case CLEAR_PRODUCT:
            productSelected = {...state.products[action.payload]};
            let numbersBackup = productSelected.numbers;
            productSelected.numbers = 0;
            productSelected.inCart = false;
            return {
                ...state,
                basketNumbers: state.basketNumbers - numbersBackup,
                cartCost: state.cartCost - ( numbersBackup * productSelected.price ),
                products: {
                    ...state.products,
                    [action.payload]: productSelected
                }
            }
        default:
            return state;
    }
}