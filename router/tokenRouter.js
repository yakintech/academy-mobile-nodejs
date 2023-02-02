const express = require('express');
const { tokenController } = require('../controllers/tokenController');
const router = express.Router();


router.post('/', tokenController.login);
router.post('/tokencontrol', tokenController.tokenControl);



module.exports = router