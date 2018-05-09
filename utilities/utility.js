module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.flash('error', 'Not authorized');
    res.redirect('/users/login');
};