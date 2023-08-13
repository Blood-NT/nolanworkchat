"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskreportModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.taskreportModel = connectDB_1.default.define("taskrepost", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskid: sequelize_1.DataTypes.STRING(500),
    uidreport: sequelize_1.DataTypes.STRING(20),
    createat: sequelize_1.DataTypes.DATE,
    title: sequelize_1.DataTypes.STRING(500),
    note: sequelize_1.DataTypes.STRING(500),
}, {
    timestamps: false,
    tableName: "taskrepost",
});
//# sourceMappingURL=taskreport.model.js.map