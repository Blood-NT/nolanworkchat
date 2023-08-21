"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataRoomService = exports.getAllRoomService = exports.updateRoomService = exports.deleteRoomService = exports.createRoomService = void 0;
const phongban_model_1 = require("../models/phongban.model");
const logging_1 = __importDefault(require("../config/logging"));
const user_model_1 = require("../models/user.model");
const createRoomService = async (newRoom) => {
    const Room = await phongban_model_1.phongbanModel.findOne({
        where: { id: newRoom.id }
    });
    if (Room) {
        if ((Room === null || Room === void 0 ? void 0 : Room.isdelete) === false) {
            return { statusCode: "400", message: "phòng đã tồn tại" };
        }
        await phongban_model_1.phongbanModel.update({
            tenphong: newRoom.tenphong,
            isdelete: false
        }, {
            where: {
                id: newRoom.id,
            },
        });
        return {
            statusCode: "200",
            message: "tạo phòng thành công",
        };
    }
    const group = await phongban_model_1.phongbanModel.create(newRoom);
    return {
        statusCode: "200",
        message: "tạo phòng thành công",
        data: group,
    };
};
exports.createRoomService = createRoomService;
const getDataRoomService = async (roomId) => {
    const room = await phongban_model_1.phongbanModel.findOne({
        where: {
            id: roomId
        },
    });
    return {
        statusCode: "200",
        message: "lấy thông tin phòng thành công",
        data: room,
    };
};
exports.getDataRoomService = getDataRoomService;
const getAllRoomService = async () => {
    const room = await phongban_model_1.phongbanModel.findAll({
        where: { isdelete: false }
    });
    return {
        statusCode: "200",
        message: "lấy danh sách tất cả các phòng",
        data: room,
    };
};
exports.getAllRoomService = getAllRoomService;
const updateRoomService = async (idRoom, tenPhong) => {
    await phongban_model_1.phongbanModel.update({
        tenphong: tenPhong,
    }, {
        where: {
            id: idRoom,
        },
    });
    return {
        statusCode: "200",
        message: "update thanhf coong",
    };
};
exports.updateRoomService = updateRoomService;
const deleteRoomService = async (idRoom) => {
    const userCheck = await user_model_1.userModel.findOne({
        where: { idphongban: idRoom }
    });
    if (userCheck) {
        logging_1.default.debug("haizzz", "met", userCheck);
        return { statusCode: "400", message: "phòng này hiện tại đang có nhân viên, không thể xóa" };
    }
    await phongban_model_1.phongbanModel.update({
        isdelete: true
    }, {
        where: {
            id: idRoom,
        },
    });
    return {
        statusCode: "200",
        message: "xóa phòng thành công",
    };
};
exports.deleteRoomService = deleteRoomService;
//# sourceMappingURL=phongban.service.js.map