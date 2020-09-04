import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal, Form, Button, Alert} from 'react-bootstrap';
import {Link, useHistory } from 'react-router-dom';

import firebase from 'firebase';
import Header from '../views/Header';

function Login() {
    const history = useHistory();
    const [value, setValue] = useState({});
    const [error, setError] = useState('');

    const userTyping = (type, e) => {
        switch(type){
            case 'email':
                setValue({ ...value, email: e.target.value })
                break;
            case 'password':
                setValue({ ...value, password: e.target.value })
                break;
            default:
                break;
        }
    }

    function handleLogin(e){
        e.preventDefault();
        console.log(value.email)

        firebase
            .auth()
            .signInWithEmailAndPassword(value.email, value.password)
            .then(() => {
                if(value.email === "admin@gmail.com"){
                    history.push('/listProduct');
                    localStorage.setItem('user', value.email);
                } else { 
                    history.push('/');
                    localStorage.setItem('user', value.email);
                }
            }, err => {
                console.log(err);
                setError('Fail to login user')
            })
    }
    
    return (
        <div>
            <Header />
            
            <div className="sign-in">
            <Modal.Dialog>
            <div className="modal-header">
                <h4>Login</h4>
            </div>

            <Modal.Body>
                <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Your Email *</Form.Label>
                    <Form.Control type="email" onChange={(e) => userTyping('email',e)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter Your Password *</Form.Label>
                    <Form.Control type="password" onChange={(e) => userTyping('password',e)} />
                </Form.Group>
                <Button variant="primary" type="submit" >Login</Button>
                </Form>
            </Modal.Body>
            {
                (error) ?
                <Alert variant="danger">
                    {error}
                </Alert>
                : ''
            }
            <Modal.Footer>
                <Form.Text className="text-muted">
                Don't Have An Account ?
                </Form.Text>
                <Link to="/signup">Sign up</Link>
            </Modal.Footer>
            </Modal.Dialog>
            </div>
    
        </div>
    )
}

Login.propTypes = {
    onSubmit: PropTypes.func,
}

Login.defaultProps = {
    obSubmit: null
}

export default Login;