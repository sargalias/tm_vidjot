const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Not implemented');
});

router.post('/', (req, res) => {

});

router.get('/new', (req, res) => {
    res.render('ideas/new');
});

module.exports = router;