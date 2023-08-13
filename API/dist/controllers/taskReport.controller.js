"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskreport_service_1 = require("../services/taskreport.service");
const createReport = async (req, res) => {
    try {
        const newMessages = req.body;
        const response = await (0, taskreport_service_1.createTaskReportService)(newMessages);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getDataReport = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await (0, taskreport_service_1.getTaskReportService)(id);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
const getAllReport = async (req, res) => {
    try {
        const taskid = req.params.taskid;
        const response = await (0, taskreport_service_1.getAllTaskReportService)(taskid);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(200).json({ statusCode: "400", message: `${error}` });
    }
};
exports.default = {
    createReport, getDataReport, getAllReport
};
//# sourceMappingURL=taskReport.controller.js.map