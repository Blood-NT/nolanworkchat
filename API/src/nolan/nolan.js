const SequelizeAuto = require('sequelize-auto');
const path = require('path');

// Đường dẫn đến tệp SQL
const sqlFilePath = 'G:/nolan_tttn/API/api-chat-online/src/nolan/nolann.sql';

// Đường dẫn đến thư mục chứa các giao diện và mô hình
const outputDir = path.join(__dirname, 'output');

// Tên của mô hình và tên của giao diện sẽ được chuyển đổi từ tên bảng SQL
const options = {
  dialect: 'mysql', // ví dụ 'mysql', 'postgres', 'sqlite', 'mssql'
  directory: outputDir,
  port: '3306', // Nếu cần
  additional: {
    timestamps: false, // Vô hiệu hóa tạo các trường timestamps trong mô hình
  },
};

const auto = new SequelizeAuto(sqlFilePath, null, null, options);
auto.run((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Models and interfaces generated successfully!');
});
