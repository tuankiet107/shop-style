import { ADD_PRODUCT_BASKET, 
    GET_NUMBERS_BASKET, 
    INCREASE_QUANTITY, 
    DECREASE_QUANTITY, 
    CLEAR_PRODUCT
} from '../actions/types';

const initialState = {
    basketNumbers: 0,
    cartCost: 0,
    products: {
        Kaymbo: {
            id: "91e00493-6c62-4e1a-ad2c-54d380d2c904",
            name: "Kaymbo",
            price: 24.00,
            image: "https://s1.thcdn.com/productimg/1600/1600/11676398-1394552253457309.png",
            numbers: 0,
            inCart: false
        },
        Realbuzz: {
            id: "a5b8f2a3-83b5-4cbd-b1b0-4d422779b29a",
            name: "Realbuzz",
            price: 31.00,
            image: "https://www.netclipart.com/pp/m/107-1073546_clipart-clothes-jumper-cute-outfits-niche-png.png",
            numbers: 0,
            inCart: false
        },
        Photobug: {
            id: "c1235be2-1c47-4ca2-aa21-18ef9435953b",
            name: "Photobug",
            price: 28.00,
            image: "https://s1.thcdn.com/productimg/1600/1600/11676434-1924552259011185.png",
            numbers: 0,
            inCart: false
        },
        Oyoyo: {
            id: "66b0908b-7846-4079-85a2-13d0dd155cbe",
            name: "Oyoyo",
            price: 48.00,
            image: "https://i.pinimg.com/736x/3a/c7/ca/3ac7ca6edbf529d834e148c5fa44d818.jpg",
            numbers: 0,
            inCart: false
        },
        Photobean: {
            id: "35601403-06a5-439f-b90a-5e17909ba3da",
            name: "Photobean",
            price: 67.00,
            image: "https://i.pinimg.com/originals/17/d6/46/17d646c165b87504fe32d61a5af51423.png",
            numbers: 0,
            inCart: false
        },
        Photocat: {
            id: "83eccdfe-753c-41bb-99f8-69d42f3bf892",
            name: "Photocat",
            price: 19.00,
            image: "https://c1-ebgames.eb-cdn.com.au/merchandising/images/packshots/99e1a716127b41d6bfb15a41dd976747_Large.png",
            numbers: 0,
            inCart: false,
          }, 
          Dabjam: {
            id: "37f16990-6173-4789-b911-046bd3c75aab",
            name: "Dabjam",
            price: 45.00,
            image: "https://m.media-amazon.com/images/I/717ysJGdBIL._SR500,500_.jpg",
            numbers: 0,
            inCart: false
          }, 
          Fivespan: {
            id: "e40a2186-d52c-4a39-a24f-491801e50317",
            name: "Fivespan",
            price: 45.00,
            image: "https://www.dhresource.com/600x600/f2/albu/g10/M01/CD/09/rBVaVlzeHlGAE4pmAAGmNpC5DTg711.jpg",
            numbers: 0,
            inCart: false
          },
          Trilith: {
            id: "a8cb4b55-4cdb-4cc4-9f59-84fa107df631",
            name: "Trilith",
            price: 15.00,
            image: "https://http2.mlstatic.com/iron-man-usb-20-flash-drive-de-almacenamiento-de-memoria-u-D_NQ_NP_692653-MLB31847775369_082019-F.webp",
            numbers: 0,
            inCart: false
          }, 
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