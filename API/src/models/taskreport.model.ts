import { DataTypes } from "sequelize";
import { taskreport } from "../interfaces/taskreport.interface";
import sequelize from "../config/connectDB";

export const taskreportModel = sequelize.define<taskreport>(
  "taskrepost",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskid: DataTypes.STRING(500),
    uidreport: DataTypes.STRING(20),
    createat:DataTypes.DATE,
    title: DataTypes.STRING(500),
    note: DataTypes.STRING(500),
  },
  {
    timestamps: false,
    tableName: "taskrepost",
  }
);
