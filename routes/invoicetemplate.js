var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


const express=require('express');
const payController=require('../controllers/pay');

const router=express.Router();

router.post('/bregister',payController.bregister)

module.exports=router;