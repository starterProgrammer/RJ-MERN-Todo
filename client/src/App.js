import { useEffect, useState } from 'react'
import './App.css'

const BASE_URL = "http://localhost:3001/todos"
function App() {

  // Use Effect To Fecth Data 
  useEffect(() => {
    getTodosList()
  }, [])

  // State
  const [todos, setTodos] = useState([])
  const [showTaskInput, setShowTaskinput] = useState(false)
  const [newTask, setNewTask] = useState('')

  // Fet Todos
  const getTodosList = () => {
    fetch(BASE_URL).then((res) => res.json()).then((res) => { setTodos(res); console.log(res) })
  }


  // set Completed 
  const handelCompletedTask = async (id) => {
    // Server Side
    const copyTodos = await fetch(BASE_URL + '/complete/' + id, {
      method: 'PUT'
    }).then((res) => res.json())

    setTodos(todos => todos.map((todo => {
      if (todo._id === copyTodos._id) {
        todo.complete = copyTodos.complete
      }

      return todo;
    })))
  }


  // Delete Task 
  const handelDeleteTask = async (id) => {
    // server side 
    const copyTodo = await fetch(BASE_URL + '/delete', {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    }).then((res) => res.json())

    console.log(copyTodo)

    setTodos(todos => todos.filter(todo => todo._id !== copyTodo._id))
  }

  // Add New Task 
  const handelAddNewTask = async () => {
    // Sever Side
    console.log(newTask)

    const addedTodo = await fetch(BASE_URL + "/new", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        text: newTask
      })
    }).then(res => res.json())

    setTodos([...todos, addedTodo])

    setShowTaskinput(false)
    setNewTask('')
  }

  return (
    <div className="App">
      <div className='todos'>
        <h1 className='title'>Welcome Ali</h1>
        <h4 className='sub-title'>Your Tasks</h4>

        {
          todos?.length >= 1 ?
            todos.map((todo) => {
              return (
                <div key={todo._id} className={"todo " + (todo.complete && "is-complete")}>
                  <div onClick={() => handelCompletedTask(todo._id)} className='checkbox'></div>
                  <div className='text'>{todo.text}</div>
                  <div onClick={() => handelDeleteTask(todo._id)} className='delete'>X</div>
                </div>
              )
            })
            : (
              <div className='empty'>
                <h1>Your Todo List Is Empty</h1>
              </div>
            )
        }

        <div className='add-btn' onClick={() => setShowTaskinput(!showTaskInput)}>
          +
        </div>

        {
          showTaskInput &&
          <div className='popup'>
            <div onClick={() => setShowTaskinput(!showTaskInput)} className='close-popup'>X</div>

            <div className='content'>
              <input placeholder='Add Your Task' onChange={(event) => setNewTask(event.target.value)} value={newTask} />
              <button onClick={() => handelAddNewTask()}>add task</button>
            </div>
          </div>
        }


      </div>
    </div>
  );
}

export default App;
