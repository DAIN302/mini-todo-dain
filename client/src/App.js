import { useState } from 'react';
import MyTodo from './components/MyTodo';
import AddTodo from './components/AddTodo';

import './styles/Todo.scss'

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id : 1,
      title : 'my todo1',
      done : false
    },
    {
      id : 2,
      title : 'my todo2',
      done : false
    },
    {
      id : 3,
      title : 'my todo3',
      done : false
    },
  ])

  // AddTodo 컴포넌트는 상위 컴포넌트 items 에 접근 불가
  // 상위 컴포넌트 App 은 AddTodo에 접근 가능
  // => App 컴포넌트에 add() 함수를 추가하고 해당 함수를 AddTodo 프로퍼티로 넘겨 AddTodo 이용
  // todo 추가 함수
  const addItem = (newItem) => {
    newItem.id = todoItems.length + 1; // key를 위한 id 추가.
    newItem.done = false; // done 초기화

    // 스프레드 연산자를 통해서 기존 todo 에 새로운 todo 추가
    setTodoItems([...todoItems, newItem]);
  };

  // todo 삭제 함수
  const deleteItem = targetItem => {
    // filter method 로 일치하지 않는 애들만 필터링! -> delete 누른 애들은 사라진당
    const newTodoItems = todoItems.filter(e => e.id !== targetItem.id)
    setTodoItems(newTodoItems)
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
