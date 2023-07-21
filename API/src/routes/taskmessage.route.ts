import express from "express";
import taskmessagesController from "../controllers/taskMessages.controller ";
// import { authUser } from "../middlewares/authToken.middlewares";
const router = express.Router();

router.get("/get-taskmessages/:groupId", taskmessagesController.getTaskMessagesInTask);

// router.post("/create-taskmessages", authUser, taskmessagesController.createtaskMessaes);
router.post("/create-taskmessages", taskmessagesController.createtaskMessaes);

router.post(
  "/delete-taskmessages",

  taskmessagesController.deleteMessagesInTask
);

export default router;
