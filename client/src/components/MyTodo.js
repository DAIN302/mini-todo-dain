import React, { useState } from 'react'

export default function MyTodo({item, deleteItem}) {
  const [todoItem, setTodoItem] = useState(item)
  const [readOnly, setReadOnly] = useState(true)

  // 삭제 
  const onDeleteButtonClick = () => deleteItem(todoItem);

  // title 클릭 시 실행될 함수
  const offReadOnlyMode = () => setReadOnly(false);

  // readOnly : true -> enter key 누르면 readOnly true 로 변경
  const enterKeyEventHandler = (e) => {
    if(e.key==='Enter') setReadOnly(true)
  }

  // todo 수정 함수
  // 커서가 깜박인다고 수정 가능한 것은 아님, 사용자가 키보드 입력할 때마다 item을 새 값으로 변경해줘야함
  const editEventHandler = (e) => {
    const {title, ...rest} = todoItem; // ...rest -> title 외에 나머지
    setTodoItem({title : e.target.value, ...rest})
  }

  // checkbox 업데이트
  const checkboxEventHandler = (e) => {
    const {done, ...rest} = todoItem;
    setTodoItem({done : e.target.checked, ...rest})
  }
  
  return (
    <div className='Todo'>
        <input type='checkbox' id={`todo${todoItem.id}`} name={`todo${todoItem.id}`} value={`todo${todoItem.id}`} 
        defaultChecked={todoItem.done}
        onChange={checkboxEventHandler}
        />
        {/* <label htmlFor={`todo${item.id}`}>{item.title}</label> */}
        <input type='text' value={todoItem.title} readOnly={readOnly} onClick={offReadOnlyMode}
        onChange={editEventHandler} onKeyDown={enterKeyEventHandler}
        />
        <button onClick={onDeleteButtonClick}>DELETE</button>
    </div>
  )
}
