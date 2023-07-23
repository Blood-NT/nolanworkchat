"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskMessagesService = exports.getTaskMessagesService = exports.createTaskMessagesService = void 0;
const taskmessages_model_1 = require("../models/taskmessages.model");
const task_service_1 = require("./task.service");
const createTaskMessagesService = async (newMessages) => {
    newMessages.createAt = new Date();
    const taskMessages = await taskmessages_model_1.taskmessagesModel.create(newMessages);
    await (0, task_service_1.updateTimeTaskService)(newMessages.taskid);
    return {
        statusCode: "200",
        message: "tạo tin nhắn task thành công",
        data: taskMessages,
    };
};
exports.createTaskMessagesService = createTaskMessagesService;
const getTaskMessagesService = async (taskid) => {
    const allMessaes = await taskmessages_model_1.taskmessagesModel.findAll({
        where: {
            taskid: taskid,
        },
    });
    return {
        statusCode: "200",
        message: "lấy tin nhắn task thành công",
        data: allMessaes,
    };
};
exports.getTaskMessagesService = getTaskMessagesService;
const deleteTaskMessagesService = async (messagesId) => {
    await taskmessages_model_1.taskmessagesModel.destroy({
        where: {
            id: messagesId,
        },
    });
    return {
        statusCode: "200",
        message: "xóa tin nhắn thành công",
    };
};
exports.deleteTaskMessagesService = deleteTaskMessagesService;
//# sourceMappingURL=taskmessages.service.js.map