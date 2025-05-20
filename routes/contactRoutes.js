const express = require("express");
const router = express.Router();
const {createContact} = require("../controllers/contactControllers.js");

router.route("/create").post(createContact);

module.exports = router