const path = require('path');
const fs = require('fs');

const envFilePath = path.resolve(__dirname, '../.env');

if (!fs.existsSync(envFilePath)) {
  fs.copyFileSync(path.resolve(__dirname, '../.env.template'), envFilePath);
}
