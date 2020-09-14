import React, { Component } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

import firebase from 'firebase';
import Header from '../views/Header';

class Signup extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            phone: '',
            email: '',
            password: '',
            passwordConfirm: '',
            signupError: ''
        }
    }

    userTyping = (type, e) => {
        switch(type){
            case 'username':
                this.setState({ username: e.target.value })
                break;
            case 'email':
                this.setState({ email: e.target.value })
                break;
            case 'password':
                this.setState({ password: e.target.value })
                break;
            case 'passwordConfirm':
                this.setState({ passwordConfirm: e.target.value })
                break;
            default:
                break;
        }
    }

    handleSignup = (e) => {
        e.preventDefault();
        const { history } = this.props;

        if(this.state.password !== this.state.passwordConfirm){
            this.setState({ signupError: 'Passwords do not match!' })
            return;
        }

        firebase
            .auth() 
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then( authUser => {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(this.state.email)
                    .set({
                        username: this.state.username,
                        email: authUser.user.email
                    })
                    .then( () => {
                        firebase.firestore().collection('cart').doc(this.state.email).set({
                            [this.state.email] : {
                                products: [],
                                totals: 0
                            }
                        })

                        if(this.state.email === "admin@gmail.com"){
                            history.push('/listProduct');
                            localStorage.setItem('user', this.state.email);
                        } else { 
                            history.push('/') 
                            localStorage.setItem('user', this.state.email);
                        }
                    }, err => {
                        console.log(err);
                        this.setState({ signupError: 'Add user is not successfully!'})
                    })
            }, authErr => {
                console.log(authErr);
                this.setState({ signupError: 'Create user is not successfully!'})
            })
    }

    render() {
        return (
            <div>
                <Header />

                <div className="sign-up">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Sign up</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form onSubmit={(e) => this.handleSignup(e)} >
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" onChange={(e) => this.userTyping('username',e)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" onChange={(e) => this.userTyping('email',e)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => this.userTyping('password',e)} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirm Your Password</Form.Label>
                                    <Form.Control type="password" onChange={(e) => this.userTyping('passwordConfirm',e)} />
                                </Form.Group>

                                {this.state.signupError ? <div style={{color: 'red'}}>{this.state.signupError}</div> : ''}
                                
                                <Button variant="primary" type="submit"> Sign up </Button>
                            </Form>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Form.Text className="text-muted">
                            Already Have An Acount ?
                            </Form.Text>
                            <Link to="/login">Log in</Link>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Signup);