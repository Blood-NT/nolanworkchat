"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const job_service_1 = require("../services/job.service");
const createJob = async (req, res) => {
    try {
        const newGroup = req.body;
        const response = await (0, job_service_1.createJobService)(newGroup);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getJobByTime = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await (0, job_service_1.getJobByTimeService)(userId);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getJobByUser = async (req, res) => {
    try {
        const sender = req.params.sender;
        const receive = req.params.receive;
        const response = await (0, job_service_1.getJobByUserService)(sender, receive);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createJob,
    getJobByUser,
    getJobByTime,
};
//# sourceMappingURL=job.controller.js.map