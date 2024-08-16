const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

// cors 미들웨어 등록
// 모든 서버에서 보내는 요청 수락
app.use(cors());

const todoRouter = require('./routes/todo');
const { sequelize } = require('./models');
app.use('/api', todoRouter)

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('*', (_, res)=>{
    res.send('404 error')
})

const port = process.env.PORT || 8080;

sequelize.sync({force : false}).then(()=>{
    app.listen(port, ()=>{
        console.log(`http://localhost:${port}`);
    })
})


/*
    sequelize.sync({force : false}) 
    - 이미 존재하는 테이블이 있다면 그 테이블을 지우지 않고 유지
    - 새로운 테이블을 추가하거나 필요한 경우 스키마를 업데이트

    - 서버가 시작되기 전에 sequelize를 사용하여 DB와 모델 간의 동기화 수행
    - sync 가 완료되고 난 후에야 then 실행
*/


/*
cors 
처음 리소스를 제공한 도메인(Origin)이 현재 요청하려는 도메인과 다르더라도 요청을 허락해주는 웹 보안 방침
react -> localhost:3000
server -> localhost:8080
-> 서로 도메인이 달라서 그냥 하면 네트워크 오류남! cors미들웨어 등록을 해서 요청을 허락해줘야함


* SOP(동일 출처 정책), CORS
* cors 사용 방법
#1. 모든 출처에서의 요청 허용
app.use(cors()) 

#2. 특정 출처에서의 요청만 허용
app.use(cors({
    origin : 'http://ex.com' -> 이 도메인에서의 요청만 허용
}))

#3. 특정 옵션을 설정
app.use({
    origin : ['http://ex.com', 'https://ex2.com'],
    methods : ['GET', 'POST'],
    allowedHeaders : ['Content-Type', 'Authorizaion']
})
*/
