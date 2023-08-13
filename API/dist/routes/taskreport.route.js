"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskReport_controller_1 = __importDefault(require("../controllers/taskReport.controller"));
const router = express_1.default.Router();
router.get("/get-all/:taskid", taskReport_controller_1.default.getAllReport);
router.get("/get/:id", taskReport_controller_1.default.getDataReport);
router.post("/create", taskReport_controller_1.default.createReport);
exports.default = router;
//# sourceMappingURL=taskreport.route.js.map