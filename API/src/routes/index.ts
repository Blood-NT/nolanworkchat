import { Application } from "express";
import userRoute from "./user.route";
import groupRoute from "./group.route";
import blockUserRoute from "./blockUser.route";
import messageRoute from "./message.route";
import jobRoute from "./job.route"
import taskMseeageRoute from "./taskmessage.route"
import tasskRoute from "./task.route"

const route = (app: Application) => {
  app.use("/user", userRoute);
  app.use("/group", groupRoute);
  app.use("/block-user", blockUserRoute);
  app.use("/messages", messageRoute);
  app.use("/job", jobRoute);
  app.use("/task", tasskRoute);
  app.use("/task-message", taskMseeageRoute);
};

export default route;
