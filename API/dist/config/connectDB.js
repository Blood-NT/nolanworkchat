"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối cơ sở dữ liệu thành cônggg!', sequelize.getDatabaseName());
    }
    catch (error) {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
    }
}
testConnection();
exports.default = sequelize;
//# sourceMappingURL=connectDB.js.map