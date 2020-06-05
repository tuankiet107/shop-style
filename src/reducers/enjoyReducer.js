import new1 from '../img/new/new1.webp';
import new2 from '../img/new/new2.webp';
import new3 from '../img/new/new3.webp';
import new4 from '../img/new/new4.jpg';
import new5 from '../img/new/new5.webp';
import new6 from '../img/new/new6.webp';

import {ENJOY_PRODUCT} from '../actions/types';

let initialState = {
    heartNumber: 0,
    products : [
    {
        "id": "a20105e4-d876-453d-8a46-67ae409e2ad8",
        "name": "Chocolate",
        "image": new1,
        "price": 10,
        "heart": false
    }, {
        "id": "19d3b2aa-d3e2-446e-84b0-8667eebe355a",
        "name": "Red Oakridge",
        "image": new2,
        "price": 20,
        "heart": false
    }, {
        "id": "7a380483-e7bb-4f31-9b4c-60eca76de5bc",
        "name": "Noodles",
        "image": new3,
        "price": 30,
        "heart": false
    }, {
        "id": "2e571dc1-8492-486e-bdf8-e1d510cf8534",
        "name": "Bay Leaf",
        "image": new4,
        "price": 40,
        "heart": false
    }, {
        "id": "2678270f-b040-458e-8116-a8c351455ef0",
        "name": "Pastry",
        "image": new5,
        "price": 50,
        "heart": false
    }, {
        "id": "bcbc1e58-47c7-430f-baaa-d594b28fe08d",
        "name": "Long Grain",
        "image": new6,
        "price": 60,
        "heart": false
    }]
}

export default (state = initialState, action) => {
    switch(action.type){
        case ENJOY_PRODUCT:
            // let productEnjoyed = {...state.products};
            // console.log(productEnjoyed);
            // return state;
        default:
            return state;
    }
}