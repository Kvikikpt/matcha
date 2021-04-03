const express = require('express');
const router = express.Router();
const {db} = require('../db');
const uuid = require('uuid');
const md5 = require('md5');

const middleware = require('../middleware');

/* GET home page. */
router.post('/', middleware.validators.auth, function(req, res, next) {
    if (!req.id) res.json({status: 2, message: 'Unknown error'});
    res.json({status: 0, token: middleware.generateToken(req.id)})
});

/* GET home page. */
router.post('/register', middleware.validators.register, async function(req, res, next) {
    const {
        username,
        email,
        password,
        firstName,
        lastName,
    } = req.body;
    const hash_pass = md5(process.env.SAULT || 'somesalt' + password)
    const id = uuid.v1();

    db.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', err => {
                    if (err) {
                        console.error('Error rolling back client', err.stack)
                    }
                    // release the client back to the pool
                    done()
                })
            }
            return !!err
        };
        client.query('BEGIN', err => {
            if (shouldAbort(err)) return res.json({status: 3, message: 'Something went wrong on Server'})
            client.query(`insert into public.user (id, email, username, firstname, lastname, password) values (
                    '${id}',
                    '${email.toLowerCase()}',
                    '${username}',
                    '${firstName}',
                    '${lastName}',
                    '${hash_pass}'
                    ) `, (err, db_res) => {
                if (shouldAbort(err)) return res.json({status: 3, message: 'Something went wrong with DB'});
                try {
                    const token = middleware.generateToken(id)
                    client.query('COMMIT', err => {
                        if (err) {
                            return res.json({status: 3, message: 'Something went wrong with DB'});
                        }
                        res.json({status: 0, token});
                        done()
                    })
                }
                catch (e) {
                    console.log(e);
                    if (shouldAbort(err)) return res.json({status: 3, message: 'Something went wrong with Token'});
                }
            })
        });
    }, () => {
        if(!res.headersSent) res.json({status: 3, message: 'Something went wrong on Server'})
    })
});

module.exports = router;