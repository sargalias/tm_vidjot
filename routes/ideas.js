const router = require('express').Router();
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');
const Idea = require('../models/Idea');

router.get('/', (req, res) => {
    res.send('Not implemented');
});

router.post('/', [
    body('title', 'Title is required').trim().isLength({min: 1}),
    body('details', 'Details are required').trim().isLength({min: 1}),
    sanitizeBody('title').trim().escape(),
    sanitizeBody('details').trim().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('ideas/new', {
            errors: errors.array(),
            title: req.body.title,
            details: req.body.details
        });
    }
    const idea = new Idea(req.body);
    idea.save((err, idea) => {
        if (err) {
            return next(err);
        }
        res.redirect('/ideas');
    });
});

router.get('/new', (req, res) => {
    res.render('ideas/new');
});

module.exports = router;