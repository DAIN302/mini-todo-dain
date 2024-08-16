const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');

app.use(express.urlencoded({extended : true}));
app.use(express.json());

// cors 미들웨어 등록
app.use(cors());

const todoRouter = require('./routes/todo')
app.use('/api', todoRouter)

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('*', (_, res)=>{
    res.send('404 error')
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})




/*
cors 
처음 리소스를 제공한 도메인(Origin)이 현재 요청하려는 도메인과 다르더라도 요청을 허락해주는 웹 보안 방침
react -> localhost:3000
server -> localhost:8080
-> 서로 도메인이 달라서 그냥 하면 네트워크 오류남! cors미들웨어 등록을 해서 요청을 허락해줘야함
*/
