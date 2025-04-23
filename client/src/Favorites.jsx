import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Bookmark, Clock, CheckCircle } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";


const ROOTURL = 'http://localhost:8080'
function FavoriteTask(){
  let [favoritetasksarray, setFavoriteTasksArray] = useState([])
  let [filtertaskarray, setFilterTasksArray] = useState([])
  let [error, setError] = useState(null)
  let [countfavorites, setCountFavorites] = useState(0)
  let [countnotfavorites, setCountNotFavorites] = useState(0)
  let [alert, setAlert] = useState(null)
  let [countpending, setCountPending] = useState(0)
  let [countcompleted, setCountCompleted] = useState(0)
  let [countlowpriority, setLowPriority] = useState(0)
  let [countmediumpriority, setCountMediumPriority] = useState(0)
  let [counthighpriority, setCountPriorityHigh] = useState(0)
  

  useEffect(() => {
    const options = {
      method: 'GET'
    }
     fetch(ROOTURL+'/changefavorite', options)
     .then(response => {
       if (!response.ok){
         throw new Error('Request Could Not Be Processed!')
       }
       return response.json()
     })
     .then(data => {
       const favoritearray = []
       for (let i = 0; i < data.length; i++){
         let variable = data[i]
         if (variable.favorite===true){
           favoritearray.push(variable)
         }
       }
       const tasksarray = []
      for (let i = 0; i < favoritearray.length; i++){
        let variable = favoritearray[i]
        if (variable.priority==='high'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < favoritearray.length; i++){
        let variable = favoritearray[i]
        if (variable.priority==='medium'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < favoritearray.length; i++){
        let variable = favoritearray[i]
        if (variable.priority==='low'){
          tasksarray.push(variable)
        }
      }
      setFavoriteTasksArray(tasksarray)
      let countfavoritessee = 0
      let countnotfavoritesee = 0
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.favorite===true){
          countfavoritessee++
        }
      }
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.favorite===false){
          countnotfavoritesee++
        }
      }
      let countcompletedsee = 0
      let countnotcompletedsee = 0
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.completed===true){
          countcompletedsee++
        }
        else if (variable.completed===false){
          countnotcompletedsee++
        }
      }
      setCountCompleted(countcompletedsee)
      setCountPending(countnotcompletedsee)
      let countlowprioritysee = 0
      let countmediumprioritysee = 0
      let counthighprioritysee = 0
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.priority==='high'){
          counthighprioritysee++
        }
        else if (variable.priority==='medium'){
          countmediumprioritysee++
        }
        else if (variable.priority==='low'){
          countlowprioritysee++
        }
      }
      setCountPriorityHigh(counthighprioritysee)
      setCountMediumPriority(countmediumprioritysee)
      setLowPriority(countlowprioritysee)
     })
     .catch(error => {
       setError(error.message)
       setTimeout(() => {
        setError(null)
       }, 1500)
     })
  })
  
  function SetAllFavorite(){
    const favorite = true
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({favorite:favorite})
    }
    fetch(ROOTURL+'/setallfavorites', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response
    })
    .then(data => {
      setAlert('All Tasks Updated To State!')
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
  
  function SetAllNonFavorite(){
    const favorite = false
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({favorite:favorite})
    }
    fetch(ROOTURL+'/setallfavorites', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response
    })
    .then(data => {
      setAlert('All Tasks Updated To State!')
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
   
  function RemoveTaskFromFavorite(index){
    let gettask = favoritetasksarray[index]
    let tasktitle = gettask.title
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({tasktitle:tasktitle})
    }
    fetch(ROOTURL+'/setallfavorites/delete', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => { 
      setFavoriteTasksArray(data)
      let countcompletedsee = 0
      let countnotcompletedsee = 0
      for (let i = 0; i < data.length; i++){
        let variable = data[i]
        if (variable.completed===true){
          countcompletedsee++
        }
        else if (variable.completed===false){
          countnotcompletedsee++
        }
      }
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }


  function ResetError(){
    setError(null)
  }
  
  useEffect(() => {
    const filterarray = favoritetasksarray.filter(task => !task.hidden)
    setFilterTasksArray(filterarray)
  }, [favoritetasksarray])
  
  return (
    <>
    {favoritetasksarray.length > 0 ? (<div className="h-screen flex items-center justify-center bg-gray-300">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Favorite Tasks:
        </h2>
          <ul className="space-y-4">
            {filtertaskarray.map((task, index) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
              >
                <Link className="text-gray-800 text-lg font-bold" to='/tasks'>{task.title}</Link>
                {task.completed ? <span className="text-green-500 font-bold rounded-md mr-64 ml-0">Completed!</span> : <span className="px-4 py-2 text-red-500 font-bold rounded-md mr-64 ml-0">Not Completed!</span>}
                <button onClick={() => RemoveTaskFromFavorite(index)} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Remove!</button>
              </li>
            ))}
          </ul>
      </div>
      <div className="absolute top-20 left-0 p-4 flex space-x-2 h-24">
          <button onClick={SetAllFavorite} className="h-10 w-32 rounded-lg bg-blue-500 font-bold">All Favorite!</button>
          <button onClick={SetAllNonFavorite} className="h-10 w-32 rounded-lg bg-red-500 ml-2 font-bold" >Reset All!</button>
          <span className="h-10 w-32 p-2 rounded-lg bg-yellow-500 mr-2 flex justify-center font-bold">{countcompleted}/{countpending}</span>
          <span className="h-10 w-32 p-2 rounded-lg bg-yellow-500 mr-2 flex justify-center font-bold">{countlowpriority}/{countmediumpriority}/{counthighpriority}</span>
      {/* Completed Tasks */}
      <div className="bg-green-100 border border-green-300 rounded-xl h-11 w-40 flex items-center justify-center shadow-md">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600" size={24} />
          <span className="text-lg font-medium text-green-800">Favorite:</span>
        </div>
        <span className="text-xl font-bold text-green-900 ml-1">{countfavorites}</span>
      </div>
      {/* Pending Tasks */}
      <div className="bg-yellow-100 border border-yellow-300 rounded-xl h-11 w-40 flex items-center justify-center shadow-md">
        <div className="flex items-center gap-2">
          <Clock className="text-yellow-600" size={24} />
          <span className="text-lg font-medium text-yellow-800">Rest:</span>
        </div>
        <span className="text-xl font-bold text-yellow-900 ml-1">{countnotfavorites}</span>
        </div>
      </div>
    </div>) : (<div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-center text-gray-500 py-10">
            <Bookmark size={48} className="text-gray-300" />
            <p className="mt-4 text-lg font-medium">No favorite tasks yet</p>
            <p className="text-sm text-gray-400">
              Mark tasks as favorites to see them here!
            </p>
          </div>
          </div>)}
     <div>
        <Link to='/tasks' className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-400 transition-all duration-300 flex justify-center">Task Manager!</Link>
    </div>
    </>
  );
}


export default FavoriteTask