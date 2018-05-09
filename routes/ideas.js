const router = require('express').Router();
const ic = ideasController = require('../controllers/ideas');
const {isLoggedIn, ownsIdea} = require('../utilities/utility');


router.get('/', isLoggedIn, ic.index);

router.get('/new', isLoggedIn, ic.new);

router.post('/', isLoggedIn, ic.formValidation, ic.create);

router.get('/:idea_id/edit', isLoggedIn, ownsIdea, ic.edit);

router.put('/:idea_id', isLoggedIn, ownsIdea, ic.formValidation, ic.update);

router.delete('/:idea_id', isLoggedIn, ownsIdea, ic.delete);

module.exports = router;