const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


module.exports.registerValidation = [
    body('name', 'Name is required').trim().isLength({min: 1}),
    body('email').trim()
        .isLength({min: 1}).withMessage('Email is required')
        .isEmail().withMessage('Incorrect format for email'),
    body('password')
        .isLength({min: 1}).withMessage('Password is required')
        .matches(/[^\s]/).withMessage('Must not contain any whitespace characters')
        .matches(/[a-zA-Z]/).withMessage('Must contain at least one letter'),
    body('password2')
        .exists()
        .custom((val, {req}) => val === req.body.password).withMessage('Passwords do not match'),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('email').trim().normalizeEmail(),
    sanitizeBody('password').escape()
];

module.exports.login = (req, res) => {
    res.render('users/login');
};

module.exports.register = (req, res) => {
    res.render('users/register');
};

module.exports.registerPost = (req, res, next) => {
    const user = matchedData(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('users/register', {errors: errors.array({onlyFirstError: true}), name: user.name, email: user.email})
    }
    User.findOne({email: user.email}, (err, user) => {
        if (err) {
            return next(err);
        }
        if (user) {
            req.flash('error_msg', 'This email has already been registered');
            return res.redirect('back');
        }
        let newUser = new User({
            name: user.name,
            email: user.email,
        });
        bcrypt.hash(user.password, 10, (err, hash) => {
            newUser.password = hash;
            newUser.save((err) => {
                if (err) {
                    return next(err);
                }
                req.flash('success_msg', 'You are now registered');
                res.redirect('/users/login');
            });
        });
    });
};

module.exports.logout = (req, res) => {
    res.send('logout');
};