"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.jobModel = connectDB_1.default.define("job", {
    id: { type: sequelize_1.DataTypes.STRING(500), primaryKey: true },
    jobname: sequelize_1.DataTypes.STRING(500),
    createat: sequelize_1.DataTypes.DATE,
    updateat: sequelize_1.DataTypes.DATE,
    leaderid: sequelize_1.DataTypes.STRING(20),
    adminid: sequelize_1.DataTypes.STRING(20),
    jobnote: sequelize_1.DataTypes.STRING(500),
    jobdone: sequelize_1.DataTypes.BOOLEAN
}, {
    timestamps: false,
    tableName: "job",
});
//# sourceMappingURL=job.model.js.map