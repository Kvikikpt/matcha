const express = require('express');
const router = express.Router();
const middleware = require('../middleware');
const {db} = require('../db');

/* GET users listing. */
router.get('/get_user', middleware.verifyToken, async function (req, res, next) {
  if (!req.user.id) return res.json({status: 3, message: "Can't find user with given token"})
  let user = await db.query(`
  select username, email, is_admin, filled_info from public.user where id = '${req.user.id}'`)
      .catch(e => {
        console.log(e);
      });
  if (!user || !user.rows || user.rows.length !== 1) {
      return res.json({status: 2, message: "Something went wrong on the Server"});
  }
  res.send({status: 0, user: user.rows[0]});
});

module.exports = router;
