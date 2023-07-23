"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task.service");
const createTask = async (req, res) => {
    try {
        const newTask = req.body;
        const response = await (0, task_service_1.createTaskService)(newTask);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getTask = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await (0, task_service_1.getTaskService)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getTaskByJob = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await (0, task_service_1.getTaskByJobService)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getTaskByDeadline = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await (0, task_service_1.getTaskByDeadlineService)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getTaskByTime = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await (0, task_service_1.getTaskByTimeService)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getAllTaskByLeader = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await (0, task_service_1.getAllTaskByLeaderService)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getTaskByLeader = async (req, res) => {
    try {
        const sender = req.params.sender;
        const receive = req.params.receive;
        const response = await (0, task_service_1.getTaskByLeaderService)(sender, receive);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const doneTask = async (req, res) => {
    try {
        const leaderid = req.body.leaderid;
        const memid = req.body.memid;
        const response = await (0, task_service_1.updateIsDoneTaskService)(leaderid, memid);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createTask,
    getTask,
    doneTask,
    getTaskByJob,
    getTaskByDeadline,
    getTaskByTime,
    getTaskByLeader,
    getAllTaskByLeader
};
//# sourceMappingURL=task.controller.js.map