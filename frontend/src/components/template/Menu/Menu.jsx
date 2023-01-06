import React from "react";
import './Menu.css';
import { FaHome, FaUserCog } from 'react-icons/fa'
import { NavLink } from "react-router-dom";

function toggleActive(event) {
    const menuUl = document.getElementById('menuUl');
    for (let children of menuUl.children) {
        children.children[0].classList.remove('active')
    }
}

export default class Menu extends React.Component {
    componentDidMount() {


    }
    atualizaIcon(location) {
        const menuUl = document.getElementById('menuUl');
        for (let children of menuUl.children) {
            children.children[0].classList.remove('active')
        }
        switch (location) {
            case '/users':
                document.getElementsById('users-link').classList.add('active')
                break;
            case '/':
                document.getElementsById('home-link').classList.add('active')
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <nav className="menu">
                <ul id="menuUl">
                    <li id="home-link">
                    {/* style={({ isActive }) => ({ color: isActive ? "var(--icon-active)" : "var(--icon)" })} */}
                        <NavLink to={"/"} className={({isActive}) => isActive ? 'active' : ''} >
                            <i><FaHome /></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li id="users-link" onClick={e => toggleActive(e)}>
                        <NavLink to={"users"} className={({isActive}) => isActive ? 'active' : ''}>
                            <i><FaUserCog /></i>
                            <span>Users</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}