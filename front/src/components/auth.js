import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Fab, makeStyles, TextField, Typography} from "@material-ui/core";
import {Undo} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
}));

export default function AuthPage() {
    const classes = useStyles();

    const [name, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [register, setRegister] = React.useState(false)
    const [login, setLogin] = React.useState(false)
    const [nameTaken, setNameTaken] = React.useState(false);
    const [unsuccessfulLogin, setUnsuccessfulLogin] = React.useState(false);

    return (
        <Container maxWidth={"sm"}>
            <Fab
                color={"primary"}
                onClick={() => {
                    setRegister(false);
                    setLogin(false);
                    setNameTaken(false);
                    setName('');
                    setPassword('');
                    setUnsuccessfulLogin(false)
                }}
                className={classes.fab}
            >
                <Undo/>
            </Fab>
            <div className={classes.paper}>
                <Button onClick={() => setLogin(true)}>
                    Войти
                </Button>
                <Button onClick={() => setRegister(true)}>
                    Зарегистрироваться
                </Button>
            </div>
                register &&
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant={"outlined"}
                            onInput={(e) => setName(e.target.value)}
                            value={name}
                            margin="normal"
                            required
                            fullWidth
                            error={nameTaken}
                            helperText="Имя занято"
                            id="name"
                            label="Имя пользователя"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
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
                    </form>
                    <Button
                        onClick={() => {}}
                        variant={"contained"}
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                        disabled={name.length === 0}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
                login &&
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant={"outlined"}
                            onInput={(e) => setName(e.target.value)}
                            value={name}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Имя пользователя"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />
                        <TextField
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
                    </form>
                    <Typography variant="h6" color="inherit" noWrap>
                        Не удалось войти. Неправильный логин или пароль
                    </Typography>
                    <Button
                        onClick={() => {}}
                        variant={"contained"}
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                        disabled={name.length === 0}
                    >
                        Войти
                    </Button>
                </div>
        </Container>
    )
}