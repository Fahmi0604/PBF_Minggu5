import React, { Component } from "react";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from "react-router-dom";

function AuthExample() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/public" >
                            <p>Public Page</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/protected" >
                            <p>Protected Page</p>
                        </Link>
                    </li>
                </ul>
                <hr/>

                <AuthButton />

                <Switch>
                    <Route path="/public" component={Public} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/protected" component={Protected} />
                </Switch>
            </div>
        </Router>
    );
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const AuthButton = withRouter(({ history }) =>
    fakeAuth.isAuthenticated ? (
        <p>Welcome!
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push("/"));
                }}>
                <p>Sign out</p>
            </button>
        </p>
    ) : (
            <p>You are not logged in.</p>
        )
);

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                fakeAuth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}

function Public() {
    return <h3>Public</h3>;
}

function Protected() {
    return <h3>Protected</h3>;
}

class Login extends Component {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>

                <button onClick={this.login}>
                    Log in
                </button>
            </div>
        );
    }
}

export default AuthExample;
