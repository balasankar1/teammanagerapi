const express = require("express");
const { signin } = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signin", signin);

module.exports = router;
