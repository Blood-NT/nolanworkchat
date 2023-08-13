import { Op } from "sequelize";
import { taskModel } from "../models/task.model";
import { task } from "../interfaces/task.interface";
import response from "../interfaces/response.interface";
import logging from "../config/logging";

const createTaskService = async (newTask: task): Promise<response> => {
  const foundUser: task | null = await taskModel.findOne({
    where: { id: newTask.id }
  });
  if (foundUser) {
    return { statusCode: "400", message: "idTask đã tồn tại" };
  }


  newTask.createat = new Date();

  newTask.updatedAt = new Date();
  newTask.isdone = 0;
  newTask.ischeck = false;
  const group: task = await taskModel.create(newTask);
  return {
    statusCode: "200",
    message: "tạo kết nối thành công",
    data: group,
  };
};

//tassk theo ngayf
const getTaskByDeadlineService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }]
    },
    order: [["end", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

// tassk theo job
const getTaskByJobService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }]
    },
    order: [["jobid", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

//tassk mowis nhaats
const getTaskByTimeService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }]
    },
    order: [["updatedAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

//tassk mowis caapj nhaatj
const getTaskService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }]
    },
    order: [["updatedAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};
//
const getAllTaskByLeaderService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }]
    },
    order: [["leaderid", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

//laays tassk theo 1  leader
const getTaskByLeaderService = async (
  leaderid: string,
  memid: string
): Promise<response> => {

  const foundGroup: task[] | null = await taskModel.findAll({
    where: {
      leaderid: leaderid,
      memid: memid,
      // isDelete: false,
    },
  });
  return {
    statusCode: "200",
    message: "lấy dữ liệu thành công",
    data: foundGroup,
  };
};


const checkTaskServices = async (
  idTask: string,
  memid: string,
  check:boolean
): Promise<response> => {
  logging.debug("check Task", "service", idTask)
  await taskModel.update(
    {
      ischeck: check,
      updatedAt: new Date(),
    },
    {
      where: {
        memid: memid ,
        id: idTask
      },
    }
  );
  return {
    statusCode: "200",
    message: "checkTask",
  };
};


const updateIsDoneTaskService = async (
  taskid: string,
  isdonetmp:number
): Promise<response> => {

 
  await taskModel.update(
    {
      isdone: isdonetmp,
  
      updatedAt: new Date(),
    },
    {
      where: {id: taskid },
    }
  );
  return {
    statusCode: "200",
    message: "cập nhật thành công",
  };
};


const updateTimeTaskService = async (id: string): Promise<response> => {
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
  getTaskByLeaderService,
  getAllTaskByLeaderService,
  updateIsDoneTaskService,
  updateTimeTaskService,
  checkTaskServices
};
