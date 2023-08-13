import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { job } from "../interfaces/job.interface";

// import { groupMember } from "../interfaces/groupMember.interface";
import {
  createJobService,
  getJobByUserService,
  getJobByTimeService,
  donejobService
} from "../services/job.service";

const createJob = async (req: Request, res: Response) => {
  try {
    const newGroup: job = req.body;
    const response: response = await createJobService(newGroup);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getJobByTime = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const response: response = await getJobByTimeService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getJobByUser = async (req: Request, res: Response) => {
  try {
    const sender: string = req.params.sender;
    const receive: string = req.params.receive;
    const response: response = await getJobByUserService(sender, receive);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const doneJob = async (req: Request, res: Response) => {
  try {
    const { id, donetmp }= req.body;
    const response: response = await donejobService(
      id,
      donetmp
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};



export default {
  createJob,
  getJobByUser,
  getJobByTime,
  doneJob
};
