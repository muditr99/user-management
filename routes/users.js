const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/users_controller');


router.get('/', passport.checkAuthentication, userController.list);
router.post('/add', userController.addUser);
router.get('/delete', userController.removeUser);
router.post('/edit', userController.editUser);


module.exports = router;