import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { taskreport } from "../interfaces/taskreport.interface";
import {
  getAllTaskReportService, getTaskReportService, createTaskReportService

} from "../services/taskreport.service";

const createReport = async (req: Request, res: Response) => {
  try {
    const newMessages: taskreport = req.body;
    const response: response = await createTaskReportService(newMessages);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getDataReport = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const response: response = await getTaskReportService(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getAllReport = async (req: Request, res: Response) => {
  try {
    const taskid: string = req.params.taskid;
    const response: response = await getAllTaskReportService(taskid);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};


export default {
  createReport,getDataReport,getAllReport
};
