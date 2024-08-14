"use strict";
// 엄격모드
// - 잠재적인 오류 방지 및 더 안전한 코드 작성 도움

const Sequelize = require('sequelize'); // sequelize 패키지 등록
const config = require(__dirname + '/../config/config.json')["development"]; // json파일의 development키의 값들에 접근(db연결 정보)
const db = {}; // 빈 객체

// sequelize 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Todo = require('./Todo')(sequelize, Sequelize); // models/Todo.js 에서 정의한 model이 db.Todo에 들어감

module.exports = db;