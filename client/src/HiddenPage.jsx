import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ROOTURL = 'https://soloproject1.onrender.com'
function HiddenPage(){
  let [taskslist, setTasksList] = useState([])
  
  function MakeHidden(index){
    const hiddenstate = true
    console.log(hiddenstate)
    let gettask = taskslist[index]
    let gettitle = gettask.title
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({hiddenstate:hiddenstate,title:gettitle})
    }
    fetch(ROOTURL+'/changehidden', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => {
      const tasksarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='high'){
           tasksarray.push(variable) 
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='medium'){
           tasksarray.push(variable) 
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='low'){
           tasksarray.push(variable) 
        }
      }
      console.log(tasksarray)
      setTasksList(tasksarray)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  function MakeUnHidden(index){
    const hiddenstate = false
    let gettask = taskslist[index]
    let gettitle = gettask.title
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({hiddenstate:hiddenstate,title:gettitle})
    }
    fetch(ROOTURL+'/changehidden', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => {
      const tasksarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='high'){
           tasksarray.push(variable) 
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='medium'){
           tasksarray.push(variable) 
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='low'){
           tasksarray.push(variable) 
        }
      }
      setTasksList(tasksarray)
    })
    .catch(error => {
      alert(error.message)
    })
  }

  function DeleteTask(index){
    let gettask = taskslist[index]
    let gettitle = gettask.title
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title:gettitle})
    }
    fetch(ROOTURL+'/changehidden/deletehidden', options)
    .then(response => {
       if (!response.ok){
         throw new Error('Request Could Not Be Processed!')
       }
       return response.json() 
    })
    .then(data => {
        const tasksarray = []
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='high'){
             tasksarray.push(variable) 
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='medium'){
             tasksarray.push(variable) 
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='low'){
             tasksarray.push(variable) 
          }
        }
        setTasksList(tasksarray)
    })
    .catch(error => {
       alert(error.message) 
    })
  }


  useEffect(() => {
    const options = {
      method: 'GET'
    }
    fetch(ROOTURL+'/changehidden/getall', options)
    .then(response => {
       if (!response.ok){
         throw new Error('Request Could Not Be Processed!')
       }
       return response.json()
    })
    .then(data => {
      const taskarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='high'){
          taskarray.push(variable)
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='medium'){
          taskarray.push(variable)
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='low'){
          taskarray.push(variable)
        }
      }
      setTasksList(taskarray)
    })
    .catch(error => {
       alert(error.message) 
    }) 
  }, [])
  
    const tasklistsee = taskslist.map((task, index) => (
      <li key={index} className="bg-white shadow rounded-lg">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <Link className="text-gray-800 text-lg font-bold" to="/tasks">
            {task.title}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {task.hidden ? (
              <span className="text-green-500 font-bold">Hidden!</span>
            ) : (
              <span className="text-red-500 font-bold">Not Hidden!</span>
            )}
            <button
              onClick={() =>
                task.hidden ? MakeUnHidden(index) : MakeHidden(index)
              }
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              {task.hidden ? "Un-Hide" : "Hide"}
            </button>
            <button
              onClick={() => DeleteTask(index)}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              Remove!
            </button>
          </div>
        </div>
      </li>
    ));
  
    return (
      <div className="min-h-screen flex flex-col bg-gray-300">
        {/* List container */}
        <ul className="flex-1 overflow-y-auto p-6 space-y-4">{tasklistsee}</ul>
  
        {/* Footer button */}
        <div className="shadow">
          <Link
            to="/tasks"
            className="w-full block text-center px-6 py-3 bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-400 transition-all duration-300 rounded"
          >
            Task Manager!
          </Link>
        </div>
      </div>
    );
  };
  




export default HiddenPage