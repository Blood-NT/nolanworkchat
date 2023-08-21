"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTaskServices = exports.updateTimeTaskService = exports.updateIsDoneTaskService = exports.getAllTaskByLeaderService = exports.getTaskByLeaderService = exports.getTaskByJobService = exports.getTaskService = exports.getTaskByTimeService = exports.getTaskByDeadlineService = exports.createTaskService = void 0;
const sequelize_1 = require("sequelize");
const task_model_1 = require("../models/task.model");
const logging_1 = __importDefault(require("../config/logging"));
const createTaskService = async (newTask) => {
    const foundUser = await task_model_1.taskModel.findOne({
        where: { id: newTask.id }
    });
    if (foundUser) {
        return { statusCode: "400", message: "idTask đã tồn tại" };
    }
    newTask.createat = new Date();
    newTask.updatedAt = new Date();
    newTask.isdone = 0;
    newTask.ischeck = false;
    const group = await task_model_1.taskModel.create(newTask);
    return {
        statusCode: "200",
        message: "tạo kết nối thành công",
        data: group,
    };
};
exports.createTaskService = createTaskService;
const getTaskByDeadlineService = async (userId) => {
    const foundGroup = await task_model_1.taskModel.findAll({
        where: {
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }]
        },
        order: [["end", "DESC"]],
    });
    return {
        statusCode: "200",
        message: "",
        data: foundGroup,
    };
};
exports.getTaskByDeadlineService = getTaskByDeadlineService;
const getTaskByJobService = async (userId) => {
    const foundGroup = await task_model_1.taskModel.findAll({
        where: {
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }]
        },
        order: [["jobid", "DESC"]],
    });
    return {
        statusCode: "200",
        message: "",
        data: foundGroup,
    };
};
exports.getTaskByJobService = getTaskByJobService;
const getTaskByTimeService = async (userId) => {
    const foundGroup = await task_model_1.taskModel.findAll({
        where: {
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }]
        },
        order: [["updatedAt", "DESC"]],
    });
    return {
        statusCode: "200",
        message: "",
        data: foundGroup,
    };
};
exports.getTaskByTimeService = getTaskByTimeService;
const getTaskService = async (userId) => {
    const foundGroup = await task_model_1.taskModel.findAll({
        where: {
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }]
        },
        order: [["updatedAt", "DESC"]],
    });
    return {
        statusCode: "200",
        message: "",
        data: foundGroup,
    };
};
exports.getTaskService = getTaskService;
const getAllTaskByLeaderService = async (userId) => {
    const foundGroup = await task_model_1.taskModel.findAll({
        where: {
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }]
        },
        order: [["leaderid", "DESC"]],
    });
    return {
        statusCode: "200",
        message: "",
        data: foundGroup,
    };
};
exports.getAllTaskByLeaderService = getAllTaskByLeaderService;
const getTaskByLeaderService = async (leaderid, memid) => {
    const foundGroup = await task_model_1.taskModel.findAll({
        where: {
            leaderid: leaderid,
            memid: memid,
        },
    });
    return {
        statusCode: "200",
        message: "lấy dữ liệu thành công",
        data: foundGroup,
    };
};
exports.getTaskByLeaderService = getTaskByLeaderService;
const checkTaskServices = async (idTask, memid, check) => {
    logging_1.default.debug("check Task", "service", idTask);
    await task_model_1.taskModel.update({
        ischeck: check,
        updatedAt: new Date(),
    }, {
        where: {
            memid: memid,
            id: idTask
        },
    });
    return {
        statusCode: "200",
        message: "checkTask",
    };
};
exports.checkTaskServices = checkTaskServices;
const updateIsDoneTaskService = async (taskid, isdonetmp) => {
    await task_model_1.taskModel.update({
        isdone: isdonetmp,
        updatedAt: new Date(),
    }, {
        where: { id: taskid },
    });
    return {
        statusCode: "200",
        message: "cập nhật thành công",
    };
};
exports.updateIsDoneTaskService = updateIsDoneTaskService;
const updateTimeTaskService = async (id) => {
    await task_model_1.taskModel.update({
        updatedAt: new Date(),
    }, {
        where: { id: id },
    });
    return {
        statusCode: "200",
        message: "cập nhật thành công",
    };
};
exports.updateTimeTaskService = updateTimeTaskService;
//# sourceMappingURL=task.service.js.map