const Sequelize = require('sequelize'); // sequelize 패키지 등록
const config = require(__dirname + '/../config/config.json')["development"]; // json파일의 development키의 값들에 접근(db연결 정보)
const db = {}; // 빈 객체

// sequelize 객체 생성
const  sequelize = new Sequelize(config.database, config.username, config.password, config);



module.exports = db;
