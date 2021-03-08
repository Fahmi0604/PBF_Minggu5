import React, { Component } from 'react';
import './OnlineShop.css'
import macbook from '../assets/macbook.jpg'
import iphone from '../assets/iphone.jpg'
import apple from '../assets/apple.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    // useHistory,
    Redirect,
    // useLocation,
    useParams,
    withRouter
} from 'react-router-dom';

function OnlineShop() {
    return (
        <Router>
            <div className="header">
                <img src={apple} alt="" />
                <AuthButton />

                <ul>
                    <li className="TopBar-1" id="TB1">
                        <Link className="Link-1" to="/home">Home</Link>
                    </li>
                    <li className="TopBar-1">
                        <Link className="Link-1" to="/data">Data</Link>
                    </li>
                </ul>


                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path="/data" component={Data} />
                </Switch>
            </div>
        </Router>
    )
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100);
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
}

const AuthButton = withRouter(({ history }) =>
    fakeAuth.isAuthenticated ? (
        <p id="logout">Welcome!
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push("/home"));
                }}>
                <p>Sign out</p>
            </button>
        </p>
    ) : (
            <p id="warning-log" >
                You are not Log in!
            </p>
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

function Home() {
    return (
        <div className="Home">
            <h2>Katalog Barang</h2>
            <div className="grid">
                <div className="row">
                    <div className="col-sm">
                        <img src={macbook} alt="Gambar Thumbnail Artikel" />
                        <h3>Macbook Pro</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="col-sm">
                        <img src={macbook} alt="Gambar Thumbnail Artikel" />
                        <h3>Macbook Pro</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="col-sm">
                        <img src={macbook} alt="Gambar Thumbnail Artikel" />
                        <h3>Macbook Pro</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="col-sm">
                        <img src={macbook} alt="Gambar Thumbnail Artikel" />
                        <h3>Macbook Pro</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <img src={iphone} alt="Gambar Thumbnail Artikel" />
                        <h3>Iphone 12</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="col-sm">
                        <img src={iphone} alt="Gambar Thumbnail Artikel" />
                        <h3>Iphone 12</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="col-sm">
                        <img src={iphone} alt="Gambar Thumbnail Artikel" />
                        <h3>Iphone 12</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                    <div className="col-sm">
                        <img src={iphone} alt="Gambar Thumbnail Artikel" />
                        <h3>Iphone 12</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Data() {

    let { path, url } = useRouteMatch();

    return (
        <div className="header-2">
            {/* <h2>Data Barang</h2> */}
            <ul>
                <li className="TopBar-2">
                    <Link to={`${url}/DataMacbook`}>Data Macbook</Link>
                </li>
                <li className="TopBar-2">
                    <Link to={`${url}/DataIphone`}>Data Iphone</Link>
                </li>
            </ul>

            <Switch>
                <Route exact path={path}>

                </Route>
                <Route path={`${path}/:dataId`}>
                    <DataBody />
                </Route>
            </Switch>
        </div>
    )
}

function DataBody() {
    let { dataId } = useParams();

    if (dataId === "DataMacbook") {
        return (
            <div className="Data-Macbook">
                <h1>{dataId}</h1>
                <div className="table-mac">
                    <table border="1">
                        <tr>
                            <th>Nama Barang</th>
                            <th>Gambar</th>
                            <th>Tipe</th>
                            <th>Tahun</th>
                            <th>Harga</th>
                        </tr>
                        <tr>
                            <td>Macbook</td>
                            <td><img src={macbook} alt="macbook"/></td>
                            <td>Pro</td>
                            <td>2020</td>
                            <td>18.999.000</td>
                        </tr>
                        <tr>
                            <td>Macbook</td>
                            <td><img src={macbook} alt="macbook"/></td>
                            <td>Pro</td>
                            <td>2020</td>
                            <td>18.999.000</td>
                        </tr>
                        <tr>
                            <td>Macbook</td>
                            <td><img src={macbook} alt="macbook"/></td>
                            <td>Pro</td>
                            <td>2020</td>
                            <td>18.999.000</td>
                        </tr>
                        <tr>
                            <td>Macbook</td>
                            <td><img src={macbook} alt="macbook"/></td>
                            <td>Pro</td>
                            <td>2020</td>
                            <td>18.999.000</td>
                        </tr>
                        <tr>
                            <td>Macbook</td>
                            <td><img src={macbook} alt="macbook"/></td>
                            <td>Pro</td>
                            <td>2020</td>
                            <td>18.999.000</td>
                        </tr>
                    </table>
                </div>
            </div >
        )
    } else if (dataId === "DataIphone") {
        return (
            <div className="Data-Iphone">
                <h1>{dataId}</h1>
                <div className="table-mac">
                    <table border="1">
                        <tr>
                            <th>Nama Barang</th>
                            <th>Tipe</th>
                            <th>Tahun</th>
                            <th>Harga</th>
                        </tr>
                        <tr>
                            <td>Iphone</td>
                            <td>12</td>
                            <td>2020</td>
                            <td>21.999.000</td>
                        </tr>
                        <tr>
                            <td>Iphone</td>
                            <td>12</td>
                            <td>2020</td>
                            <td>21.999.000</td>
                        </tr>
                        <tr>
                            <td>Iphone</td>
                            <td>12</td>
                            <td>2020</td>
                            <td>21.999.000</td>
                        </tr>
                        <tr>
                            <td>Iphone</td>
                            <td>12</td>
                            <td>2020</td>
                            <td>21.999.000</td>
                        </tr>
                        <tr>
                            <td>Iphone</td>
                            <td>12</td>
                            <td>2020</td>
                            <td>21.999.000</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}

class Login extends Component {
    state = { redirectToReferrer: false };

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/home" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />
        }

        return (
            <div className="Login">
                <p>You must log in to view the page</p>
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}

export default OnlineShop;