import React from 'react';
import {Form, Button} from "react-bootstrap";
import {Redirect, Link} from 'react-router-dom'
export default class Login extends React.Component{

    state = {
        email: '',
        password: '',
        errors: ''
    }

    // validate(){
    //     if(!this.state.email > 0 && !this.state.password){
    //         this.setState({
    //             errEmail: 'Email must not be empty!',
    //             errPass : 'Password must not be empty!'
    //         })
    //     }else if(!this.state.email > 0 ){
    //         this.setState({
    //             errEmail: 'Email must not be empty!'
    //         })
    //     }else if(!this.state.password > 0 ){
    //         this.setState({
    //             errPass : 'Password must not be empty!'
    //         })
    //     }else{
    //         return true
    //     }
    // }

    LoginSubmit = (e) =>{
        e.preventDefault();
        const data = {
            email:this.state.email,
            password: this.state.password
        }
        axios.post('/api/login', data)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                this.setState({
                    loggedIn : true
                })
                this.props.setUser(response.data.user);
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
        })
    }

    render() {
        if (this.state.loggedIn){
            return <Redirect to="/profile" />
        }

        return (

            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 mx-auto mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="text-center">Login</h2>
                                </div>
                                <div className="card-body">
                                    <Form onSubmit={this.LoginSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" name="email" onChange={(e)=> {this.setState({email:e.target.value})}} placeholder="Enter email" />
                                            <Form.Text className="text-danger">
                                                { this.state.errors ? this.state.errors.email[0] : '' }
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" onChange={(e)=> {this.setState({password:e.target.value})}} placeholder="Password" />
                                            <Form.Text className="text-danger">
                                                { this.state.errors ? this.state.errors.password[0] : '' }
                                            </Form.Text>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Login
                                        </Button>
                                    </Form>
                                    <br/>
                                    <p>Create an account? <Link to="/register">Register</Link></p>
                                    <p>Forget password? <Link to="/forget-password">Forget</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
