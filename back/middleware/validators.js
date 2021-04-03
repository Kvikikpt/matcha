const {db} = require('../db');
const md5 = require('md5')

async function auth(req, res, next) {
    if (!req.body) return res.json({status: 2, message: "Invalid data send"});
    const {
        login,
        password
    } = req.body;

    const errMessages = {
        login: '',
        password: '',
        message: ''
    }

    if (!login) errMessages.login = 'Please fill login field';
    if (!password) errMessages.password = 'Please fill password field';
    if (login && password) {
        const hash_pass = md5(process.env.SAULT || 'somesalt' + password);
        const user_data = db.query(`select id from public.user where password = '${hash_pass}'
                                    and (username = '${login}' or email = '${login.toLowerCase()}')`);
        if (user_data.rows && user_data.rows.length === 1) {
            req.id = user_data.rows[0].id
            next()
        }
        else {
            errMessages.message = 'Login and pass does not match any user'
        }
    }
    if (errMessages.login || errMessages.message || errMessages.password) res.json({status: 1, errMessages})
    else res.json({status: 2, message: 'Unknown error'});
}

async function register(req, res, next) {
    if (!req.body) return res.json({status: 2, message: "Invalid data send"});
    const {
        username,
        email,
        password,
        repeatPassword,
        firstName,
        lastName,
    } = req.body;
    const errMessages = {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: ''
    }

    if (!username) errMessages.username = 'Please fill in Username field';
    else {
        const username_data = await db.query(`select username from public.user where username = '${username}'`);
        if (username_data.rows.length > 0) errMessages.username = 'Username already taken';
        else if (username.length > 20) errMessages.username = 'Too long username 20 characters max';
    }

    if (!email) errMessages.email = 'Please fill in Email field';
    else if (!/\w+@\w+\.\w+/.test(email)) errMessages.email = 'Invalid email field';
    else if (email.length > 20) errMessages.email = 'Too long username 20 characters max';
    else {
        const username_data = await db.query(`select email from public.user where email = '${email}'`);
        if (username_data.rows.length > 0) errMessages.email = 'Email already in use';
    }

    if (!password) errMessages.password = 'Please fill in Password field';
    else if (!/\d/.test(password) || !/[A-Z]/.test(password))
        errMessages.password = 'Password field invalid. It must contain digits and uppercase characters';
    else if (password.length > 200) errMessages.password = "Too long password field, 200 characters max"
    else if (password.length < 8) errMessages.password = "Too short password field, at least 8 characters"

    if (!repeatPassword) errMessages.repeatPassword = 'Please fill in Repeat Password field';
    else if (repeatPassword !== password) errMessages.repeatPassword = 'Passwords don\'t match';
    else if (repeatPassword.length > 200) errMessages.repeatPassword = "Too long password field, 200 characters max"

    if (!firstName) errMessages.firstName = 'Please fill in firstName field'
    else if (firstName.length > 30) errMessages.firstName = "Too long firstName field, 30 characters max"

    if (!lastName) errMessages.lastName = 'Please fill in lastName field'
    else if (lastName.length > 30) lastName.firstName = "Too long lastName field, 30 characters max"

    if (errMessages.lastName || errMessages.repeatPassword || errMessages.firstName
        || errMessages.password || errMessages.email || errMessages.username)
        return res.json({status: 1, errMessages})
    next();
}

module.exports = {
    auth,
    register
}