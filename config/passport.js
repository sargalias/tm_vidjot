const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
        },
        function(email, password, done) {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect email and/or password.' });
                }
                // Check user password
                bcrypt.compare(password, user.password, (err, res) => {
                    if (err) {
                        return done(err);
                    }
                    if (!res) {
                        return done(null, false, { message: 'Incorrect email and/or password.' });
                    }
                    return done(null, user);
                });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });
};