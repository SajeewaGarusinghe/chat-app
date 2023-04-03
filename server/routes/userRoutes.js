const { register,login ,setAvatar} = require('../controllers/usercontroller');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setavatar/:id', setAvatar);

module.exports=router; 