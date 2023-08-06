import { DataTypes } from "sequelize";
import { task } from "../interfaces/task.interface";
import sequelize from "../config/connectDB";

export const taskModel = sequelize.define<task>(
  "task",
  {
    id: { type: DataTypes.STRING(500), primaryKey: true },
    taskname: DataTypes.STRING(500),
    jobid: DataTypes.STRING(500),
    leaderid: DataTypes.STRING(20),
    memid: DataTypes.STRING(20),
    tasknote: DataTypes.STRING(500),
    isdone: DataTypes.NUMBER,
    ischeck: DataTypes.BOOLEAN,
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
