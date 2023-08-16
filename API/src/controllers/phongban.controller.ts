import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { phongban } from "../interfaces/phongban.interface";
import logging from "../config/logging";

// import { groupMember } from "../interfaces/groupMember.interface";
import {
  createRoomService,//tạo
  deleteRoomService,//xóa
  updateRoomService,//sửa
  getAllRoomService,//lấy all
  getDataRoomService,//lấy thông tin
} from "../services/phongban.service";

const createRoom = async (req: Request, res: Response) => {
  try {
    const newRoom: phongban = req.body;
    const response: response = await createRoomService(newRoom);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getRoom = async ( req: Request,res: Response) => {
  try {
    const response: response = await getAllRoomService();
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
  logging.debug("haizzz","met",req)

};

const getDataRoom = async ( req: Request,res: Response) => {
  try {

    const roomId= req.body.roomId;
    const response: response = await getDataRoomService(roomId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }

  logging.debug("haizzz","met",req)

};

const updateRoom = async ( req: Request,res: Response) => {
  try {

    const roomId= req.body.roomId;
    const roomName= req.body.roomName;roomName
    logging.debug("okkk","",req.body)
    const response: response = await updateRoomService(roomId,roomName);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
  logging.debug("haizzz","met",req)

};

const deleteRoom = async ( req: Request,res: Response) => {
  try {

    const roomId= req.body.roomId;
    const response: response = await deleteRoomService(roomId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }

};







export default {
  createRoom,getRoom,getDataRoom,updateRoom,deleteRoom
};
