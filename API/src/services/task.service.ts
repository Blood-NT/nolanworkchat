import { Op } from "sequelize";
import { groupModel } from "../models/group.model";
import { group } from "../interfaces/group.interface";
import response from "../interfaces/response.interface";

const createTaskService = async (newGroup: group): Promise<response> => {
  const group: group = await groupModel.create(newGroup);
  return {
    statusCode: "200",
    message: "tạo kết nối thành công",
    data: group,
  };
};

const getTaskWithDeadlineService = async (userId: string): Promise<response> => {
  const foundGroup: group[] = await groupModel.findAll({
    where: {
      [Op.or]: [{ sender: userId }, { receive: userId }],
      isDelete: false,// thay bằng done
    },
    order: [["updateAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

const getTaskWithTimeService = async (userId: string): Promise<response> => {
  const foundGroup: group[] = await groupModel.findAll({
    where: {
      [Op.or]: [{ sender: userId }, { receive: userId }],
      isDelete: false,
    },
    order: [["updateAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

const getTaskService = async (
  sender: string,
  receive: string
): Promise<response> => {
  if (sender > receive) {
    let coppy: string = sender;
    sender = receive;
    receive = coppy;
  }
  const foundGroup: group | null = await groupModel.findOne({
    where: {
      sender: sender,
      receive: receive,
      isDelete: false,
    },
  });
  return {
    statusCode: "200",
    message: "lấy dữ liệu thành công",
    data: foundGroup,
  };
};

const updateIsDeleteTaskService = async (
  sender: string,
  receive: string
): Promise<response> => {
  if (sender > receive) {
    let coppy: string = sender;
    sender = receive;
    receive = coppy;
  }
  await groupModel.update(
    {
      isDelete: true,
      updateAt: new Date(),
    },
    {
      where: { sender: sender, receive: receive },
    }
  );
  return {
    statusCode: "200",
    message: "cập nhật thành công",
  };
};

const updateTimeTaskService = async (id: number): Promise<response> => {
  await groupModel.update(
    {
      updateAt: new Date(),
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
  getTaskWithDeadlineService,
  getTaskWithTimeService,
  getTaskService,
  updateIsDeleteTaskService,
  updateTimeTaskService
};
