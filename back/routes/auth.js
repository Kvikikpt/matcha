const express = require('express');
const router = express.Router();

const {validate_auth} = require('../middleware/validarots/auth')

/* GET home page. */
router.post('/', validate_auth, function(req, res, next) {
    res.json({status: 'ok'})
});

module.exports = router;