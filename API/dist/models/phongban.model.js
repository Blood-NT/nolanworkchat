"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phongbanModel = void 0;
const sequelize_1 = require("sequelize");
const connectDB_1 = __importDefault(require("../config/connectDB"));
exports.phongbanModel = connectDB_1.default.define("phongban", {
    id: { type: sequelize_1.DataTypes.STRING(20), primaryKey: true },
    tenphong: sequelize_1.DataTypes.STRING(50),
    isdelete: sequelize_1.DataTypes.BOOLEAN,
}, {
    timestamps: false,
    tableName: "phongban",
});
//# sourceMappingURL=phongban.model.js.map