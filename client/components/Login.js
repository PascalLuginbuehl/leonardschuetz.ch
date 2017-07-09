// Dependencies
import React, { Component } from 'react';
import Card from './Card';
import StatusView from './StatusView';
import get from '../../utils/get';

class Login extends Component {

    constructor(...args) {
        super(...args);
        this.login = this.login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.enterRegisterMode = this.enterRegisterMode.bind(this);
        this.enterLoginMode = this.enterLoginMode.bind(this);
        this.enterPasswordResetMode = this.enterPasswordResetMode.bind(this);
        this.handleServerResponse = this.handleServerResponse.bind(this);

        this.state = {
            status: undefined,
            loginStatus: undefined,

            // can be login, register, passwordReset
            componentMode: "login"
        };
    }

    login(payload) {
        switch (this.state.componentMode) {
            case 'login': {
                get('/auth/status', 'POST', {
                    payload,
                }, this.handleServerResponse);
                break;
            }

            case 'register': {
                get('/auth/register', 'POST', {
                    payload,
                }, this.handleServerResponse);
                break;
            }

            case 'passwordReset': {
                get('/auth/resetPassword', 'POST', {
                    payload,
                }, this.handleServerResponse);
                break;
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.login({
            username: event.target[0].value,
            password: event.target[1].value,
        });
    }

    enterRegisterMode(event) {
        event.preventDefault();
        this.setState({
            componentMode: 'register',
            status: {
                type: 'warning',
                text: ''
            }
        });
    }

    enterLoginMode(event) {
        event.preventDefault();
        this.setState({
            componentMode: "login",
            status: {
                type: 'error',
                text: 'Not authenticated!'
            }
        });
    }

    enterPasswordResetMode(event) {
        event.preventDefault();
        this.setState({
            componentMode: "passwordReset",
            status: {
                type: 'warning',
                text: ''
            }
        });
    }

    handleServerResponse(err, response) {
        response = JSON.parse(response);

        if (response.authenticated) {
            this.props.onauthentication(response);
        } else {
            this.setState({
                status: {
                    type: 'error',
                    text: 'Not authenticated!',
                },
            });
        }
    }

    render() {
        switch (this.state.componentMode) {
            case 'login': {
                return (
                    <Card>
                        # Authenticate
                        <StatusView
                            status={this.state.status}>
                        </StatusView>
                        <form onSubmit={this.handleSubmit}>
                            <input type='text' name='username' placeholder='Username'></input>
                            <input type='password' name='password' placeholder='Password'></input>
                            <button type='submit'>Log in</button>
                        </form>

                        # Forgot your password?
                        <form onSubmit={this.enterPasswordResetMode}>
                            <button type='submit'>Reset password</button>
                        </form>

                        # Don't have an account yet?
                        <form onSubmit={this.enterRegisterMode}>
                            <button type='submit'>Register as new User</button>
                        </form>
                    </Card>
                );
            }

            case 'register': {
                return (
                    <Card>
                        # Register as new User
                        <StatusView
                            status={this.state.status}>
                        </StatusView>
                        <form onSubmit={this.handleSubmit}>
                            <input type='text' name='username' placeholder='Username'></input>
                            <input type='password' name='password' placeholder='Password'></input>
                            <button type='submit'>Register</button>
                        </form>

                        # Already have an account?
                        <form onSubmit={this.enterLoginMode}>
                            <button type='submit'>Login as existing user</button>
                        </form>
                    </Card>
                );
            }

            case 'passwordReset': {
                return (
                    <Card>
                        # Reset password
                        <StatusView
                            status={this.state.status}>
                        </StatusView>
                        <form onSubmit={this.handleSubmit}>
                            <input type='password' name='oldPassword' placeholder='Old Password'></input>
                            <input type='password' name='newPassword' placeholder='New Password'></input>
                            <button type='submit'>Reset Password</button>
                        </form>

                        # Changed your mind? Login as existing user
                        <form onSubmit={this.enterLoginMode}>
                            <button type='submit'>Login as existing user</button>
                        </form>
                    </Card>
                );
            }
        }

    }
}

export default Login;
