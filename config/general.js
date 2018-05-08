const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

function config(app) {
    // Handlebars middleware
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    // Body-Parser middleware
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // Method override middleware
    app.use(methodOverride('_method'));

    // Session middleware
    let sessionConfig = {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    };
    if (process.env.NODE_ENV === 'production') {
        sessionConfig.cookie = {
            secure: true
        };
        app.set('trust proxy', 1);
    }
    app.use(session(sessionConfig));

    // Connect flash middleware
    app.use(flash());

    // Global variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
    });
}
module.exports = config;