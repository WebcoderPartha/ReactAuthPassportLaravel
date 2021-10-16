import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Redirect} from 'react-router-dom';

export default class Reset extends React.Component{

    state = {
        token: '',
        email: '',
        password: '',
        password_confirmation: '',
        ertoken: '',
        ermail: '',
        erpass: '',
        errpassCon: '',
        errors: '',
        errorMsg:''
    }

    validateData(){
        if (!this.state.token > 0){
            this.setState({
                ertoken: 'Token field most not be empty!'
            })
        }else if (!this.state.email > 0){
            this.setState({
                ermail: 'Email field most not be empty!',
                ertoken: '',
                erpass: '',
                errpassCon: '',
            })
        }else if (!this.state.password > 0){
            this.setState({
                erpass: 'Password field most not be empty!',
                ertoken: '',
                errpassCon: '',
                ermail: ''
            })
        }else if (!this.state.password_confirmation > 0){
            this.setState({
                errpassCon: 'Password field most not be empty!',
                erpass: '',
                ertoken: '',
                ermail: ''
            })
        }else{
            return true;
        }
    }

    ResetSubmit = (e) => {

        e.preventDefault();

       if (this.validateData()){

           const data = {
               token                   : this.state.token,
               email                   : this.state.email,
               password                : this.state.password,
               password_confirmation   : this.state.password_confirmation,
           }
           axios.post('/api/reset', data)
               .then(response => {
                   this.setState({
                       resetted: true
                   })
               }).catch(error => {
               this.setState({
                   // errors: error.response.data.errors,
                   errorMsg: error.response.data.error
               })
               console.log(error.response.data.error)
           })

       }
    }

    render() {

        if (this.state.resetted){
            return <Redirect to={'/'} />
        }

        let  errorMsg
        if (this.state.errorMsg){
            errorMsg = (
                <div className="alert alert-danger">
                    <strong>{this.state.errorMsg}!</strong>
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
                                    <h2 className="text-center">Reset Account</h2>
                                </div>
                                <div className="card-body">
                                    {errorMsg}
                                    <Form onSubmit={this.ResetSubmit} id="resetform">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Token Pin</Form.Label>
                                            <Form.Control type="text" name="token" onChange={(e) => {this.setState({token:e.target.value})}} placeholder="Enter token pin" />
                                            <Form.Text className="text-danger">
                                                { this.state.ertoken }
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type="email" name="email" onChange={(e) => {this.setState({email:e.target.value})}} placeholder="Enter email" />
                                            <Form.Text className="text-danger">
                                                { this.state.ermail }
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" name="password" onChange={(e) => {this.setState({password:e.target.value})}} placeholder="Password" />
                                            <Form.Text className="text-danger">
                                                { this.state.erpass }
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password Confirmation</Form.Label>
                                            <Form.Control type="password" name="password" onChange={(e) => {this.setState({password_confirmation:e.target.value})}} placeholder="Password Confirmation" />
                                            <Form.Text className="text-danger">
                                                { this.state.errpassCon }
                                            </Form.Text>
                                        </Form.Group>

                                        <Button variant="primary" className="btn btn-success d-block" type="submit">
                                            Reset
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
