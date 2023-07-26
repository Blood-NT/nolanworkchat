import { DataTypes } from "sequelize";
import { job } from "../interfaces/job.interface";
import sequelize from "../config/connectDB";

export const jobModel = sequelize.define<job>(
  "job",
  {
    id: { type: DataTypes.STRING(500), primaryKey: true },
    jobname: DataTypes.STRING(500),
    createat: DataTypes.DATE,
    updateat: DataTypes.DATE,
    leaderid: DataTypes.STRING(20),
    adminid: DataTypes.STRING(20),
    jobnote: DataTypes.STRING(500),
    jobdone: DataTypes.BOOLEAN
  },
  {
    timestamps: false,
    tableName: "job",
  }
);
