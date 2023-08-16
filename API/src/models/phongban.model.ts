import { DataTypes } from "sequelize";
import { phongban } from "../interfaces/phongban.interface";
import sequelize from "../config/connectDB";

export const phongbanModel = sequelize.define<phongban>(
  "phongban",
  {
    id: { type: DataTypes.STRING(20), primaryKey: true },
    tenphong: DataTypes.STRING(50),
    isdelete:DataTypes.BOOLEAN,
    },
  {
    timestamps: false,

    tableName: "phongban",
  }
);
