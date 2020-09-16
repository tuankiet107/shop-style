import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import firebase from 'firebase';
import { RESET_BASKET } from '../../actions/types';

function Checkout() {
    const history = useHistory();
    const basket = useSelector((state) => state.basketState);
    const dispatch = useDispatch();
    let mail;

    const [info_checkout, setInfo_checkout] = useState({});
    const [data, setData_DB] = useState();

    useEffect(() => {
        async function fetDataFromDB(){
            firebase
            .firestore()
            .collection('products')
            .doc('veTsDR2nMSiv3ldp7J0F')
            .get()
            .then(doc => {
                setData_DB(doc.data().products)
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        }
        fetDataFromDB();
    }, [])
    
    function handleSubmit(e){
        e.preventDefault();

        if(localStorage.getItem('user')){
            mail = localStorage.getItem('user').split('@')[0];
            
            firebase.firestore().collection('cart').doc(localStorage.getItem('user')).update({
                [mail] : firebase.firestore.FieldValue.arrayUnion({
                    fullName: info_checkout.fullname,
                    phone: info_checkout.phone,
                    address: info_checkout.address,
                    products: basket.products,
                    totals: basket.cartCost,
                    orderDate: new Date()
                })
            })
            minusQtyProductBought();
            
            history.push('/')
        }
        dispatch({
            type: RESET_BASKET
        })
    }

    function minusQtyProductBought(){
        const products = basket.products.filter(item => {
            return Object.keys(data).map(item1 => {
               return item.id === data[item1].id
            })
        })
        // console.log(products);
        products.forEach(item3 => {
            Object.keys(data).forEach(item4 => {
                if(item3.id === data[item4].id){
                    firebase
                    .firestore()
                    .collection('products')
                    .doc('veTsDR2nMSiv3ldp7J0F')
                    .update({
                        [`products.${item3.id}`]: {...item3, quantity: data[item4].quantity - item3.quantity}
                    })
                }
            })
        })
    }

    return (
        <div>
            <h2>KStore</h2>
            <div className="checkouts">
                <h3>shipment details</h3>
                <Form>
                <Row>
                    <Col><Form.Control type="text" placeholder="Full name" 
                        onChange={(e) => setInfo_checkout({...info_checkout, fullname: e.target.value } )} />
                    </Col>
                </Row>
                <Row>
                    <Col><Form.Control type="text" placeholder="Phone numbers" 
                        onChange={(e) => setInfo_checkout({...info_checkout, phone: e.target.value })} />
                    </Col>
                </Row>
                <Row>
                    <Col><Form.Control type="text" placeholder="Address" 
                        onChange={(e) => setInfo_checkout({...info_checkout, address: e.target.value })} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button onClick={handleSubmit}>Finish</button>
                    </Col>
                </Row>
                </Form>

                <Link to="/cart">Back to cart</Link>
            </div>
        </div>
    )
}

export default Checkout
