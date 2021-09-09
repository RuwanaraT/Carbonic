const express=require('express');
const authController=require('../controllers/auth');

const router=express.Router();

router.post('/bregister',authController.bregister);
router.post('/blogin',authController.blogin);

module.exports=router;