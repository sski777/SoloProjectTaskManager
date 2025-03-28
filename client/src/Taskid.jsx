import { useState, useEffect } from "react"
import { useParams, Link, data } from "react-router-dom"
const ROOTURL = 'http://localhost:8080'
function TaskId(){
  const { id } = useParams() // gets the id dynamically from the url
  console.log(id)
  let [user, setUser] = useState([])
  let [error, setError] = useState(null)
  let [alert, setAlert] = useState(null)
  
  
  function SetTaskPriorityHigh(){
    const priority = 'high'
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({priority:priority, tasktitle: user[0].title})
    }
    fetch(ROOTURL+'/changeid/:'+id.slice(1), options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
    })
    .then(data => {
      setAlert('Priority Has Been Updated!')
      setTimeout(() => {
        setAlert(null)
       }, 1500)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }
  
  function SetTaskPriorityMedium(){
    const priority = 'medium'
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({priority:priority, tasktitle: user[0].title})
    }
    fetch(ROOTURL+'/changeid/:'+id.slice(1), options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
    })
    .then(data => {
      setAlert('Priority Has Been Updated!')
      setTimeout(() => {
        setAlert(null)
       }, 1500)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }
  
  function SetTaskPriorityLow(){
    const priority = 'low'
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({priority:priority, tasktitle: user[0].title})
    }
    fetch(ROOTURL+'/changeid/:'+id.slice(1), options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
    })
    .then(data => {
      setAlert('Priority Has Been Updated!')
      setTimeout(() => {
        setAlert(null)
       }, 1500)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }

  function ResetAlert(){
    setAlert(null)
  }

  function toggleComplete(){
    const gettask = user[0]
    const statetoupdate = !gettask.completed
    const title = gettask.title
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({tasktitle:title, state:statetoupdate})
    }
    fetch(ROOTURL+'/returnchanges/taskid', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response
    })
    .then(data => {

    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }

  useEffect(() => {
    const options = {
      method: 'GET'
    }
   fetch(ROOTURL+'/tasks/:'+id.slice(1), options)
   .then(response => {
     if (!response.ok){
       throw new Error('Task Does Not Exist!')
     }
     return response.json()
   })
   .then(data => {
     setUser(data)
   })
   .catch(error => {
     setError(error.message)
     setTimeout(() => {
      setError(null)
     }, 1500)
   })
  })

  const tasklistsee = user.map((task, index) => <li key={index}>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg border">
        <Link className="text-3xl font-semibold mb-14" to='/tasks'>Your Task Is: {task.title}</Link>

        <div className="flex items-center justify-between mb-6">
          <span
            className={`px-4 py-2 text-lg font-semibold mt-8 rounded-full ${
              task.priority === "high"
                ? "bg-red-500 text-white"
                : task.priority === "medium"
                ? "bg-yellow-400 text-white"
                : "bg-blue-400 text-white"
            }`}
          >
            {task.priority}
          </span>
          <span
            className={`px-4 py-2 text-lg mr-64 font-semibold mt-8 rounded-full ${
              task.completed === true
                ? "bg-yellow-500 text-white"
                : task.completed === false
                ? "bg-red-500 text-white"
                : "bg-blue-400 text-white"
            }`}
          >
            {task.completed ? <p>Completed!</p> : <p>Not Completed!</p>}
          </span>
          <p className="text-lg text-gray-600 font-bold">
            Due: {task.duedate} Days
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {task.completed ? <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="h-6 w-6 cursor-pointer"
          /> : <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleComplete}
            className="h-6 w-6 cursor-pointer"/>}
          <span className={`text-2xl ${task.completed ? "line-through text-gray-500" : ""}`}>
            {task.completed ? "Completed" : "Mark as Complete"}
          </span>
        </div>
      </div>
    </div>
  </li>)

  return (
    <div className="bg-grey-200">
      {alert && (
        <div className="max-w-2xl mb-20 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md">
          <p className="font-semibold">Alert:</p>
          <p>{alert}</p>
          <button
          className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-100"
          onClick={ResetAlert}
          >Close Alert</button>
        </div>
       )}
        {error && (
        <div className="mt-6 max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
       )}
      <ol>{tasklistsee}</ol>
      <div>
        <Link to='/tasks' className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-400 transition-all duration-300 flex justify-center">Task Manager!</Link>
      </div>
    </div>
  )

}

export default TaskId