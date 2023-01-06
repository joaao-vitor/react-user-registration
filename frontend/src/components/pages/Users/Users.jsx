import React from "react";
import { FaCheck, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { HiXMark } from "react-icons/hi2";
import axios from 'axios'

import './Users.css';
const initialState = {
    user: { name: '', email: '' },
    list: []
}
const baseUrl = process.env.REACT_APP_BASEURL + '/users'
export default class Users extends React.Component {
    state = { ...initialState, message: null };

    displayMessage(type) {
        const messages = {
            success: { message: 'User added successfully!', color: 'green' },
            error: { message: 'An error has been ocurred!', color: 'red' },
            deleted: { message: 'User has been deleted sucessfully!', color: 'green' },
            edited: { message: 'Used edited sucessfully!', color: 'green' },
            emptyError: { message: 'You must not leave any fields empty', color: 'red' }
        };
        const message = (
            <div className={`message-box ${messages[type].color}`}>{messages[type].message}</div>
        )
        this.setState({ message })
        setTimeout(() => {
            this.setState({ message: null })
        }, 3000);
    }


    componentDidMount() {
        this.loadList();
    }

    clear(e) {
        e && e.preventDefault();
        this.setState({ user: initialState.user })
    }

    loadList() {
        axios.get(baseUrl).then(res => {
            this.setState({ list: res.data });
        })
    }

    saveUser(e) {
        e.preventDefault();
        const user = this.state.user;
        if (!user.name || !user.email) {
            this.displayMessage('emptyError');
            return;
        }

        const method = user.id ? 'put' : 'post';
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user).then(res => {
            this.loadList()
            this.setState({ user: initialState.user })

        }).then(() => method === 'post' ? this.displayMessage('success') : this.displayMessage('edited'))
            .catch(() => this.displayMessage('error'));
    }

    deleteUser(e, user) {
        e.preventDefault();
        const url = `${baseUrl}/${user.id}`
        axios.delete(url).then(res => {
            this.loadList()
        }).then(() => this.displayMessage('deleted'))
            .catch(() => this.displayMessage('error'));
        this.clear();
    }

    updateFormField(e) {
        const user = { ...this.state.user }
        user[e.target.name] = e.target.value;
        this.setState({ user });
    }

    loadUser(e, user) {
        this.setState({ user })
    }

    renderForm() {
        return (
            <section className="grey-box">
                <h1 className="title">
                    new user
                </h1>
                <form action="submit" className="form-user">
                    <input type="text" name="name" placeholder="Name"
                        onChange={e => this.updateFormField(e)} value={this.state.user.name} />
                    <input type="text" name="email" placeholder="Email"
                        onChange={e => this.updateFormField(e)} value={this.state.user.email} />
                    <div className="btn-group">
                        <button type="submit" onClick={(e) => this.saveUser(e)}><FaCheck /></button>
                        <button className="cancel" onClick={(e) => this.clear(e)}><HiXMark /></button>
                    </div>
                </form>
            </section>
        )
    }
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <div className="btn-group">
                            <button className="btn-edit" onClick={e => this.loadUser(e, user)}><FaPencilAlt /></button>
                            <button className="btn-delete" onClick={e => this.deleteUser(e, user)}><FaTrashAlt /></button>
                        </div>
                    </td>
                </tr>
            )
        })
    }
    renderTable() {
        return (
            <section className="grey-box users-list">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </section>
        )
    }
    render() {
        return (
            <main className="users">
                {this.state.message ? this.state.message : ''}
                {this.renderForm()}
                {this.renderTable()}
            </main>
        )
    }
} 