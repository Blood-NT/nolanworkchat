import { DataTypes } from "sequelize";
import { taskmessages } from "../interfaces/taskmessages.interface";
import sequelize from "../config/connectDB";

export const taskmessagesModel = sequelize.define<taskmessages>(
  "taskmessages",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    taskid: DataTypes.INTEGER,
    messages: DataTypes.STRING(500),
    createAt:DataTypes.DATE,
    sender: DataTypes.STRING(20),
    type: DataTypes.STRING(20),
  },
  {
    timestamps: false,
    tableName: "taskmessages",
  }
);
