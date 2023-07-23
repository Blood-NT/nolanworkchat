"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = __importDefault(require("./user.route"));
const group_route_1 = __importDefault(require("./group.route"));
const blockUser_route_1 = __importDefault(require("./blockUser.route"));
const message_route_1 = __importDefault(require("./message.route"));
const job_route_1 = __importDefault(require("./job.route"));
const taskmessage_route_1 = __importDefault(require("./taskmessage.route"));
const task_route_1 = __importDefault(require("./task.route"));
const route = (app) => {
    app.use("/user", user_route_1.default);
    app.use("/group", group_route_1.default);
    app.use("/block-user", blockUser_route_1.default);
    app.use("/messages", message_route_1.default);
    app.use("/job", job_route_1.default);
    app.use("/task", task_route_1.default);
    app.use("/task-message", taskmessage_route_1.default);
};
exports.default = route;
//# sourceMappingURL=index.js.map