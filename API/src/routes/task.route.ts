import express from "express";
import taskController from "../controllers/task.controller";
// import { authUser } from "../middlewares/authToken.middlewares";

const router = express.Router();

router.get("/get-task-by-leader/:sender/:receive", taskController.getTaskByLeader);

router.get("/get-task/:userId", taskController.getTask);
router.get("/get-task-deadline/:userId", taskController.getTaskByDeadline);
router.get("/get-task-all-lead/:userId", taskController.getAllTaskByLeader);
router.get("/get-task-by-time/:userId", taskController.getTaskByTime);
router.get("/get-task-by-job/:userId", taskController.getTaskByJob);

// router.post("/create-job", authUser, jobController.createJob);
router.post("/create-task",  taskController.createTask);
router.put("/done-task", taskController.doneTask);

export default router;
