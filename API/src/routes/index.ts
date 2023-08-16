import { Application } from "express";
import userRoute from "./user.route";
import groupRoute from "./group.route";
import blockUserRoute from "./blockUser.route";
import messageRoute from "./message.route";
import jobRoute from "./job.route"
import taskMseeageRoute from "./taskmessage.route"
import taskReportRouter from "./taskreport.route"
import tasskRoute from "./task.route"
import roomRouter from "./room.route"

const route = (app: Application) => {
  app.use("/user", userRoute);
  app.use("/group", groupRoute);
  app.use("/block-user", blockUserRoute);
  app.use("/messages", messageRoute);
  app.use("/job", jobRoute);
  app.use("/task", tasskRoute);
  app.use("/task-message", taskMseeageRoute);
  app.use("/task-report", taskReportRouter);
  app.use("/room", roomRouter);
};

export default route;
