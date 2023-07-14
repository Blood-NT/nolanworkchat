import { taskmessagesModel } from "../models/taskmessages.model";
import { taskmessages } from "../interfaces/taskmessages.interface";
import response from "../interfaces/response.interface";
import { updateTimeGroupService } from "./group.service";
const createTaskMessagesService = async (
  newMessages: taskmessages
): Promise<response> => {
  newMessages.createAt = new Date();
  const taskMessages: taskmessages = await taskmessagesModel.create(newMessages);
  await updateTimeGroupService(newMessages.taskid);
  return {
    statusCode: "200",
    message: "tạo tin nhắn task thành công",
    data: taskMessages,
  };
};

const getTaskMessagesInGroupService = async (
  taskid: number
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

export {
  createTaskMessagesService,
  getTaskMessagesInGroupService,
};
