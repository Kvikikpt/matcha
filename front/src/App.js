import React from "react";
import './App.css';
import {useDispatch} from 'react-redux';
import {setUser} from "./redux/actions/user";
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
    Route
} from "react-router-dom";

function App() {
    const dispatch = useDispatch();
    axios.defaults.baseURL = 'http://localhost:3000';

    React.useEffect(() => {
        function checkUserData() {
            const token = localStorage.getItem('token')

            axios.defaults.headers.common['x-access-token'] = token
            if (token) {
                axios.get('/users/get_user').then(res => {
                    if (!res || ! res.data) {
                        throw new Error("Invalid response");
                    }
                    if (!res.data.status && res.data.status !== 0) throw new Error("Invalid response");
                    else if (res.data.status === 1 || res.data.status === 2)
                        throw new Error('Invalid response data');
                    if (res.data.status === 0) {
                        if (!res.data.user) throw new Error("Invalid response");
                        dispatch(setUser(res.data.user));
                    }
                }).catch(e => {
                    console.log(e)
                })
            }
        }

        window.addEventListener('storage', checkUserData)

        return () => {
            window.removeEventListener('storage', checkUserData)
        }
    }, [localStorage.token]);

    return (
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
    );
}

export default App;
