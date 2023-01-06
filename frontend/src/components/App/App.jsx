import React from "react";
import Header from '../template/Header/Header';
import Menu from '../template/Menu/Menu';
import Routes from './Routes';
import './App.css';
import { BrowserRouter } from "react-router-dom";

export default props =>
    <BrowserRouter>
        <div className="App">
            <Header />
            <Routes />
            <Menu />
        </div>
    </BrowserRouter>
