const express = require("express");

const router = express.Router();

const tripController = require("../controllers/tripController");

router.get("/", tripController.getTrips);
router.post("/", tripController.createTrip);
router.get("/:id", tripController.getTripById);
router.delete("/:id", tripController.deleteTrip);
router.put("/:id", tripController.updateTrip);

module.exports = router;

