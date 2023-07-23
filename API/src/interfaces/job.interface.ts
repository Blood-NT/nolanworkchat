import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface job
  extends Model<InferAttributes<job>, InferCreationAttributes<job>> {
  id?: string;
  jobname: string;
  createat?: Date;
  leaderid: string;
  adminid: string;
  jobnote: string;
  jobdone: boolean;
}
