const express = require("express");

const userController = require("../../controller/ControllerUsers/userControlller"); 


const router = express.Router();


router.post("/register", userController.createuser);

router.get("/user", userController.getUser);


module.exports = router;