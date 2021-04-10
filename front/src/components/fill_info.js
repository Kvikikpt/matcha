import React from "react";
import {
    Button,
    CircularProgress,
    Container,
    Fab,
    Grid, GridList, GridListTile, GridListTileBar, IconButton, InputLabel,
    makeStyles, MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";
import {useDispatch} from "react-redux";
import {setToken} from "../redux/actions/token";
import {Skeleton} from "@material-ui/lab";
import {Close} from "@material-ui/icons";

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
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 110,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
        position: "absolute",
        top: 0,
        right: 0,
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
    },
}));

class InfoIcon extends React.Component {
    render() {
        return null;
    }
}

export default function AuthPage() {
    const classes = useStyles();

    const [gender, setGender] = React.useState('');
    const [sexualOrientation, setSexualOrientation] = React.useState('');
    const [biography, setBiography] = React.useState('');
    const [errMessages, setErrMessages] = React.useState({
        biography: '',
        gender: '',
        sexualOrientation: ''
    });
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    return (
        <Container maxWidth={"sm"}>
            <div className={classes.paper}>
                <Typography variant="h5" color="inherit" noWrap>
                    Заполнить информацию профиля
                </Typography>
                {errMessages.message &&
                <Typography variant="h6" color="secondary" noWrap>
                    {errMessages.message}
                </Typography>
                }
                <form className={classes.form} noValidate>
                    <InputLabel id="select_gender">Gender</InputLabel>
                    <Select
                        style={{marginBottom: 15}}
                        required
                        variant={"outlined"}
                        fullWidth
                        id="select_gender"
                        value={gender}
                        onChange={(e) => {setGender(e.target.value)}}
                    >
                        <MenuItem value={'m'}>Male</MenuItem>
                        <MenuItem value={'f'}>Female</MenuItem>
                        <MenuItem value={'o'}>Other</MenuItem>
                    </Select>
                    <InputLabel id="select_sex_orientation">Sexual preferences</InputLabel>
                    <Select
                        required
                        variant={"outlined"}
                        fullWidth
                        id="select_sex_orientation"
                        value={sexualOrientation}
                        onChange={(e) => {setSexualOrientation(e.target.value)}}
                    >
                        <MenuItem value={'g'}>Heterosexual</MenuItem>
                        <MenuItem value={'b'}>Bisexual</MenuItem>
                        <MenuItem value={'h'}>Homosexual</MenuItem>
                    </Select>
                    <TextField
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {

                            }
                        }}
                        error={Boolean(errMessages.biography)}
                        helperText={errMessages.biography}
                        variant={"outlined"}
                        onInput={(e) => setBiography(e.target.value)}
                        value={biography}
                        margin="normal"
                        required
                        fullWidth
                        id="biography"
                        label="Biography"
                        name="login"
                        multiline
                        autoFocus
                        inputProps={{ maxLength: 1000 }}
                    />
                    <div className={classes.root}>
                        <GridList cellHeight={100} className={classes.gridList} cols={5}>
                            {images.map((tile, index) => (
                                <GridListTile key={index} cols={1}>
                                    <img src={tile} alt={`user_image${index}`}/>
                                    <GridListTileBar
                                        titlePosition="top"
                                        actionIcon={
                                            <IconButton className={classes.icon} size={"small"} onClick={() => {
                                                const new_images = [...images];
                                                new_images.splice(index, 1);
                                                setImages(new_images);
                                            }}>
                                                <Close/>
                                            </IconButton>
                                        }
                                        className={classes.titleBar}
                                    />
                                </GridListTile>
                            ))}
                            {images.length < 1 &&
                            <GridListTile key={'1-blank'} cols={1}>
                                <Skeleton variant="rect" width={100} height={100} />
                            </GridListTile>
                            }
                            {images.length < 2 &&
                            <GridListTile key={'2-blank'} cols={1}>
                                <Skeleton variant="rect" width={100} height={100} />
                            </GridListTile>
                            }
                            {images.length < 3 &&
                            <GridListTile key={'3-blank'} cols={1}>
                                <Skeleton variant="rect" width={100} height={100} />
                            </GridListTile>
                            }
                            {images.length < 4 &&
                            <GridListTile key={'4-blank'} cols={1}>
                                <Skeleton variant="rect" width={100} height={100} />
                            </GridListTile>
                            }
                            {images.length < 5 &&
                            <GridListTile key={'5-blank'} cols={1}>
                                <Skeleton variant="rect" width={100} height={100} />
                            </GridListTile>
                            }
                        </GridList>
                    </div>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Images
                        <input
                            onChange={({target}) => {
                                let asyncReader = function (file) {
                                    return new Promise(((resolve, reject) => {
                                        let reader = new FileReader();
                                        reader.onload = () => {
                                            resolve(reader.result);
                                        };

                                        reader.onerror = reject;

                                        reader.readAsDataURL(file);
                                    }));
                                }

                                const new_images = [];

                                let read_file = (index) => {
                                    if (index < target.files.length) {
                                        asyncReader(target.files[index]).then(async result => {
                                            new_images.push(result);
                                            return read_file(index + 1)
                                        })
                                    }
                                    else {
                                        if (new_images.length === target.files.length) {
                                            const new_new_images = [...images, ...new_images];
                                            new_new_images.splice(5, new_new_images.length - 5)
                                            if (new_new_images.length < 6) {
                                                setImages(new_new_images)
                                            }
                                        }
                                    }
                                }
                                read_file(0);
                            }}
                            multiple
                            type="file"
                            hidden
                        />
                    </Button>
                </form>
                {loading ?
                    <CircularProgress color="inherit" />
                    :
                    <Button
                        onClick={() => {}}
                        variant={"contained"}
                        type="submit"
                        fullWidth
                        color="primary"
                        className={classes.submit}
                    >
                        Fill info
                    </Button>
                }
            </div>
        </Container>
    )
}