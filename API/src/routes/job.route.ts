import express from "express";
import jobController from "../controllers/job.controller";
// import { authUser } from "../middlewares/authToken.middlewares";

const router = express.Router();

router.get("/get-job/:sender/:receive", jobController.getJobByUser);

router.get("/get-jobs/:userId", jobController.getJobByTime);

// router.post("/create-job", authUser, jobController.createJob);
router.post("/create-job",  jobController.createJob);
router.put("/jobDone",  jobController.doneJob);

export default router;
