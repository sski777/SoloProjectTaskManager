import { useState, useEffect } from "react";
import { data, Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
const ROOTURL = 'http://localhost:8080'
function TaskCategory(){

  let [taskslist, setTasksList] = useState([])
  let [filtertaskarray, setFilterTasksArray] = useState([])
  useEffect(() => {
    const options = {
      method: 'GET'
    }
    fetch(ROOTURL+'/tasks', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => {
      const newarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='high'){
          newarray.push(variable)  
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='medium'){
          newarray.push(variable)  
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='low'){
          newarray.push(variable)  
        }
      } 
      setTasksList(newarray)
    })
    .catch(error => {
      alert(error.message)  
    })
  }, [])

  function AllTasks(){
    const options = {
      method: 'GET' 
    }
    fetch(ROOTURL+'/tasks', options)
    .then(response => {
       if (!response.ok){
         throw new Error('Request Could Not Be Processed!')
       }
       return response.json()
    })
    .then(data => {
        const newarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='high'){
          newarray.push(variable)  
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='medium'){
          newarray.push(variable)  
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='low'){
          newarray.push(variable)  
        }
      } 
      setTasksList(newarray)
    })
  }

  function OnlyPersonal(){ // work personal urgent
    const options = {
      method: 'GET'
    }
    fetch(ROOTURL+'/tasks', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed')
      }
      return response.json()
    })
    .then(data => {
      const newarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.category==='personal'){
           newarray.push(variable) 
        }
      }
      const priorityarray = []
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='high'){
          priorityarray.push(variable)  
        }
      }
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='medium'){
          priorityarray.push(variable)  
        }
      }
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='low'){
          priorityarray.push(variable)  
        }
      } 
      setTasksList(priorityarray)
    })
    .catch(error => {
      alert(error.message)
    })
  }
  function OnlyWork(){ // work personal urgent
    const options = {
        method: 'GET'
      }
      fetch(ROOTURL+'/tasks', options)
      .then(response => {
        if (!response.ok){
          throw new Error('Request Could Not Be Processed')
        }
        return response.json()
      })
      .then(data => {
        const newarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.category==='work'){
           newarray.push(variable) 
        }
      }
      const priorityarray = []
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='high'){
          priorityarray.push(variable)  
        }
      }
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='medium'){
          priorityarray.push(variable)  
        }
      }
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='low'){
          priorityarray.push(variable)  
        }
      } 
      setTasksList(priorityarray)
      })
      .catch(error => {
        alert(error.message)
      })
  }
  

  
  function OnlyUrgent(){ // work personal urgent
    const options = {
        method: 'GET'
      }
      fetch(ROOTURL+'/tasks', options)
      .then(response => {
        if (!response.ok){
          throw new Error('Request Could Not Be Processed')
        }
        return response.json()
      })
      .then(data => {
        const newarray = []
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.category==='urgent'){
           newarray.push(variable) 
        }
      }
      const priorityarray = []
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='high'){
          priorityarray.push(variable)  
        }
      }
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='medium'){
          priorityarray.push(variable)  
        }
      }
      for (let i = 0; i < newarray.length; i++){
        let variable = newarray[i]
        if (variable.priority==='low'){
          priorityarray.push(variable)  
        }
      } 
      setTasksList(priorityarray)
      })
      .catch(error => {
        alert(error.message)
      })
  }

 
  function SetWorkCategory(index){
    const gettask = taskslist[index]
    let gettitle = gettask.title
    console.log('hey')
    const category = 'work'
    if (gettask.category===category){
      alert('Task Is Already Current Category!')
    }
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({tasktitle: gettitle, category: category})
    }
    fetch(ROOTURL+'/changecategory', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => {
        const newarray = []
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='high'){
            newarray.push(variable)  
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='medium'){
            newarray.push(variable)  
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='low'){
            newarray.push(variable)  
          }
        } 
        setTasksList(newarray)
    })
  }

  function SetPersonalCategory(index){
    const gettask = taskslist[index]
    let gettitle = gettask.title
    const category = 'personal'
    if (gettask.category===category){
        alert('Task Is Already Current Category!')
    }
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({tasktitle: gettitle, category: category})
    }
    fetch(ROOTURL+'/changecategory', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => {
        const newarray = []
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='high'){
            newarray.push(variable)  
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='medium'){
            newarray.push(variable)  
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='low'){
            newarray.push(variable)  
          }
        } 
        setTasksList(newarray)
    })
  }

  function SetUrgentCategory(index){
    const gettask = taskslist[index]
    let gettitle = gettask.title
    const category = 'urgent'
    if (gettask.category===category){
        alert('Task Is Already Current Category!')
    }
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({tasktitle: gettitle, category: category})
    }
    fetch(ROOTURL+'/changecategory', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => {
        const newarray = []
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='high'){
            newarray.push(variable)  
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='medium'){
            newarray.push(variable)  
          }
        }
        for (let i = 0; i < data.length; i++){
          let variable = data[i]
          if (variable.priority==='low'){
            newarray.push(variable)  
          }
        } 
        setTasksList(newarray)
    })
  }


  useEffect(() => {
    const filterarray = taskslist.filter(task => !task.hidden)
    setFilterTasksArray(filterarray)
  }, [taskslist])

  const tasklistsee = filtertaskarray.map((task, index) => <li key={index} className="bg-white shadow-xl">
     <div
        className="flex p-12 w-full border rounded-lg shadow-xl space-x-6"
      >
            <Link to={'/tasks/:'+index} className="flex text-lg font-bold" state={{title:filtertaskarray[index].title, favorite:filtertaskarray[index].favorite}}>{task.title}</Link>
            <h3 className="flex justify-center text-lg font-semibold underline decoration-solid rounded-lg">Category: {task.category.slice(0,1).toUpperCase()+task.category.slice(1)}</h3>
            <div className="flex justify-end space-x-3 ml-auto">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 font-bold rounded-md hover:bg-blue-100" onClick={() => SetWorkCategory(index)}>Work</button>
              <button className="px-4 py-2 text-orange-600 border border-orange-600 font-bold rounded-md hover:bg-orange-100" onClick={() => SetPersonalCategory(index)}>Personal</button>
              <button className="px-4 py-2 text-green-600 border border-green-600 font-bold rounded-md hover:bg-green-100" onClick={() => SetUrgentCategory(index)}>Urgent</button>
            </div>
    </div>
  </li>)
  return (
    <div className="bg-gray-300">
    <div className="min-h-screen mx-auto p-6 shadow-lg rounded-lg">
    <div className="mb-6 flex justify-end items-center space-x-3">
     <button className="p-2 rounded-lg bg-red-500 font-bold" onClick={OnlyPersonal}>All Personal</button>
     <button className="p-2 rounded-lg bg-blue-500 font-bold" onClick={OnlyWork}>All Work</button>
     <button className="p-2 rounded-lg bg-orange-500 font-bold" onClick={OnlyUrgent}>All Urgent</button>
     <button className="p-2 rounded-lg bg-purple-500 font-bold" onClick={AllTasks}>All Tasks</button>
    </div>
    {taskslist.length > 0 ? <h2 className="text-2xl font-bold mb-4 ml-4">Your Tasks:</h2> : <div></div>}
    <div className="min-h-screen flex flex-col justify-between">
     {taskslist.length > 0 ? <ol>{tasklistsee}</ol> : (<div className="h-screen w-screen flex items-center justify-center bg-gray-300">
      <div className="flex flex-col items-center justify-center text-gray-500 py-10">
            <Bookmark size={48} className="text-gray-350" />
            <p className="mt-4 text-lg font-medium font-bold">No tasks here yet</p>
            <p className="text-sm text-gray-400 font-medium">
              Mark tasks as this current category to see them here!
            </p>
          </div>
          </div>)}
    </div>
    </div>
    <div>
    <Link to='/tasks' className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-400 transition-all duration-300 flex justify-center">Task Manager!</Link>
  </div>
  </div>
  )
}


export default TaskCategory