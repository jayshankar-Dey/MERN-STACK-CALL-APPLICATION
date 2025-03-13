const express = require('express');
const Login_controller = require('../controllers/Login.controller');
const OTP_controller = require('../controllers/Otp.verify.controller');
const get_Login_user = require('../controllers/getLoginuser.controller');
const is_Auth = require('../middlewares/is_Auth.middleware');
const get_login_users = require('../controllers/getAll_Login_Users.controller');
const is_user_in_call = require('../controllers/is_user_inCall.controller');
const router = express.Router()

router.post('/login', Login_controller)
router.post('/verify/otp', OTP_controller)
router.get('/login/user/:id?', is_Auth, get_Login_user)
router.post('/get/all-users', is_Auth, get_login_users)
router.post('/iscall', is_Auth, is_user_in_call)

module.exports = router