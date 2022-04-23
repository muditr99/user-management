const express = require('express');

const router = express.Router();

const passport = require('passport');

const homeController = require('../controllers/home_controller');
const userController = require('../controllers/users_controller');


router.get('/', homeController.home);
router.get('/sign-in', homeController.signIn);
router.get('/sign-up', homeController.signUp);

router.post('/create', homeController.create);

// used local passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect : '/sign-in'}
), homeController.createSession);

router.use('/users', require('./users'));


module.exports = router;