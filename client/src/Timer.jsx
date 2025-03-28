import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { CheckCircle, Clock } from "lucide-react";
const ROOTURL = 'http://localhost:8080'
export default function PomodoroTimer() {
  let [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  let [isRunning, setIsRunning] = useState(false);
  let [completed, setCompleted] = useState(null)
  let [pending, setPending] = useState(null)
  let [error, setError] = useState(null)
  let [showalert, setShowAlert] = useState(null)
  let [pomodorosessions, setPomodoroSessions] = useState(0)
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  useEffect(() => {
    const options = {
      method: 'GET'
    }
    fetch(ROOTURL+'/details', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
      return response.json()
    })
    .then(data => {
      const completed = data.completed
      const pending = data.pending
      setCompleted(completed)
      setPending(pending)
    })
  })
  
  function SetAllHighPriority(){
    const priority = 'high'
    const options = {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify([{priority:priority}])
    }
    fetch(ROOTURL+'/priority/timerpage', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Priority Could Not Be Changed!')
      }
      return response
    })
    .then(data => {
      console.log('hey')
      setShowAlert('Tasks Updated To State!')
      setTimeout(() => {
        setShowAlert(null)
       }, 1500)
      //setError(true)
    })
    .catch(error => {
      setError(error.message)
    })
  }
  
  function SetAllMediumPriority(){
    const priority = 'medium'
    const options = {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify([{priority:priority}])
    }
    fetch(ROOTURL+'/priority/timerpage', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Priority Could Not Be Changed!')
      }
      return response
    })
    .then(data => {
      console.log('hey')
      setShowAlert('Tasks Updated To State!')
      setTimeout(() => {
        setShowAlert(null)
       }, 1500)
      //setError(true)
    })
    .catch(error => {
      setError(error.message)
    })
  }

  function SetAllLowPriority(){
    const priority = 'low'
    const options = {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify([{priority:priority}])
    }
    fetch(ROOTURL+'/priority/timerpage', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Priority Could Not Be Changed!')
      }
      return response
    })
    .then(data => {
      console.log('hey')
      setShowAlert('Tasks Updated To State!')
      setTimeout(() => {
       setShowAlert(null)
      }, 1500)
      //setError(true)
    })
    .catch(error => {
      setError(error.message)
    })
  }

  function ResetError(){
    setError(null)
  }
  
  function ResetAlert(){
    setShowAlert(null)
  }
  
  useEffect(() => {
    console.log('the useeffect')
    if (isRunning==true){
      setPomodoroSessions(prevCount => prevCount + 1)
    }
  }, [isRunning])
  
  function SetAllCompletedId(){
    const state = true
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({state:state})
    }
    fetch(ROOTURL+'/changeidstate', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
    })
    .then(data => {
      setShowAlert('Tasks Updated To State!')
      setTimeout(() => {
       setShowAlert(null)
      }, 1500)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }
  
  function SetAllPendingId(){
    const state = false
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({state:state})
    }
    fetch(ROOTURL+'/changeidstate', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Request Could Not Be Processed!')
      }
    })
    .then(data => {
      setShowAlert('Tasks Updated To State!')
      setTimeout(() => {
       setShowAlert(null)
      }, 1500)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }

  return (
    <>
    <div className="absolute top-20 right-0 p-4 flex space-x-2">
          <button onClick={SetAllHighPriority} className="p-2 rounded-lg bg-red-500 font-bold">All High Priority</button>
          <button  onClick={SetAllMediumPriority} className="p-2 rounded-lg bg-orange-500 ml-2 font-bold">All Medium Priority</button>
          <button onClick={SetAllLowPriority} className="p-2 rounded-lg bg-green-500 ml-2 font-bold">All Low Priority</button>
          <p className="p-2 rounded-lg bg-blue-500 ml-2 font-bold">Sessions: {pomodorosessions}</p>
      </div>
      <div className="absolute top-20 left-0 p-4 flex space-x-2 h-24">
          <button onClick={SetAllCompletedId} className="h-10 w-32 rounded-lg bg-red-500 font-bold">All Completed!</button>
          <button className="h-10 w-32 rounded-lg bg-orange-500 ml-2 font-bold" onClick={SetAllPendingId}>All Pending!</button>
      {/* Completed Tasks */}
      <div className="bg-green-100 border border-green-300 rounded-xl h-11 w-40 flex items-center justify-center shadow-md">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600" size={24} />
          <span className="text-lg font-medium text-green-800">Completed</span>
        </div>
        <span className="text-xl font-bold text-green-900 ml-1">{completed}</span>
      </div>
      {/* Pending Tasks */}
      <div className="bg-yellow-100 border border-yellow-300 rounded-xl h-11 w-40 flex items-center justify-center shadow-md">
        <div className="flex items-center gap-2">
          <Clock className="text-yellow-600" size={24} />
          <span className="text-lg font-medium text-yellow-800">Pending</span>
        </div>
        <span className="text-xl font-bold text-yellow-900 ml-1">{pending}</span>
        </div>
      </div>
    <div className="flex flex-col items-center justify-center h-screen w-full p-4">
    {error && (
        <div className="max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          <button
          className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-100"
          onClick={ResetError}
          >Close Error</button>
        </div>
       )}
       {showalert && (
        <div className="max-w-2xl mb-20 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md">
          <p className="font-semibold">Alert:</p>
          <p>{showalert}</p>
          <button
          className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-100"
          onClick={ResetAlert}
          >Close Alert</button>
        </div>
       )}
      <h1 className="text-5xl font-bold">Pomodoro Timer</h1>
      <div className="text-8xl font-mono my-8">{formatTime(timeLeft)}</div>
      <div className="flex gap-6">
        <button onClick={() => setIsRunning(true)} className="bg-green-500 text-white text-2xl px-6 py-3 rounded">Start</button>
        <button onClick={() => setIsRunning(false)} className="bg-yellow-500 text-white text-2xl px-6 py-3 rounded">Pause</button>
        <button onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); }} className="bg-red-500 text-white text-2xl px-6 py-3 rounded">Reset</button>
      </div>
    </div>
    <div>
      <Link to='/tasks' className="inline-block px-6 py-3 bg-yellow-500 text-black font-bold text-xl hover:bg-yellow-400 transition-all duration-300 flex justify-center">Task Manager!</Link>
    </div>
    </>
  );
}
