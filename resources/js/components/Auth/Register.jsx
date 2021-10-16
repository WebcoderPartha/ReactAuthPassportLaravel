import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Redirect, Link} from 'react-router-dom'
export default class Register extends React.Component{

    state = {
        name                    : '',
        email                   : '',
        password                : '',
        password_confirmation   : '',
        errors                  : ''
    }

    RegisterSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }
        axios.post('/api/register', data)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                this.setState({
                    loggedIn: true
                })
                this.props.setUser(response.data.user)
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
        })
    }

    render() {

        // After Register Redirect to
        if (this.state.loggedIn){
            return <Redirect to="/profile" />
        }
        // After LoggedIn redirect to
        if (localStorage.getItem('token')){
            return <Redirect to={'profile'} />
        }

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 mx-auto mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="text-center">Register</h2>
                                </div>
                                <div className="card-body">
                                    <Form onSubmit={this.RegisterSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="name" onChange={(e) => {this.setState({name:e.target.value})}} placeholder="Enter your name" />
                                            <Form.Text className="text-danger">
                                                {this.state.errors ? this.state.errors.name[0] : ''}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" name="email" onChange={(e) => {this.setState({email:e.target.value})}} placeholder="Enter email" />
                                            <Form.Text className="text-danger">
                                                {this.state.errors ? this.state.errors.email[0] : ''}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" onChange={(e) => {this.setState({password:e.target.value})}} placeholder="Password" />
                                            <Form.Text className="text-danger">
                                                {this.state.errors ? this.state.errors.password[0] : ''}
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password Confirmation</Form.Label>
                                            <Form.Control type="password" name="password_confirmation" onChange={(e) => {this.setState({password_confirmation:e.target.value})}} placeholder="Password confirmation" />

                                        </Form.Group>

                                        <Button variant="primary" className="btn btn-success d-block" type="submit">
                                            Register
                                        </Button>
                                        <br/>
                                        <p>You already have account? <Link to="/">Click Here</Link></p>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}
