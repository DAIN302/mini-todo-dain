import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import MyTodo from './components/MyTodo';
import AddTodo from './components/AddTodo';
import { API_BASE_URL } from './app-config';

import './styles/Todo.scss'

function App() {
  const [todoItems, setTodoItems] = useState([])

  // [백엔드, 프론트 API 연결]
  // - Read API
  useEffect(() => {
    console.log('첫 렌더링 완료');
    const getTodos = async () => {
      // [env 버전]
      // let res = await axios.get(`${process.env.REACT_APP_DB_HOST}/api/todos`);
      // [config.js 버전]
      let res = await axios.get(`${API_BASE_URL}/api/todos`);
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

    // let res = await axios.post(`${process.env.REACT_APP_DB_HOST}/api/todo`, newItem)
    let res = await axios.post(`${API_BASE_URL}/api/todo`, newItem)

    // 현재 API 호출 후 응답을 기다리지 않고 바로 상태 업데이트를 진행하면, 네트워크 지연 등으로 인해 예상치 못한 문제 발생 가능
    // 따라서 비동기 작업 처리를 제대로 해주는 것이 좋음!
    if(res.status === 200){
      // 스프레드 연산자를 통해서 기존 todo 에 새로운 todo 추가
      setTodoItems([...todoItems, res.data]);
    } else {
      console.error('failed to add item');
    }
  };

  // todo 삭제 함수
  const deleteItem = async (targetItem) => {
    // filter method 로 일치하지 않는 애들만 필터링! -> delete 누른 애들은 사라진당
    // await axios.delete(`${process.env.REACT_APP_DB_HOST}/api/todo/${targetItem.id}`)
    await axios.delete(`${API_BASE_URL}/api/todo/${targetItem.id}`)
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

  // todo 수정 함수 -> API 이용해서 update 하려면
  // (1) Server API를 이용해서 서버 데이터 업데이트 후,
  // (2) 변경된 내용을 화면에 다시 출력하는 두 가지 작업 필요
  const updateItem = async (targetItem) => {
    console.log(targetItem);
    await axios.patch(`${process.env.REACT_APP_DB_HOST}/api/todo/${targetItem.id}`, targetItem)
  }


  // const memoizedComponents = useMemo(()=>{
  //   { todoItems.map(item => <MyTodo key={item.id} item={item} deleteItem={deleteItem} updateItem={updateItem} />)}
  // }, [todoItems, deleteItem, updateItem])

  return (
    <div className="App">
      <h1 className='TodoTitle'>Todo List</h1>
      <AddTodo addItem={addItem}/>
      {/* <div className='left-todos'>{todoItems.length} Todos</div> */}
      <div className='MyTodoBx'>
        { todoItems.length > 0 ? todoItems.map(item => <MyTodo key={item.id} item={item} deleteItem={deleteItem} updateItem={updateItem} />) 
        : <p>Todo를 추가해주세요</p> }
        {/* {memoizedComponents} */}
      </div>
    </div>
  );
}

export default App;
