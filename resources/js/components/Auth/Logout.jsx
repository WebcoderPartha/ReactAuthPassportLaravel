import React from 'react';
import {Button, Form} from "react-bootstrap";
import {Redirect} from 'react-router-dom'

export default class Logout extends React.Component{

    componentDidMount() {
        localStorage.clear();
        this.props.setUser(null);
    }

    render() {

        // Protected URL
        if (!localStorage.getItem('token')){
            return <Redirect to={'/'} />
        }

        return (
            <div>
            logout
            </div>
        );
    }


}
