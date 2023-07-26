import { Sequelize } from "sequelize";

const sequelize = new Sequelize('nolantttn', 'root', '123456', {
  host: 'localhost',
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
    // await sequelize.authenticate();
    console.log('Kết nối cơ sở dữ liệu thành công!');
  } catch (error) {
    console.error('Không thể kết nối đến cơ sở dữ liệu:', error);
  }
}

testConnection();

export default sequelize;
