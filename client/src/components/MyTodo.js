import React from 'react'

export default function MyTodo({item}) {
  return (
    <div className='Todo'>
        <input type='checkbox' id={`todo${item.id}`} name={`todo${item.id}`} value={`todo${item.id}`} defaultChecked={item.done}/>
        <label htmlFor={`todo${item.id}`}>{item.title}</label>
    </div>
  )
}
