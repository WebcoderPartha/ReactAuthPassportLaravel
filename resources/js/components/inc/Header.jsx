import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import ForgetPassword from "../Auth/ForgetPassword";
import Profile from "../Profile";
import Nav from "../Nav";
import Logout from "../Auth/Logout";
import Reset from "../Auth/Reset";

export default class Header extends React.Component{

    state = {
        user: {}
    }

    componentDidMount() {
        axios.get('/api/user')
            .then(response => {
                this.setUser(response.data)
            }).catch(error => {
                console.log(error)
        })
    }

    setUser = (user) => {
        this.setState({
            user:user
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <Nav user={this.state.user} setUser={this.setUser} ></Nav>
                    <Switch>
                        <Route exact path="/" component={ () => <Login user={this.state.user} setUser={this.setUser} /> } />
                        <Route exact path="/register" component={() => <Register user={this.state.user} setUser={this.setUser} />} />
                        <Route exact path="/logout" component={() => <Logout user={this.state.user} setUser={this.setUser} />} />
                        <Route exact path="/forget-password" component={ForgetPassword} />
                        <Route exact path="/reset/:id" component={Reset} />
                        <Route path="/profile" component={ () => <Profile user={this.state.user} />} />
                    </Switch>
                </div>
            </Router>
        );
    }


}
