const router = require('express').Router();
const ic = ideasController = require('../controllers/ideas');
const {isLoggedIn} = require('../utilities/utility');


router.get('/', ic.index);

router.get('/new', isLoggedIn, ic.new);

router.post('/', isLoggedIn, ic.formValidation, ic.create);

router.get('/:idea_id/edit', isLoggedIn, ic.edit);

router.put('/:idea_id', isLoggedIn, ic.formValidation, ic.update);

router.delete('/:idea_id', isLoggedIn, ic.delete);

module.exports = router;