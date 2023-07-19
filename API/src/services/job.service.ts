import { Op } from "sequelize";
import { jobModel } from "../models/job.model";
import { job } from "../interfaces/job.interface";
import response from "../interfaces/response.interface";

const createJobService = async (newJob:job): Promise<response> => {
  // newJob.isDelete = false;
  newJob.createat = new Date();

  const job:job = await jobModel.create(newJob);
  return {
    statusCode: "200",
    message: "tạo kết nối thành công",
    data:job,
  };
};

const getJobService = async (userId: string): Promise<response> => {
  const foundGroup:job[] = await jobModel.findAll({
    where: {
      [Op.or]: [{ adminid: userId }, { leaderid: userId }],
      // isDelete: false,
    },
    order: [["createat", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

const getJobByUserService = async (
  adminid: string,
  leaderid: string
): Promise<response> => {

  const foundGroup:job[] | null = await jobModel.findAll({
    where: {
      adminid: adminid,
      leaderid: leaderid,
      // isDelete: false,
    },
  });
  return {
    statusCode: "200",
    message: "lấy dữ liệu thành công",
    data: foundGroup,
  };
};

// const updateIsDeleteGroupService = async (
//   sender: string,
//   receive: string
// ): Promise<response> => {
//   if (sender > receive) {
//     let coppy: string = sender;
//     sender = receive;
//     receive = coppy;
//   }
//   await jobModel.update(
//     {
//       isDelete: true,
//       updateAt: new Date(),
//     },
//     {
//       where: { sender: sender, receive: receive },
//     }
//   );
//   return {
//     statusCode: "200",
//     message: "cập nhật thành công",
//   };
// };


export {
  createJobService,
  getJobByUserService,
  getJobService,
};
