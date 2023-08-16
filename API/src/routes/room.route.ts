import express from "express";
import phongbanController from "../controllers/phongban.controller";
// import { authUser } from "../middlewares/authToken.middlewares";

const router = express.Router();


router.get("/get-room", phongbanController.getRoom);
router.get("/get-data-room", phongbanController.getDataRoom);

// router.post("/create-job", authUser, jobController.createJob);
router.post("/create",  phongbanController.createRoom);
router.put("/update",  phongbanController.updateRoom);
router.put("/delete",  phongbanController.deleteRoom);


export default router;
