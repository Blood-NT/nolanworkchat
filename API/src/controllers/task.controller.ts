import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { task } from "../interfaces/task.interface";

// import { groupMember } from "../interfaces/groupMember.interface";
import {
  createTaskService,
  getTaskByDeadlineService,
  getTaskService,
  getTaskByJobService,
  updateIsDoneTaskService,
  getTaskByTimeService,
  getAllTaskByLeaderService,
  getTaskByLeaderService
} from "../services/task.service";

const createTask = async (req: Request, res: Response) => {
  try {
    const newTask: task = req.body;
    const response: response = await createTaskService(newTask );
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getTask = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const response: response = await getTaskService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};



const getTaskByJob = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const response: response = await getTaskByJobService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getTaskByDeadline = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const response: response = await getTaskByDeadlineService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};


const getTaskByTime= async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const response: response = await getTaskByTimeService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};
const getAllTaskByLeader= async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const response: response = await getAllTaskByLeaderService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getTaskByLeader = async (req: Request, res: Response) => {
  try {
    const sender: string = req.params.sender;
    const receive: string = req.params.receive;
    const response: response = await getTaskByLeaderService(sender, receive);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};




const doneTask = async (req: Request, res: Response) => {
  try {
    const leaderid: string = req.body.leaderid;
    const memid: string = req.body.memid;
    const response: response = await updateIsDoneTaskService(
      leaderid,
      memid
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};


export default {
  createTask,//taoj
  getTask,//laays mowis caapj nhaatj
  doneTask,// done
  getTaskByJob,//laays theo job
  getTaskByDeadline,//lays theo deadline 
  getTaskByTime,//tassk mowis giao
  getTaskByLeader,//laays tassk theo lead
  getAllTaskByLeader// laays taats car tassk vaf sawps xeeps theo lead
  
};
