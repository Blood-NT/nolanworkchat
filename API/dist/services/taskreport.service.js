"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskReportService = exports.getTaskReportService = exports.getAllTaskReportService = void 0;
const task_service_1 = require("./task.service");
const taskreport_model_1 = require("../models/taskreport.model");
const createTaskReportService = async (newMessages) => {
    newMessages.createat = new Date();
    const taskMessages = await taskreport_model_1.taskreportModel.create(newMessages);
    await (0, task_service_1.updateTimeTaskService)(newMessages.taskid);
    return {
        statusCode: "200",
        message: "tạo tin báo cáo",
        data: taskMessages,
    };
};
exports.createTaskReportService = createTaskReportService;
const getTaskReportService = async (id) => {
    const report = await taskreport_model_1.taskreportModel.findOne({
        where: {
            id: id,
        },
    });
    return {
        statusCode: "200",
        message: "lấy báo cáo",
        data: report,
    };
};
exports.getTaskReportService = getTaskReportService;
const getAllTaskReportService = async (taskid) => {
    const report = await taskreport_model_1.taskreportModel.findAll({
        where: {
            taskid: taskid,
        },
    });
    return {
        statusCode: "200",
        message: "lấy báo cáo",
        data: report,
    };
};
exports.getAllTaskReportService = getAllTaskReportService;
//# sourceMappingURL=taskreport.service.js.map