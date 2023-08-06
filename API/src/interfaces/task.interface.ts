import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface task
  extends Model<InferAttributes<task>, InferCreationAttributes<task>> {
  id?: string;
  taskname: string;
  jobid: string;
  leaderid: string;
  memid: string;
  tasknote: string;
  isdone: number;
  ischeck: Boolean;
  createat?: Date;//
  start?: Date;//
  end?: Date;//
  updatedAt ?: Date;//
}
