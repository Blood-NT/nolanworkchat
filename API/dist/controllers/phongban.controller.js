"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const phongban_service_1 = require("../services/phongban.service");
const createRoom = async (req, res) => {
    try {
        const newRoom = req.body;
        const response = await (0, phongban_service_1.createRoomService)(newRoom);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getRoom = async (req, res) => {
    try {
        const response = await (0, phongban_service_1.getAllRoomService)();
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
    logging_1.default.debug("haizzz", "met", req);
};
const getDataRoom = async (req, res) => {
    try {
        const roomId = req.body.roomId;
        const response = await (0, phongban_service_1.getDataRoomService)(roomId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
    logging_1.default.debug("haizzz", "met", req);
};
const updateRoom = async (req, res) => {
    try {
        const roomId = req.body.roomId;
        const roomName = req.body.roomName;
        roomName;
        logging_1.default.debug("okkk", "", req.body);
        const response = await (0, phongban_service_1.updateRoomService)(roomId, roomName);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
    logging_1.default.debug("haizzz", "met", req);
};
const deleteRoom = async (req, res) => {
    try {
        const roomId = req.body.roomId;
        const response = await (0, phongban_service_1.deleteRoomService)(roomId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createRoom, getRoom, getDataRoom, updateRoom, deleteRoom
};
//# sourceMappingURL=phongban.controller.js.map