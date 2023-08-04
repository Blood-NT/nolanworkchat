"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskmessages_service_1 = require("../services/taskmessages.service");
const createtaskMessaes = async (req, res) => {
    try {
        const newMessages = req.body;
        const response = await (0, taskmessages_service_1.createTaskMessagesService)(newMessages);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getTaskMessagesInTask = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const response = await (0, taskmessages_service_1.getTaskMessagesService)(groupId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const deleteMessagesInTask = async (req, res) => {
    try {
        const messagesId = req.body.messagesId;
        const response = await (0, taskmessages_service_1.deleteTaskMessagesService)(messagesId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createtaskMessaes,
    getTaskMessagesInTask,
    deleteMessagesInTask,
};
//# sourceMappingURL=taskMessages.controller%20.js.map