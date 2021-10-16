import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Redirect} from 'react-router-dom'

class Profile extends React.Component{


    render() {


        let name;
        let email;
        let id;
        if (this.props.user){
            name = this.props.user.name;
            email = this.props.user.email;
            id = this.props.user.id;
        }

        // Un-authenticate
        if (!localStorage.getItem('token')){
            return <Redirect to={'/'} />
        }

        return (

            <div>
                <div className="row">
                    <div className="col-6 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h2>Profile Information</h2>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">Name: {name}</li>
                                    <li className="list-group-item">Email: {email}</li>
                                    <li className="list-group-item">Id: {id}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default Profile;
