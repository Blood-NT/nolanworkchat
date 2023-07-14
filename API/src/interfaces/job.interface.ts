import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface job
  extends Model<InferAttributes<job>, InferCreationAttributes<job>> {
  id?: number;
  jobname: string;
  createat?: Date;
  leaderid: string;
  adminid: string;
  jobnote: string;

}
