import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface taskmessages
  extends Model<InferAttributes<taskmessages>, InferCreationAttributes<taskmessages>> {
  id?: number;
  taskid: string;
  messages: string;
  createAt?: Date;
  sender: string;
  type?: string;
}
