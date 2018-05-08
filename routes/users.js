const router = require('express').Router();
const uc = usersController = require('../controllers/users');


router.get('/register', uc.register);

router.get('/login', uc.login);

router.get('/logout', uc.logout);

module.exports = router;
