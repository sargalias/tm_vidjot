const router = require('express').Router();
const { body, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');

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
    res.send('success');
});

router.get('/new', (req, res) => {
    res.render('ideas/new');
});

module.exports = router;