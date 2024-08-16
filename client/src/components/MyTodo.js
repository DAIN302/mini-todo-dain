import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

export default function MyTodo({item, deleteItem, updateItem}) {
  const [todoItem, setTodoItem] = useState(item)
  const [readOnly, setReadOnly] = useState(true)

  // 마운트 시
  useEffect(()=>{
    // 마운트 시 체크 되었는지 안되었는지 확인
    const todoCheck = document.querySelectorAll('.todo-check');
    todoCheck.forEach(ele => {
      const checkCircle = ele.nextSibling.querySelectorAll('.todo-circle');
      if(ele.checked){
        checkCircle[0].style.display = 'none'
        checkCircle[1].style.display = 'inline-block'
      } else {
        checkCircle[1].style.display = 'none'
        checkCircle[0].style.display = 'inline-block'
      }
    })
  }, [])

  // 삭제 
  const onDeleteButtonClick = useCallback(() => deleteItem(todoItem), [deleteItem]);

  // title 클릭 시 실행될 함수
  const offReadOnlyMode = useCallback(() => setReadOnly(false), []);

  // readOnly : true -> enter key 누르면 readOnly true 로 변경
  const enterKeyEventHandler = (e) => {
    if(e.key==='Enter') {
      setReadOnly(true);
      updateItem(todoItem); // 수정 1 - 엔터 누르면 저장
    }
  }

  // todo 수정 함수
  // 커서가 깜박인다고 수정 가능한 것은 아님, 사용자가 키보드 입력할 때마다 item을 새 값으로 변경해줘야함
  const editEventHandler = (e) => {
    const {title, ...rest} = todoItem; // ...rest -> title 외에 나머지
    setTodoItem({title : e.target.value, ...rest})
  }

  // checkbox 업데이트
  const checkboxEventHandler = (e) => {
    // rest : id, title 정보
    const {done, ...rest} = todoItem;

    const updatedItem = {done : e.target.checked, ...rest}

    setTodoItem(updatedItem)
    updateItem(updatedItem) // 수정2 - 체크박스 변경 시 저장
    
    const checkCircle = e.target.nextSibling.querySelectorAll('.todo-circle')
    
    if(e.target.checked) {
      checkCircle[0].style.display = 'none'
      checkCircle[1].style.display = 'inline-block'
    } else {
      checkCircle[1].style.display = 'none'
      checkCircle[0].style.display = 'inline-block'
    }
  }

  
  return (
    <div className='Todo'>
        <input type='checkbox' className='todo-check' id={`todo${todoItem.id}`} name={`todo${todoItem.id}`} value={`todo${todoItem.id}`} 
        defaultChecked={todoItem.done}
        onChange={checkboxEventHandler}
        hidden
        />
        <label htmlFor={`todo${item.id}`} className='todo-label'>
          <FontAwesomeIcon icon={faCircle} size='2x' className='todo-circle'/>
          <FontAwesomeIcon icon={faCircleCheck} style={{display : "none"}} size='2x' className='todo-circle'/>
        </label>
        <input type='text' className='todo-content' value={todoItem.title} readOnly={readOnly} onClick={offReadOnlyMode}
        onChange={editEventHandler} onKeyDown={enterKeyEventHandler}
        />
        <button className='todo-delete' onClick={onDeleteButtonClick}>
          <span>
            <FontAwesomeIcon icon={faTrashCan} className='delete-icon' size='lg'/>
          </span>
        </button>
    </div>
  )
}
