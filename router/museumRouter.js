const express = require('express');
const { museumController } = require('../controllers/museumController');
const router = express.Router();


router.get('/', museumController.getAll);
router.post('/', museumController.add)
router.get('/:id', museumController.getById)
router.delete('/:id', museumController.deleteById)


module.exports = router