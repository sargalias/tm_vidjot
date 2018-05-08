
module.exports.login = (req, res) => {
    res.render('users/login');
};

module.exports.register = (req, res) => {
    res.send('register');
};

module.exports.logout = (req, res) => {
    res.send('logout');
};