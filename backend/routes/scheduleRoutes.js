const express = require("express");

const router = express.Router();

const scheduleController = require("../controllers/scheduleController");

router.get("/", scheduleController.getSchedules);
router.post("/", scheduleController.createSchedule);
router.delete("/:id", scheduleController.deleteSchedule);
router.put("/:id", scheduleController.updateSchedule);

module.exports = router;
