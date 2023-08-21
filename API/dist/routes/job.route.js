"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const job_controller_1 = __importDefault(require("../controllers/job.controller"));
const router = express_1.default.Router();
router.get("/get-job/:sender/:receive", job_controller_1.default.getJobByUser);
router.get("/get-jobs/:userId", job_controller_1.default.getJobByTime);
router.post("/create-job", job_controller_1.default.createJob);
router.put("/jobDone", job_controller_1.default.doneJob);
exports.default = router;
//# sourceMappingURL=job.route.js.map