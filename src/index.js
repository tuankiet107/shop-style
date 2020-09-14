import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import firebase from 'firebase/app';
import 'firebase/firestore';

import App from './App';

// STORE
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

firebase.initializeApp({
  apiKey: "AIzaSyDOHYpIbUPFgyAlI42yZk99NE8hxSvUn30",
  authDomain: "shop-style-10799.firebaseapp.com",
  databaseURL: "https://shop-style-10799.firebaseio.com",
  projectId: "shop-style-10799",
  storageBucket: "shop-style-10799.appspot.com",
  messagingSenderId: "321672176576",
  appId: "1:321672176576:web:134010f50b28065d6a9e25",
  measurementId: "G-FXVZZ2KQBZ"
})

ReactDOM.render(
 <Provider store={store}>
   <App />
 </Provider>
,document.getElementById('root')
);

serviceWorker.unregister();