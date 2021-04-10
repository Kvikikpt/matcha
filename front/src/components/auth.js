import React from "react";
import {Button, CircularProgress, Container, Fab, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
import {setToken} from "../redux/actions/token";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    grid: {
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    fab: {
        marginTop: theme.spacing(5),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function AuthPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errMessages, setErrMessages] = React.useState({
        login: '',
        password: '',
        message: ''
    });
    const [loading, setLoading] = React.useState(false);

    const auth = () => {
        setLoading(true);
        axios.post('/auth', {
            login,
            password
        }).then(res => {
            if (res) {
                setErrMessages({
                    login: '',
                    password: '',
                    message: ''
                });
                if (!res.data) throw new Error("Invalid response");
                if (!res.data.status && res.data.status !== 0) throw new Error("Invalid response");
                if (res.data.status === 0) {
                    setLoading(false)
                    if (!res.data.token) throw new Error("Lost token");
                    localStorage.token = res.data.token
                    dispatch(setToken(res.data.token));
                    history.push('/');
                }
                else if (res.data.status === 1) {
                    if (!res.data.errMessages) {
                        throw new Error("Invalid response");
                    }
                    setLoading(false)
                    setErrMessages(res.data.errMessages);
                }
                else if (res.data.status === 2)
                    throw new Error('Invalid request send');
                else if (res.data.status === 3)
                    throw new Error(res.data.message || "Something went wrong on the Server");
            }
            else throw new Error('Invalid response');
        }).catch(e => {
            setLoading(false)
            setErrMessages({
                login: '',
                password: '',
                message: ''
            });
            console.log(e);
        })
    }

    return (
        <Container maxWidth={"sm"}>
            <div className={classes.paper}>
                <Typography variant="h3" color="inherit" noWrap>
                    Login
                </Typography>
                {errMessages.message &&
                <Typography variant="h6" color="secondary" noWrap>
                    {errMessages.message}
                </Typography>
                }
                <form className={classes.form} noValidate>
                    <TextField
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                auth();
                            }
                        }}
                        error={Boolean(errMessages.login)}
                        helperText={errMessages.login}
                        variant={"outlined"}
                        onInput={(e) => setLogin(e.target.value)}
                        value={login}
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Email or Username"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                auth();
                            }
                        }}
                        error={Boolean(errMessages.password)}
                        helperText={errMessages.password}
                        variant={"outlined"}
                        onInput={(e) => setPassword(e.target.value)}
                        value={password}
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password"
                        label="Пароль"
                        name="password"
                        autoComplete="password"
                        autoFocus
                    />
                    <Grid container>
                        <Grid item xs={6} className={classes.grid}>
                            <Link to={'/register'}>Зарегистрироваться</Link>
                        </Grid>
                        <Grid item xs={6} className={classes.grid}>
                            <Link to={'/forgot_pass'}>Забыли пароль?</Link>
                        </Grid>
                    </Grid>
                </form>
                {loading ?
                    <CircularProgress color="inherit" />
                    :
                    <Button
                        onClick={() => {auth()}}
                        variant={"contained"}
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                        disabled={login.length === 0 || password.length === 0}
                    >
                        Войти
                    </Button>
                }
            </div>
        </Container>
    )
}