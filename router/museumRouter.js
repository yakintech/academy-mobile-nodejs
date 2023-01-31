const express = require('express');
const { museumController } = require('../controllers/museumController');
const router = express.Router();
const { body } = require('express-validator');


router.get('/', museumController.getAll);


router.post(
    '/',
    body('title').notEmpty().withMessage('title field is required!'),
    museumController.add)


router.get('/:id', museumController.getById)
router.delete('/:id', museumController.deleteById)


module.exports = router