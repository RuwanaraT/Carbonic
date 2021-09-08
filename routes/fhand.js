const express = require("express");
const fhandController = require("../controllers/fhand");

const router = express.Router();

router.post('/fregister', fhandController.fregister)

router.post('/login', fhandController.login);



module.exports = router;