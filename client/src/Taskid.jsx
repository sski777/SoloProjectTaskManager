import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
const ROOTURL = 'http://localhost:8080'
function TaskId(){
  const { id } = useParams() // gets the id dynamically from the url
  console.log(id)
  let [user, setUser] = useState([])
  let [error, setError] = useState(null)
  let [alert, setAlert] = useState(null)

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
   })
  }, [])
  
  
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
   })
  })

  const tasklistsee = user.map((task, index) => <li key={index}>
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl bg-white-500 p-12">
        <h1 className="text-2xl font-bold text-center mb-4">Your Task Is: {task.title}</h1>
        <div className="top-20">
        {task.completed ? <span className="p-2 rounded-lg bg-green-500">Completed</span> : <span className="p-2 rounded-lg bg-red-500">Pending</span>}
        {task.priority === 'high' && <span className="p-2 rounded-lg bg-red-500 ml-10">High</span>} {/* By Default The Text Color Is Black */}
        {task.priority === 'medium' && <span className="p-2 rounded-lg bg-orange-500 ml-10">Medium</span>}
        {task.priority === 'low' && <span className="p-2 rounded-lg bg-green-500 ml-10">Low</span>} { /* put each of these conditional statements in their own seperate divs and then space them */}
        {Number(task.duedate) >= 0 && Number(task.duedate) <= 10 && <span className="p-2 rounded-lg bg-red-500 ml-10">Due Date: {task.duedate} Days</span>}
        {Number(task.duedate) >= 11 && Number(task.duedate) <= 20 && <span className="p-2 rounded-lg bg-orange-500 ml-10">Due Date: {task.duedate} Days</span>}
        {Number(task.duedate) >= 21 && <span className="p-2 rounded-lg bg-green-500 ml-10">Due Date: {task.duedate} Days</span>}
        </div>
      </div>
      <div className="mt-5">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={SetTaskPriorityHigh}>Set High</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded ml-10" onClick={SetTaskPriorityMedium}>Set Medium</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded ml-10" onClick={SetTaskPriorityLow}>Set Low</button>
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