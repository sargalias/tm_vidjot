const Idea = require('../models/Idea');

module.exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.flash('error', 'Not authorized');
    res.redirect('/users/login');
};

module.exports.ownsIdea = (req, res, next) => {
    Idea.findById(req.params.idea_id, (err, idea) => {
        if (err) {
            return next(err);
        }
        if (!idea) {
            let err = new Error('Idea not found');
            err.statusCode = 404;
            return next(err);
        }
        if (idea.userId !== req.user.id) {
            req.flash('error', 'You do own this idea');
            return res.redirect('/ideas');
        }
        next();
    });
};