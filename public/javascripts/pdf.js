
var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')

const express=require('express');
const payController=require('../controllers/pay');

const router=express.Router();

router.post('/bregister',payController.bregister)


window.onload = function () {
    document.getElementById("download")
        .addEventListener("click", () => {
            const invoice = this.document.getElementById("invoice");
            console.log(invoice);
            console.log(window);
            var opt = {
                margin: 1,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(invoice).set(opt).save();
        })

} 
module.exports=router;



