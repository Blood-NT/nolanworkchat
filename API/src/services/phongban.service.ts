import { phongbanModel } from "../models/phongban.model";
import { phongban } from "../interfaces/phongban.interface";
import response from "../interfaces/response.interface";
import logging from "../config/logging";
import { user } from "../interfaces/user.interface";
import { userModel } from "../models/user.model";

const createRoomService = async (newRoom: phongban): Promise<response> => {
  const Room: phongban | null = await phongbanModel.findOne({
    where: { id: newRoom.id }
  });
  if (Room) {
    if (Room?.isdelete === false) {
      return { statusCode: "400", message: "phòng đã tồn tại" };
    }
    await phongbanModel.update(
      {
        tenphong: newRoom.tenphong,
        isdelete: false
      },
      {
        where: {
          id: newRoom.id,
        },
      }
    );
    return {
      statusCode: "200",
      message: "tạo phòng thành công",
    };


  }
  const group: phongban = await phongbanModel.create(newRoom);
  return {
    statusCode: "200",
    message: "tạo phòng thành công",
    data: group,
  };
};

//lấy data
const getDataRoomService = async (roomId: string): Promise<response> => {
  const room: phongban | null = await phongbanModel.findOne({
    where: {
      id: roomId
    },
  });
  return {
    statusCode: "200",
    message: "lấy thông tin phòng thành công",
    data: room,
  };
};



const getAllRoomService = async () => {
  const room: phongban[] = await phongbanModel.findAll(
   {
     where: { isdelete: false }
    }

  );
  
  return {
    statusCode: "200",
    message: "lấy danh sách tất cả các phòng",
    data: room,
  };
};

const updateRoomService = async (
  idRoom: string,
  tenPhong: string,
): Promise<response> => {
  await phongbanModel.update(
    {
      tenphong: tenPhong,
    },
    {
      where: {
        id: idRoom,
      },
    }
  );
  return {
    statusCode: "200",
    message: "update thanhf coong",
  };
};

// them, xoa sua phong

const deleteRoomService = async (
  idRoom: string,
): Promise<response> => {


  const userCheck: user|null = await userModel.findOne({
    where: { idphongban: idRoom }
  });
  if (userCheck) {
  logging.debug("haizzz","met",userCheck)

      return { statusCode: "400", message: "phòng này hiện tại đang có nhân viên, không thể xóa" };
    }


  await phongbanModel.update(
    {
      isdelete: true   
     },
    {
      where: {
        id: idRoom,
      },
    }
  );
  return {
    statusCode: "200",
    message: "xóa phòng thành công",
  };
};




export {
  createRoomService,//tạo
  deleteRoomService,//xóa
  updateRoomService,//sửa
  getAllRoomService,//lấy all
  getDataRoomService,//lấy thông tin
};
