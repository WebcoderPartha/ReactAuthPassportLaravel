import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Redirect} from 'react-router-dom'

export default class ForgetPassword extends React.Component{

    state = {
        email     : '',
        errEmail  : '',
        successMsg: '',
        errorMsg  : ''
    }

    submitForm = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email
        }
        axios.post('/api/forget', data)
            .then(response => {
                this.setState({
                    successMsg: response.data.success,
                })
                document.getElementById('forgetform').reset();
            }).catch(error => {
                this.setState({
                    errEmail: error.response.data.errors,
                    errorMsg: error.response.data.error
                })
        })
    }

    render() {


        // Authenticate Protect URL
        if (localStorage.getItem('token')){
            return <Redirect to={'profile'} />
        }

        let errEmail, successMsg, errorMsg;

        if (this.state.errEmail){
            errEmail = this.state.errEmail.email[0]
        }

        if (this.state.successMsg){
            successMsg = (
                <div className="alert alert-success">
                    <span>{this.state.successMsg}</span>
                </div>
            )
        }
        if (this.state.errorMsg){
            errorMsg = (
                <div className="alert alert-danger">
                    <span>{this.state.errorMsg}</span>
                </div>
            )
        }


        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 mx-auto mt-5">
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="text-center">Forget Account</h2>
                                </div>
                                <div className="card-body">
                                    {successMsg}  {errorMsg}
                                    <Form onSubmit={this.submitForm} id="forgetform">

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => {this.setState({email:e.target.value})}} />
                                            <Form.Text className="text-danger">
                                                {errEmail}
                                            </Form.Text>
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Forget
                                        </Button>
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
