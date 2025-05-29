const express = require("express");
const router = express.Router();
const {trackVisitor} = require("../controllers/visitControllers.js");

router.route("/track-visitor").get(trackVisitor);

module.exports = router