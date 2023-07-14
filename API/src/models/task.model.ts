import { DataTypes } from "sequelize";
import { task } from "../interfaces/task.interface";
import sequelize from "../config/connectDB";

export const taskModel = sequelize.define<task>(
  "task",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskname: DataTypes.STRING(500),
    jobid: DataTypes.INTEGER,
    leaderid: DataTypes.STRING(20),
    memid: DataTypes.STRING(20),
    tasknote: DataTypes.STRING(500),
    isdone: DataTypes.INTEGER,
    ischeck: DataTypes.INTEGER,
    createat:DataTypes.DATE,
    start:DataTypes.DATE,
    end:DataTypes.DATE,
    updatedAt :DataTypes.DATE,
    
  },
  {
    timestamps: false,
    tableName: "task",
  }
);
