import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./components/inc/Header";
import axios from "axios";
window.axios = axios;

// axios.defaults.baseURL = 'http://localhost/api';
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');

ReactDOM.render(
    <React.StrictMode>
        <Header/>
    </React.StrictMode>,
    document.getElementById('app')
);
