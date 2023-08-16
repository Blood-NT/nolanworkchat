import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

export interface phongban
  extends Model<InferAttributes<phongban>, InferCreationAttributes<phongban>> {
  id?: string;
  tenphong: string;
  isdelete?:boolean;
}
