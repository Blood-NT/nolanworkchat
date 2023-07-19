import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface task
  extends Model<InferAttributes<task>, InferCreationAttributes<task>> {
  id?: number;
  taskname: string;
  jobid: number;
  leaderid: string;
  memid: string;
  tasknote: string;
  isdone: boolean;
  ischeck: Boolean;
  createat?: Date;
  start?: Date;
  end?: Date;
  updatedAt ?: Date;
}
