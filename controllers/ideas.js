const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');
const Idea = require('../models/Idea');


module.exports.formValidation = [
    body('title', 'Title is required').trim().isLength({min: 1}),
    body('details', 'Details are required').trim().isLength({min: 1}),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('details').trim().escape()
];

module.exports.index = (req, res) => {
    Idea
        .find()
        .sort({date: -1})
        .exec((err, ideas) => {
            if (err) {
                return next(err);
            }
            res.render('ideas/index', {ideas: ideas});
        });
};

module.exports.new = (req, res) => {
    res.render('ideas/new');
};

module.exports.create = (req, res, next) => {
    const errors = validationResult(req);
    const data = matchedData(req);
    if (!errors.isEmpty()) {
        return res.render('ideas/new', {
            errors: errors.array(),
            title: req.body.title,
            details: req.body.details
        });
    }
    const idea = new Idea({
        title: data.title,
        details: data.details,
        userId: req.user.id
    });
    idea.save((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Video idea added');
        res.redirect('/ideas');
    });
};

module.exports.edit = (req, res, next) => {
    Idea.findById(req.params.idea_id, (err, idea) => {
        if (err) {
            return next(err);
        }
        if (idea === null) {
            let err = new Error('Idea could not be found');
            err.statusCode = 404;
            return next(err);
        }
        res.render('ideas/edit', {idea: idea});
    });
};

module.exports.update = (req, res, next) => {
    Idea.findById(req.params.idea_id, (err, idea) => {
        if (err) {
            return next(err);
        }
        if (idea === null) {
            let err = new Error('Idea could not be found');
            err.statusCode = 404;
            return next(err);
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('ideas/edit', {
                errors: errors.array(),
                idea: idea
            });
        }
        idea.title = req.body.title;
        idea.body = req.body.details;
        idea.save((err) => {
            if (err) {
                return next(err);
            }
            req.flash('success_msg', 'Video idea updated');
            res.redirect('/ideas/');
        });
    });
};

module.exports.delete = (req, res, next) => {
    Idea.findByIdAndRemove(req.params.idea_id, (err) => {
        if (err) {
            return next(err);
        }
        req.flash('success_msg', 'Video idea removed');
        res.redirect('/ideas');
    });
};
