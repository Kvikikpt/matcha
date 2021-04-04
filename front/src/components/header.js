import React from "react";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    makeStyles,
    Popover,
    Toolbar,
    Typography
} from "@material-ui/core";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    flex: {
        flexGrow: 1,
    },
    username: {
        marginRight: 10
    },
    space: {
        padding: theme.spacing(1),
    },
    popContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 200
    },
    divider: {
        width: 180
    }
}));

export default function Header() {
    const classes = useStyles();
    const user = useSelector((state) => state.user);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [icon, setIcon] = React.useState(user !== null ? user.icon : null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return <AppBar position="relative">
        <Container maxWidth={"md"}>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Matcha
                </Typography>
                <div className={classes.flex}/>
                {user !== null &&
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                        <Avatar>
                            {icon}
                        </Avatar>
                    </IconButton>
                }
                {anchorEl &&
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => {setAnchorEl(null)}}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box className={classes.popContent}>
                        <div className={classes.space}/>
                        <Typography>{user.username}</Typography>
                        <Typography>{user.email}</Typography>
                        <div className={classes.space}/>
                        <Divider variant={"fullWidth"} className={classes.divider}/>
                        <div className={classes.space}/>
                        <Button variant={"contained"} color={"primary"} onClick={() => localStorage.token = ""}>
                            Выйти
                        </Button>
                        <div className={classes.space}/>
                    </Box>
                </Popover>
                }
            </Toolbar>
        </Container>
    </AppBar>
}