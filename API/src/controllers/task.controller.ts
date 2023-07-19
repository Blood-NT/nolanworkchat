import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { task } from "../interfaces/task.interface";

// import { groupMember } from "../interfaces/groupMember.interface";
import {
  createTaskService,
  // getTaskByDeadlineService,
  // getTaskByTimeService,
  getTaskService,
  // getTaskByJobService,
  updateIsDoneTaskService,
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
  createTask,
  getTask,
  doneTask
};
