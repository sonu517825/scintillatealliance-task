const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");

router.post("/connect", indexController.connect);

module.exports = router;
