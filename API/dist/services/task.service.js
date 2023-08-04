"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTaskServices = exports.notDoneTask = exports.updateTimeTaskService = exports.updateIsDoneTaskService = exports.getAllTaskByLeaderService = exports.getTaskByLeaderService = exports.getTaskByJobService = exports.getTaskService = exports.getTaskByTimeService = exports.getTaskByDeadlineService = exports.createTaskService = void 0;
const sequelize_1 = require("sequelize");
const task_model_1 = require("../models/task.model");
const createTaskService = async (newTask) => {
    const foundUser = await task_model_1.taskModel.findOne({
        where: { id: newTask.id }
    });
    if (foundUser) {
        return { statusCode: "400", message: "idTask đã tồn tại" };
    }
    newTask.createat = new Date();
    newTask.updatedAt = new Date();
    newTask.isdone = false;
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
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }],
            isdone: false,
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
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }],
            isdone: false,
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
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }],
            isdone: false,
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
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }],
            isdone: false,
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
            [sequelize_1.Op.or]: [{ leaderid: userId }, { memid: userId }],
            isdone: false,
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
const checkTaskServices = async (idTask, uId) => {
    await task_model_1.taskModel.update({
        isdone: true,
        updatedAt: new Date(),
    }, {
        where: {
            memid: uId,
            id: idTask
        },
    });
    return {
        statusCode: "200",
        message: "checkTask",
    };
};
exports.checkTaskServices = checkTaskServices;
const updateIsDoneTaskService = async (sender, receive) => {
    await task_model_1.taskModel.update({
        isdone: true,
        updatedAt: new Date(),
    }, {
        where: { leaderid: sender, memid: receive },
    });
    return {
        statusCode: "200",
        message: "cập nhật thành công",
    };
};
exports.updateIsDoneTaskService = updateIsDoneTaskService;
const notDoneTask = async (sender, receive) => {
    await task_model_1.taskModel.update({
        isdone: false,
        updatedAt: new Date(),
    }, {
        where: { leaderid: sender, memid: receive },
    });
    return {
        statusCode: "200",
        message: "cập nhật thành công",
    };
};
exports.notDoneTask = notDoneTask;
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