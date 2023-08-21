"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phongban_controller_1 = __importDefault(require("../controllers/phongban.controller"));
const router = express_1.default.Router();
router.get("/get-room", phongban_controller_1.default.getRoom);
router.get("/get-data-room", phongban_controller_1.default.getDataRoom);
router.post("/create", phongban_controller_1.default.createRoom);
router.put("/update", phongban_controller_1.default.updateRoom);
router.put("/delete", phongban_controller_1.default.deleteRoom);
exports.default = router;
//# sourceMappingURL=room.route.js.map