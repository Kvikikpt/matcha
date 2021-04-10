import React from "react";
import {Button, CircularProgress, Container, makeStyles, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {setToken} from "../redux/actions/token";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function AuthPage() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const [username, setUserName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [errMessages, setErrMessages] = React.useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: ''
    });
    const [loading, setLoading] = React.useState(false);

    const submit = () => {
        setLoading(true);
        axios.post('/auth/register', {
            username,
            email,
            password,
            repeatPassword,
            firstName,
            lastName,
        }).then(res => {
            if (res) {
                setErrMessages({
                    username: '',
                    email: '',
                    password: '',
                    repeatPassword: '',
                    firstName: '',
                    lastName: ''
                });
                if (!res.data) throw new Error("Invalid response");
                if (!res.data.status && res.data.status !== 0) throw new Error("Invalid response");
                if (res.data.status === 0) {
                    setLoading(false)
                    if (!res.data.token) throw new Error("Lost token");
                    localStorage.token = res.data.token;
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
                    throw new Error(res.data.message || "Something wrong with request")
                else if (res.data.status === 3)
                    throw new Error(res.data.message || "Something went wrong on the Server")
            }
            else throw new Error('Invalid response');
        }).catch(e => {
            setLoading(false)
            setErrMessages({
                username: '',
                email: '',
                password: '',
                repeatPassword: '',
                firstName: '',
                lastName: ''
            });
            console.log(e);
        })
    }

    return (
        <Container maxWidth={"sm"}>
            <div className={classes.paper}>
                <Typography variant="h4" color="inherit" noWrap>
                    Register
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        error={Boolean(errMessages.email)}
                        helperText={errMessages.email}
                        variant={"outlined"}
                        onInput={(e) => setEmail(e.target.value)}
                        value={email}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        error={Boolean(errMessages.username)}
                        helperText={errMessages.username}
                        variant={"outlined"}
                        onInput={(e) => setUserName(e.target.value)}
                        value={username}
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="user_name"
                        autoFocus
                        inputProps={{ maxLength: 20 }}
                    />
                    <TextField
                        error={Boolean(errMessages.firstName)}
                        helperText={errMessages.firstName}
                        variant={"outlined"}
                        onInput={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="Firstname"
                        name="firstname"
                        autoComplete="firstname"
                        autoFocus
                        inputProps={{ maxLength: 30 }}
                    />
                    <TextField
                        error={Boolean(errMessages.lastName)}
                        helperText={errMessages.lastName}
                        variant={"outlined"}
                        onInput={(e) => setLastName(e.target.value)}
                        value={lastName}
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Lastname"
                        name="lastname"
                        autoComplete="lastname"
                        autoFocus
                        inputProps={{ maxLength: 30 }}
                    />
                    <TextField
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
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        inputProps={{ maxLength: 200 }}
                    />
                    <TextField
                        error={Boolean(errMessages.repeatPassword)}
                        helperText={errMessages.repeatPassword}
                        variant={"outlined"}
                        onInput={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="repeat_password"
                        label="Repeat Password"
                        name="repeat_password"
                        autoComplete="repeat_password"
                        autoFocus
                        inputProps={{ maxLength: 200 }}
                    />
                </form>
                {loading ?
                        <CircularProgress color="inherit" />
                :
                    <Button
                        onClick={() => submit()}
                        variant={"contained"}
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                    >
                        Зарегистрироваться
                    </Button>
                }
            </div>
        </Container>
    )
}