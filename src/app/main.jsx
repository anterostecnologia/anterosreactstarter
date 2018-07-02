import React from "react"
import ReactDOM from "react-dom"
import store from "./store";
import { Provider } from "react-redux";
import axios from 'axios';
import { Anteros as anteros } from 'anteros-react';
import Application from "../app/containers/Application";
import "anteros-react-theme/lib/anteros-react-theme-default.css";


axios.defaults.headers = { 'Content-Type': 'application/json', "Authorization": "Basic " + btoa('USARIO' + ":" + 'SENHA') };
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080/Service/';
anteros.dataSourceDatetimeFormat = 'YYYY-MM-DDTHH:mm:ss.SSS';



axios.interceptors.request.use(function (config) {
    return config;
});

axios.interceptors.response.use(function (response) {
    return response;
});

ReactDOM.render(<Provider store={store}>
    <Application />
</Provider>, document.getElementById("app"));
