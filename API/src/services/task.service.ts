import { Op } from "sequelize";
import { taskModel } from "../models/task.model";
import { task } from "../interfaces/task.interface";
import response from "../interfaces/response.interface";

const createTaskService = async (newGroup: task): Promise<response> => {
  const group: task = await taskModel.create(newGroup);
  return {
    statusCode: "200",
    message: "tạo kết nối thành công",
    data: group,
  };
};

const getTaskByDeadlineService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }],
      isdone: false,// thay bằng done
    },
    order: [["end", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};
const getTaskByJobService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }],
      isdone: false,// thay bằng done
    },
    order: [["jobid", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};


const getTaskByTimeService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }],
      isdone: false,
    },
    order: [["updateAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};


const getTaskService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }],
      isdone: false,
    },
    order: [["updateAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};


const updateIsDoneTaskService = async (
  sender: string,
  receive: string
): Promise<response> => {
  await taskModel.update(
    {
      isdone: true,
      updatedAt: new Date(),
    },
    {
      where: { leaderid: sender, memid: receive },
    }
  );
  return {
    statusCode: "200",
    message: "cập nhật thành công",
  };
};

const notDoneTask = async (
  sender: string,
  receive: string
): Promise<response> => {
  await taskModel.update(
    {
      isdone: false,
      updatedAt: new Date(),
    },
    {
      where: { leaderid: sender, memid: receive },
    }
  );
  return {
    statusCode: "200",
    message: "cập nhật thành công",
  };
};

const updateTimeTaskService = async (id: number): Promise<response> => {
  await taskModel.update(
    {
      updatedAt: new Date(),
    },
    {
      where: { id: id },
    }
  );
  return {
    statusCode: "200",
    message: "cập nhật thành công",
  };
};

export {
  createTaskService,
  getTaskByDeadlineService,
  getTaskByTimeService,
  getTaskService,
  getTaskByJobService,
  updateIsDoneTaskService,
  updateTimeTaskService,
  notDoneTask
};
