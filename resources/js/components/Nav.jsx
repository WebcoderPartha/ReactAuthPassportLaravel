import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
export default class Nav extends React.Component{

    // state = {
    //     loggedOut: ''
    // }
    // Logout = () => {
    //     localStorage.clear();
    //     this.props.setUser(null)
    //     this.setState({
    //         loggedOut: true
    //     })
    // }


    render() {
        //Logout

        let profile;
        let buttons;
        let token = localStorage.getItem('token');
        if (token){
            profile = (
                <Link className="nav-link" to="/profile">Profile</Link>
            )
            buttons = (
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <Link className="nav-link"  to="/logout">Logout</Link>
                    </li>
                </ul>
            )
        }else {
            buttons = (
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <Link className="nav-link" to="/">Login</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to="/profile">React Auth</Link>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                {profile}
                            </li>
                        </ul>
                    </div>
                    <div className="float-right" id="navbarText">
                        {buttons}
                    </div>
                </nav>
            </div>
        );
    }


}
