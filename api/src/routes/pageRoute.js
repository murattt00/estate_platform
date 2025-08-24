const express = require("express");
const pageController = require("../controllers/pageController");

const router = express.Router();

router.get("/", pageController.getLoginPage);
router.get("/dashboard", pageController.getDashboardPage);
router.get("/appointment", pageController.getAppointmentPage);
router.get("/register", pageController.getRegisterPage);

module.exports = router;
