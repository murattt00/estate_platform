const express = require("express");
const authorController = require("../controllers/authorController");

const router = express.Router();

router.post("/", authorController.createAuthor);
router.post("/login", authorController.loginAuthor);
router.get("/logout", authorController.logoutAuthor);

module.exports = router;