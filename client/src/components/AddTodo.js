import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddTodo({addItem}) {
    const [todoItem, setTodoItem] = useState({
        title : ''
    }) // 사용자 입력을 저장할 객체(아이디는 자동, done은 기본값 false 그래서 title만 입력)
    
    // 버튼 누르면 추가
    const onButtonClick = () => {
        addItem(todoItem) // add 함수 사용
        setTodoItem({title : ''}) // 아이템 추가 후 초기화
    }

    // 엔터 
    const onKeyEnter = (e) => {
      // if(e.nativeEvent.isComposing) return;
      if(e.key === 'Enter' && e.nativeEvent.isComposing == false) { // 한글일 경우 두번 쳐지는 것 때문에 추가
        console.log('난 키보드지롱 ><');
        onButtonClick()
      }
    }

  return (
    <div className='AddTodo'>
        <input type='text' placeholder='Add Your new Todo!' className='add-input' autoFocus
        value={todoItem.title} 
        onChange={(e) => setTodoItem({title : e.target.value})} 
        // onKeyUp={(e)=>{if(e.key==='Enter'){onButtonClick()}}} // MAC 에서 onKeyDown을 썼을 때 한글이 두번 쳐짐 그래서 onKeyUp으로 변경
        onKeyDown={onKeyEnter} 
        />
        <button onClick={onButtonClick} className='add-button'>
          <FontAwesomeIcon icon={faPlus} className='add-icon' size='lg'/>
        </button>
    </div>
  )
}
