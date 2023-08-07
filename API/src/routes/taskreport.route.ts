import express from "express";
import taskReportController from "../controllers/taskReport.controller";
// import { authUser } from "../middlewares/authToken.middlewares";
const router = express.Router();

router.get("/get-all/:taskid", taskReportController.getAllReport);
router.get("/get/:id", taskReportController.getDataReport);

// router.post("/create-taskmessages", authUser, taskmessagesController.createtaskMessaes);
router.post("/create", taskReportController.createReport);



export default router;
