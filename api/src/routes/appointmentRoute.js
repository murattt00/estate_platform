const express = require("express");
const appointmentController = require("../controllers/appointmentController");
const protect = require("../middleware/auth");
const router = express.Router();

router.get("/:agent", protect, appointmentController.getAppointments);
router.post("/", protect, appointmentController.createAppointment);
router.put("/:id", protect, appointmentController.updateAppointment);
router.delete("/:id", protect, appointmentController.deleteAppointment);

module.exports = router;