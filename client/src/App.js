import { useEffect, useState } from 'react';
import axios from 'axios';
import MyTodo from './components/MyTodo';
import AddTodo from './components/AddTodo';

import './styles/Todo.scss'

function App() {
  const [todoItems, setTodoItems] = useState([])

  // [백엔드, 프론트 API 연결]
  // - Read API
  useEffect(() => {
    console.log('첫 렌더링 완료');
    const getTodos = async () => {
      let res = await axios.get('http://localhost:8080/api/todos');
      setTodoItems(res.data)
    }

    getTodos();
  }, [])

  // AddTodo 컴포넌트는 상위 컴포넌트 items 에 접근 불가
  // 상위 컴포넌트 App 은 AddTodo에 접근 가능
  // => App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용
  // todo 추가 함수
  // create API
  const addItem = async (newItem) => {
    // 프론트의 처리이기 때문에 백엔드와 연결했을 때는 필요업슴
    // newItem.id = todoItems.length + 1; // key를 위한 id 추가.
    // newItem.done = false; // done 초기화

    // let res = await axios({
    //   method : 'post',
    //   url : 'http://localhost:8080/api/todo',
    //   data : newItem
    // })

    let res = await axios.post('http://localhost:8080/api/todo', newItem)
    // 스프레드 연산자를 통해서 기존 todo 에 새로운 todo 추가
    setTodoItems([...todoItems, res.data]);
  };

  // todo 삭제 함수
  const deleteItem = async (targetItem) => {
    // filter method 로 일치하지 않는 애들만 필터링! -> delete 누른 애들은 사라진당
    await axios.delete(`http://localhost:8080/api/todo/${targetItem.id}`)
    const newTodoItems = todoItems.filter(e => e.id !== targetItem.id)
    setTodoItems(newTodoItems)
    // const newTodoItems = todoItems.filter(e => e.id !== targetItem.id)
    // setTodoItems(newTodoItems)
    // try {
    //   let res = await axios({
    //     method : 'delete',
    //     url : `http://localhost:8080/api/todo/${targetItem.id}`,
    //     data : {id : targetItem.id}
    //   })
    // }catch(err){

    // }
  }

  // todo 수정 함수

  return (
    <div className="App">
      <h1 className='TodoTitle'>Todo List</h1>
      <AddTodo addItem={addItem}/>
      <div className='MyTodoBx'>
        { todoItems.map(item => <MyTodo key={item.id} item={item} deleteItem={deleteItem}/>)}
      </div>
    </div>
  );
}

export default App;
