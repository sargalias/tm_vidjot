const router = require('express').Router();
const ic = ideasController = require('../controllers/ideas');


router.get('/', ic.index);

router.get('/new', ic.new);

router.post('/', ic.formValidation, ic.create);

router.get('/:idea_id/edit', ic.edit);

router.put('/:idea_id', ic.formValidation, ic.update);

router.delete('/:idea_id', ic.delete);

module.exports = router;