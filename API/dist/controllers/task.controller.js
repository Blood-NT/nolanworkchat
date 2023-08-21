"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
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
        const { taskid, donetmp } = req.body;
        const response = await (0, task_service_1.updateIsDoneTaskService)(taskid, donetmp);
        res.status(200).json(response);
        logging_1.default.debug("okkk", taskid + "    " + donetmp);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const checkTask = async (req, res) => {
    try {
        const { id, memid, ischeck } = req.body;
        logging_1.default.debug("haiizizz", "huhu", req.body);
        logging_1.default.debug("haiizizz", "huhu", id + memid + ischeck);
        const response = await (0, task_service_1.checkTaskServices)(id, memid, ischeck);
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
    checkTask,
    getTaskByJob,
    getTaskByDeadline,
    getTaskByTime,
    getTaskByLeader,
    getAllTaskByLeader
};
//# sourceMappingURL=task.controller.js.map