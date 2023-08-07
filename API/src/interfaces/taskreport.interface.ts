import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface taskreport
  extends Model<InferAttributes<taskreport>, InferCreationAttributes<taskreport>> {
  id?: number;
  taskid: string;
  uidreport: string;
  createat?: Date;
  title: string;
  note: string;
}
