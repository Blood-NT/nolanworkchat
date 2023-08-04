"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.taskModel = connectDB_1.default.define("task", {
    id: { type: sequelize_1.DataTypes.STRING(500), primaryKey: true },
    taskname: sequelize_1.DataTypes.STRING(500),
    jobid: sequelize_1.DataTypes.STRING(500),
    leaderid: sequelize_1.DataTypes.STRING(20),
    memid: sequelize_1.DataTypes.STRING(20),
    tasknote: sequelize_1.DataTypes.STRING(500),
    isdone: sequelize_1.DataTypes.BOOLEAN,
    ischeck: sequelize_1.DataTypes.BOOLEAN,
    createat: sequelize_1.DataTypes.DATE,
    start: sequelize_1.DataTypes.DATE,
    end: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
}, {
    timestamps: false,
    tableName: "task",
});
//# sourceMappingURL=task.model.js.map