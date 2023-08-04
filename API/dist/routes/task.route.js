"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("../controllers/task.controller"));
const router = express_1.default.Router();
router.get("/get-task-by-leader/:sender/:receive", task_controller_1.default.getTaskByLeader);
router.get("/get-task/:userId", task_controller_1.default.getTask);
router.get("/get-task-deadline/:userId", task_controller_1.default.getTaskByDeadline);
router.get("/get-task-all-lead/:userId", task_controller_1.default.getAllTaskByLeader);
router.get("/get-task-by-time/:userId", task_controller_1.default.getTaskByTime);
router.get("/get-task-by-job/:userId", task_controller_1.default.getTaskByJob);
router.post("/create-task", task_controller_1.default.createTask);
router.put("/done-task", task_controller_1.default.doneTask);
router.put("/check-task", task_controller_1.default.checkTask);
exports.default = router;
//# sourceMappingURL=task.route.js.map