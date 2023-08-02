import { taskmessagesModel } from "../models/taskmessages.model";
import { taskmessages } from "../interfaces/taskmessages.interface";
import response from "../interfaces/response.interface";
import { updateTimeTaskService } from "./task.service";
const createTaskMessagesService = async (
  newMessages: taskmessages
): Promise<response> => {
  newMessages.createAt = new Date();
  const taskMessages: taskmessages = await taskmessagesModel.create(newMessages);
  await updateTimeTaskService(newMessages.taskid);
  return {
    statusCode: "200",
    message: "tạo tin nhắn task thành công",
    data: taskMessages,
  };
};

const getTaskMessagesService = async (
  taskid: string
): Promise<response> => {
  const allMessaes: taskmessages[] = await taskmessagesModel.findAll({
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

const deleteTaskMessagesService = async (
  messagesId: string
): Promise<response> => {
  await taskmessagesModel.destroy({
    where: {
      id: messagesId,
    },
  });
  return {
    statusCode: "200",
    message: "xóa tin nhắn thành công",
  };
};
export {
  createTaskMessagesService,
  getTaskMessagesService,
  deleteTaskMessagesService
};
