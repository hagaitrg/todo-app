const todos = require('../controller/TodoController');
var router = require('express').Router();

router.get('/', todos.index);
router.get('/:id', todos.show);
router.post('/', todos.store);
router.put('/:id', todos.update);
router.delete('/:id', todos.destroy);

module.exports = router;
