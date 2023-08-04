"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('nolantttn', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
async function testConnection() {
    try {
        console.log('Kết nối cơ sở dữ liệu thành công!');
    }
    catch (error) {
        console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
    }
}
testConnection();
exports.default = sequelize;
//# sourceMappingURL=connectDB.js.map