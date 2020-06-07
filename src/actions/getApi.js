import axios from 'axios';
import { ADD_PRODUCT_BASKET } from "./types";

export default (data) => {
    return (dispatch) => {
        dispatch({type: ADD_PRODUCT_BASKET});
        axios.get('https://5ed1c80d4e6d7200163a0b7e.mockapi.io/api/products-reducers')
              .then(res => res.data)
              .catch(err => console.log(err))
    };
};