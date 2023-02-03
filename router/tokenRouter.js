const express = require('express');
const { tokenController } = require('../controllers/tokenController');
const router = express.Router();


router.post('/login', tokenController.login);
router.post('/', tokenController.token);
router.post('/tokencontrol', tokenController.tokenControl);



module.exports = router