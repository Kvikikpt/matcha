import React from "react";
import './App.css';
import { createStore } from 'redux';
import {Provider, useSelector} from 'react-redux';
import mainReducer from './redux/index';
import Header from './components/header';
import Auth from './components/auth';
import Index from './components/index';
import Footer from './components/footer';
import Register from './components/register';
import ForgotPass from './components/forgot_pass';
import axios from "axios";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

const initial = {
    socket: null,
    user: null
}

const store = createStore(
    mainReducer,
    initial
)

function App() {
    const [user, setUser] = React.useState(false);

    axios.defaults.baseURL = 'http://localhost:3000';

    return (
        <Provider store={store}>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/auth">
                        <Auth/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/forgot_pass">
                        <ForgotPass/>
                    </Route>
                    <Route path="/">
                        <Index/>
                    </Route>
                    <Footer/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
