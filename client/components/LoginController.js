// Dependencies
import React, { Component } from "react";
import ProtoController from "./ProtoController";
import StatusView from "./StatusView";
import Card from "./Card";
import get from "../../utils/get";

class LoginController extends ProtoController {

    constructor(...args) {
        super(...args);
        this.login = this.login.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = Object.assign({}, this.state, {
            title: "Authentication",
            navigation: [
                ["auth", "Authentication"],
            ],
            status: {},
        });
    }

    componentDidMount() {
        this.login();
    }

    login(payload) {
        get("/auth/status", "POST", {
            payload,
        }, (err, response) => {
            response = JSON.parse(response);

            this.setState({
                status: response,
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.login({
            password: event.target[0].value,
        });
    }

    content(navItems, routerParams, routerPath) {

        let status;
        if (this.state.status.authenticated) {
            status = (
                <StatusView
                    status={{
                        type: "success",
                        text: "Authenticated!",
                    }}
                ></StatusView>
            );
        } else {
            status = (
                <StatusView
                    status={{
                        type: "error",
                        text: "Not authenticated!",
                    }}
                ></StatusView>
            );
        }

        return (
            <div>
                <Card>
                    # Status
                    <pre>
                        {status}
                    </pre>
                </Card>
                <Card>
                    # Login
                    <form onSubmit={this.handleSubmit}>
                        <input type="password" name="password" placeholder="Password"></input>
                        <button type="submit">Log in</button>
                    </form>
                </Card>
            </div>
        );
    }
}

export default LoginController;
