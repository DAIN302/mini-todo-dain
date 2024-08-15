import React, { useState } from 'react'

export default function AddTodo({addItem}) {
    const [todoItem, setTodoItem] = useState({
        title : ''
    }) // 사용자 입력을 저장할 객체(아이디는 자동, done은 기본값 false 그래서 title만 입력)
    
    // 버튼 누르면 추가
    const onButtonClick = () => {
        addItem(todoItem) // add 함수 사용
        setTodoItem({title : ''}) // 아이템 추가 후 초기화
    }

  return (
    <div className='AddTodo'>
        <input type='text' placeholder='Add Your new Todo!' className='add-input'
        onChange={(e) => setTodoItem({title : e.target.value})} 
        value={todoItem.title} 
        onKeyDown={(e)=>{if(e.key==='Enter'){onButtonClick()}}}
        />
        <button onClick={onButtonClick} className='add-button'>ADD</button>
    </div>
  )
}
