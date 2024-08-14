const { Todo } = require('../models');
const { Op } = require('sequelize');

// show all todos (READ)
exports.readTodos = async(_, res) => { // _ -> 이 인자는 안쓰겠음
    try{
        let todos = await Todo.findAll();
        res.send(todos);
    }catch(err) {
        res.send(err);
    }
};

// todo 추가 (create)
exports.createTodo = async(req, res) => {
    console.log(req.body);
    try {
        let newTodo = await Todo.create({
            title : req.body.title,
            done : false // todo item 추가 시 false 가 기본값
        });
        console.log(newTodo); 
        res.send(newTodo);
    }catch(err){
        res.send(err);
    }
}

// todo 수정(update)
exports.updateTodo = async(req, res) => {
    console.log(req.params.todoId);
    try {
        // 변수가 아니라 배열로 담은 이유? 배열 구조 분해 
        // update() - 업데이트 된 행(row)의 수를 나타내는 값을 반환 -> 반환값은 배열 형태로 제공됨
        // 배열 구조 분해 할당을 통해 배열의 첫번째 요소를 변수에 할당 가능
        // [idUpdated] = [0] or [1]
        let [idUpdated] = await Todo.update(
            {
                title : req.body.title, // 요청 본문에서 title 값을 가져와서 업데이트
                done : req.body.done // 요청 본문에서 done 값을 가져와서 업데이트
            },
            {
                where : {id : req.params.todoId }, // 경로 파라미터에서 'todo' 아이디를 사용해서 특정 todo 항목을 찾으셈 
                // Op.eq -> Sequelize 의 연산자, 'equels'(같음) 이라는 뜻
            }
        );
        console.log(idUpdated);
        if(idUpdated === 0){ // 수정 실패
            return res.send(false) // 업데이트 된 항목이 없으면 false 반환
        }
        // 수정 성공
        res.send(true) // 업데이트가 성공하면 true 반환
    } catch (error) {
        res.send(error)
    }
}
// todo 삭제(delete)