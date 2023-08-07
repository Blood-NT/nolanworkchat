
import response from "../interfaces/response.interface";
import { updateTimeTaskService } from "./task.service";
import { taskreport } from "../interfaces/taskreport.interface";
import { taskreportModel } from "../models/taskreport.model";
const createTaskReportService = async (
  newMessages: taskreport
): Promise<response> => {
  newMessages.createat = new Date();
  const taskMessages: taskreport = await taskreportModel.create(newMessages);
  await updateTimeTaskService(newMessages.taskid);
  return {
    statusCode: "200",
    message: "tạo tin báo cáo",
    data: taskMessages,
  };
};

const getTaskReportService = async (
  id: string
): Promise<response> => {
  const report: taskreport | null = await taskreportModel.findOne({
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
const getAllTaskReportService = async (
  taskid: string
): Promise<response> => {
  const report: taskreport[] = await taskreportModel.findAll({
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

export {
  getAllTaskReportService, getTaskReportService, createTaskReportService
};
