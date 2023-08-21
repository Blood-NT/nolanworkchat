import express from "express";
import userController from "../controllers/user.controller";
import { authUser } from "../middlewares/authToken.middlewares";

const router = express.Router();

router.get("/verify/:email/:uniqueString", userController.verifyEmail);

router.get(
  "/verify-password/:email/:uniqueString",
  userController.verifyChangePassword
);

router.get("/verified", userController.verified);

router.get("/get-all-user", userController.getAllUser);

router.get("/get-all-leader", userController.getAllLeader);
router.get("/get-all-member", userController.getAllMem);
router.get("/get-all-project", userController.getAllPM);

router.get("/get-user", userController.getUser);

router.post("/create-user", userController.createUser);

router.post("/forgot-password", userController.createForgotPassword);

router.post("/change-password", userController.changePassword);

router.post("/login", userController.login);

router.post("/login-token", userController.loginByToken);

router.put("/update-user", authUser, userController.updateUser);

router.post("/lock-user", authUser, userController.lockUser);



router.post("/set-role",authUser, userController.setRole);
// router.post("/set-role", authUser, userController.setRole);
router.post("/set-room", userController.setRoom);
// router.post("/lock-user", authUser, userController.lockUser);


router.post("/send-email", userController.sendMail);
export default router;
