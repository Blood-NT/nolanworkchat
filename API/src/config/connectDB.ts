import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize( {
  database:process.env.DB_NAME,
  username:process.env.DB_USERNAME,
  password:process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

// Hàm kiểm tra kết nối và hiển thị thông báo
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu thành cônggg!', sequelize.getDatabaseName());
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
  }
}

testConnection();

export default sequelize;
