const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity");

router.get("/", activityController.getActivityList);

router.post("/", activityController.createActivity);

router.put("/:id", activityController.editActivity);

router.delete("/:id", activityController.deleteActivity);

router.get("/:id", activityController.getActivity);

router.post("/join/:id", activityController.joinActivity);

module.exports = router;
