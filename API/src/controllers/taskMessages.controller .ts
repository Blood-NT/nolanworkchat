import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { taskmessages } from "../interfaces/taskmessages.interface";
import {
  createTaskMessagesService,
  getTaskMessagesService,
  deleteTaskMessagesService
} from "../services/taskmessages.service";

const createtaskMessaes = async (req: Request, res: Response) => {
  try {
    const newMessages: taskmessages = req.body;
    const response: response = await createTaskMessagesService(newMessages);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getTaskMessagesInTask = async (req: Request, res: Response) => {
  try {
    const groupId: string = req.params.groupId;
    const response: response = await getTaskMessagesService(groupId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const deleteMessagesInTask = async (req: Request, res: Response) => {
  try {
    const messagesId: string = req.body.messagesId;
    const response: response = await deleteTaskMessagesService(messagesId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default {
  createtaskMessaes,
  getTaskMessagesInTask,
  deleteMessagesInTask,
};
