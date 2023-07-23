"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobByTimeService = exports.getJobByUserService = exports.createJobService = void 0;
const sequelize_1 = require("sequelize");
const job_model_1 = require("../models/job.model");
const createJobService = async (newJob) => {
    newJob.createat = new Date();
    const job = await job_model_1.jobModel.create(newJob);
    return {
        statusCode: "200",
        message: "tạo kết nối thành công",
        data: job,
    };
};
exports.createJobService = createJobService;
const getJobByTimeService = async (userId) => {
    const foundGroup = await job_model_1.jobModel.findAll({
        where: {
            [sequelize_1.Op.or]: [{ adminid: userId }, { leaderid: userId }],
        },
        order: [["createat", "DESC"]],
    });
    return {
        statusCode: "200",
        message: "",
        data: foundGroup,
    };
};
exports.getJobByTimeService = getJobByTimeService;
const getJobByUserService = async (adminid, leaderid) => {
    const foundGroup = await job_model_1.jobModel.findAll({
        where: {
            adminid: adminid,
            leaderid: leaderid,
        },
    });
    return {
        statusCode: "200",
        message: "lấy dữ liệu thành công",
        data: foundGroup,
    };
};
exports.getJobByUserService = getJobByUserService;
//# sourceMappingURL=job.service.js.map