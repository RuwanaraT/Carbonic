const express=require('express');
const authController=require('../controllers/auth');

const router=express.Router();

router.post('/bregister',authController.bregister);
router.post('/blogin',authController.blogin);
router.post('/contact',authController.contact);
router.get('/deleteBuyer/:id',authController.deleteBuyer);
router.get('/editbuyer/:id',authController.editbuyer);
router.post('/updatebuyer/:id',authController.updatebuyer);



module.exports=router;