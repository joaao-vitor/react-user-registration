import React from "react";
import { FaUserAlt } from 'react-icons/fa'
import './Home.css';
export default props =>
    <main className="home">
        <h1 className="title">
            home page
        </h1>
        <div className="content">
            <p>welcome! <br/><br/>
               this is a simple user <br/>
               registration system <br/>
               using JSON Server.</p>
            <i><FaUserAlt/></i>
        </div>
    </main>