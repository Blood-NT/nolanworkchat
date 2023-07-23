"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskMessages_controller_1 = __importDefault(require("../controllers/taskMessages.controller "));
const router = express_1.default.Router();
router.get("/get-taskmessages/:groupId", taskMessages_controller_1.default.getTaskMessagesInTask);
router.post("/create-taskmessages", taskMessages_controller_1.default.createtaskMessaes);
router.post("/delete-taskmessages", taskMessages_controller_1.default.deleteMessagesInTask);
exports.default = router;
//# sourceMappingURL=taskmessage.route.js.map