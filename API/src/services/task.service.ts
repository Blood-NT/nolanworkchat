import { Op } from "sequelize";
import { taskModel } from "../models/task.model";
import { task } from "../interfaces/task.interface";
import response from "../interfaces/response.interface";

const createTaskService = async (newTask: task): Promise<response> => {
  const foundUser: task | null = await taskModel.findOne({
    where: {  id: newTask.id }  });
  if (foundUser) {
    return { statusCode: "400", message: "idTask đã tồn tại" };
  }


  newTask.createat = new Date();

  newTask.updatedAt = new Date();
  newTask.isdone= false;
  newTask.ischeck=false;
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

// tassk theo job
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

//tassk mowis nhaats
const getTaskByTimeService = async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }],
      isdone: false,
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
      [Op.or]: [{ leaderid: userId }, { memid: userId }],
      isdone: false,
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
const  getAllTaskByLeaderService= async (userId: string): Promise<response> => {
  const foundGroup: task[] = await taskModel.findAll({
    where: {
      [Op.or]: [{ leaderid: userId }, { memid: userId }],
      isdone: false,
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

  const foundGroup:task[] | null = await taskModel.findAll({
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
  notDoneTask
};
