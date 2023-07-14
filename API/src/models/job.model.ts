import { DataTypes } from "sequelize";
import { job } from "../interfaces/job.interface";
import sequelize from "../config/connectDB";

export const jobModel= sequelize.define<job>(
  "job",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    jobname: DataTypes.STRING(500),
    createat: DataTypes.DATE,
    leaderid: DataTypes.STRING(20),
    adminid: DataTypes.STRING(20),
    jobnote: DataTypes.STRING(500)
// jobdoen chưa làm 
  },
  {
    timestamps: false,
    tableName: "job",
  }
);
