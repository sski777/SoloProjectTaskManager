import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'
// will display tasks for the authenticated(logged-in user) as a list
// user will have the option to remove tasks, add tasks
// User Will be able to give tasks priority(put them to top) add a key to map what the colors are
// The ability to mark tasks as completed or pending


const ROOTURL = 'https://soloproject1.onrender.com'
// have a table Tasks with columns task description and the user who created that tasks select from the tasks that are created by that user
const TasksList = () => {
 
 let [task, setTask] = useState('')
 let [taskslist, setTaskList] = useState([])
 let [filtertaskarray, setFilterTasksArray] = useState([])
 let [error, setError] = useState(null) // by default a error does not exist
 let [completed, setCompleted] = useState(false)
 let [editingId, setEditingId] = useState()
 let [edittaskinput, setEditTaskInput] = useState('')
 let [editingdate, setEditingDate] = useState(null)
 let [editdateinput, setEditDateInput] = useState('')
 let [editdateindex, setEditDateIndex] = useState()
 let [editingdatedown, setEditingDateDown] = useState(null)
 let [editdatedowninput, setEditDateDownInput] = useState('')
 let [editdatedownindex, setEditDateDownIndex] = useState()
 let [searchtaskinput, setSearchTaskInput] = useState('')
 let [numberofinputfields, setNumberOfInputFields] = useState(0)
 let [returnpreviouschanges, setReturnPreviousChanges] = useState([])
 let [tasklistfirststate, setTaskListFirstState] = useState([])
 let [percentagenotcompleted, setPercentageNotCompleted] = useState(null)
 let [percentagecompleted, setPercentageCompleted] = useState(null)
 let [numberlowpriority, setNumberLowPriority] = useState(null)
 let [numbermediumpriority, setNumberMediumPriority] = useState(null)
 let [numberhighpriority, setNumberHighPriority] = useState(null)
 let [inputfieldappeared, setInputFieldAppeared] = useState(null)
 let [showalert, setShowAlert] = useState(null)
 function handleCreateTaskInputChange(e){
   setTask(e.target.value)
 }

 function HandleEditDateInput(e){
   setEditDateInput(e.target.value)
   console.log(editdateinput)
 }


 function HandleSubmit(){
   let newarray = task.split('')
   let newset = new Set(newarray)
   if (task!=''&&newset.size!=1&&newset.has(' ')==true){
    const wordsarray = []
    const checkstring = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?.,'
    for (let i = 0; i < task.length; i++){
      let variable = task[i]
      let nextvariable = task[i+1]
      let beforevariable = task[i-1]
      if (checkstring.includes(variable)&&checkstring.includes(nextvariable)&&!checkstring.includes(beforevariable)){
        let slice = task.slice(i)
        let emptystring = ''
        for (let j = 0; j < slice.length; j++){
          let index = slice[j]
          if (checkstring.includes(index)){
            emptystring = emptystring + index
          }
          else{
            break
          }
        }
        wordsarray.push(emptystring)
      }
      else if (checkstring.includes(variable)&&!checkstring.includes(nextvariable)&&!checkstring.includes(beforevariable)){
        wordsarray.push(variable)
      }
    }
    let newtask = wordsarray.join(' ')
    const options= {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify([newtask])
    }
    fetch(ROOTURL+'/tasks', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Could Not Add Task!')
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
      setTaskList(tasksarray)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
     setTask('')
     }
     else{
      setError('Can Not Add Empty Task!')
      setTimeout(() => {
        setError(null)
       }, 1500)
      setTask('')
     }
}


 function DeleteTask(index){
   let gettask = taskslist[index]
   let indextosee = Number(index) + 1
   console.log(indextosee)
   const options1 = {
     method: 'DELETE',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify(gettask)
   }
   fetch(ROOTURL+'/tasks/:'+indextosee, options1)
   .then(response => {
     if (!response.ok){
       throw new Error('Request Could Not Be Processed!')
     }
     return response.json()
   })
   .then(data => {
    console.log(data)
     setTaskList(data)
   })
   .catch(error => {
     setError(error.message)
     setTimeout(() => {
      setError(null)
     }, 1500)
   })
 }

 function AllTasks(){
  const options1 = {
    method: 'GET',
    //headers: {'Authorization':'Bearer'+' '+token}
  }
  fetch(ROOTURL+'/tasks', options1)
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
      setTaskList(tasksarray)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }
 

 function Completed(){
  const options1 = {
    method: 'GET',
    //headers: {'Authorization':'Bearer'+' '+token}
  }
  fetch(ROOTURL+'/tasks', options1)
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
      if (variable.completed===true){
        tasksarray.push(variable)
      }
    }
    setTaskList(tasksarray)
    const newarraysee = []
    for (let i = 0; i < tasksarray.length; i++){
      let variable = tasksarray[i]
      if (variable.priority==='high'){
        newarraysee.push(variable)
      }
    }
    for (let i = 0; i < tasksarray.length; i++){
      let variable = tasksarray[i]
      if (variable.priority==='medium'){
        newarraysee.push(variable)
      }
    }
    for (let i = 0; i < tasksarray.length; i++){
      let variable = tasksarray[i]
      if (variable.priority==='low'){
        newarraysee.push(variable)
      }
    }
    setTaskList(newarraysee)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }
 

 function NotCompleted(){
  const options1 = {
    method: 'GET',
    //headers: {'Authorization':'Bearer'+' '+token}
  }
  fetch(ROOTURL+'/tasks', options1)
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
      if (variable.completed===false){
        tasksarray.push(variable)
      }
    }
    setTaskList(tasksarray)
    const newarraysee = []
    for (let i = 0; i < tasksarray.length; i++){
      let variable = tasksarray[i]
      if (variable.priority==='high'){
        newarraysee.push(variable)
      }
    }
    for (let i = 0; i < tasksarray.length; i++){
      let variable = tasksarray[i]
      if (variable.priority==='medium'){
        newarraysee.push(variable)
      }
    }
    for (let i = 0; i < tasksarray.length; i++){
      let variable = tasksarray[i]
      if (variable.priority==='low'){
        newarraysee.push(variable)
      }
    }
    setTaskList(newarraysee)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }
 

 async function editTask(index){
   if (inputfieldappeared===true){
    console.log('hey this is the console log')
    setError('There Is A Input Field Already Active!')
    setTimeout(() => {
      setError(null)
     }, 1500)
     setInputFieldAppeared(true)
   }
   else{
    setEditingId(index) // when edit button is clicked we set the editingid state with the index of the li in the list
    setInputFieldAppeared(true)
   }
 }
 async function handleSubmitEdit(){
  if(editingId === undefined) {
    return
  }
  const checkcount = 0
  const checkstring = '0123456789'
  if (checkstring.includes(edittaskinput[0])){
      setEditingId()
      setError('Cannot Have Numbers In Task!')
      setTimeout(() => {
      setError(null)
     }, 1500)
     setInputFieldAppeared(null)
     return
  }
  if (edittaskinput!=''){
    let updatedtask = edittaskinput
  let task = taskslist[editingId]
  console.log(editingId)
  const options = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify([{newtask:updatedtask, task:task}])
  }
  fetch(ROOTURL+'/edit', options)
  .then(response => {
    if (!response.ok){
      throw new Error('Task Could Not Be Edited!')
    }
    return response.json()
  })
  .then(data => {
      setTaskList(data)
      setEditingId()
      setInputFieldAppeared(null)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
  setEditTaskInput('')
  }
  else{
    setEditingId()
    setError('Task Cannot Be Empty!')
    setTimeout(() => {
      setError(null)
     }, 1500)
    setInputFieldAppeared(null) 
  }
 }
 
 function handleEditTaskInputChange(e){
   setEditTaskInput(e.target.value)
 }


 async function HandleCompletedTask(index){
   const task = taskslist[index]
   console.log(task)
   const indextosee = Number(index) + 1
   const state = true
   // update task (task) with state (state) and set the tasklist with the new array
   const options = {
     method: 'POST',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({task:task, state:state})
   }
   fetch(ROOTURL+'/updates', options)
  .then(response => {
    if (!response.ok){
      throw new Error('Could Not Modify Task!')
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
      setTaskList(tasksarray) 
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }
 
 function HandleRevertTask(index){
  const task = taskslist[index]
  console.log(task)
  const indextosee = Number(index) + 1
  const state = false
  // update task (task) with state (state) and set the tasklist with the new array
  const options = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({task:task, state:state})
  }
  fetch(ROOTURL+'/updates', options)
 .then(response => {
   if (!response.ok){
     throw new Error('Could Not Modify Task!')
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
     setTaskList(tasksarray)
 })
 .catch(error => {
   setError(error.message)
   setTimeout(() => {
    setError(null)
   }, 1500)
 })
 }


 function HighPriority(index){
  let priority = 'high'
  let gettask = taskslist[index]
  if (priority!=gettask.priority){
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify([{priority:priority, task:gettask}])
    }
    fetch(ROOTURL+'/priority', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Priority Could No Be Changed!')
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
      setTaskList(tasksarray)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }
  else{
    setError('Task Is Already Current Priority')
    setTimeout(() => {
      setError(null)
     }, 1500)
  }
 }

 
 function MediumPriority(index){
  let priority = 'medium'
  let gettask = taskslist[index]
  if (priority!=gettask.priority){
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify([{priority:priority, task:gettask}])
    }
    fetch(ROOTURL+'/priority', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Priority Could No Be Changed!')
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
      setTaskList(tasksarray)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }
  else{
    setError('Task Is Already Current Priority')
    setTimeout(() => {
      setError(null)
     }, 1500)
  }
 }

 
 function LowPriority(index){
  let priority = 'low'
  let gettask = taskslist[index]
  if (priority!=gettask.priority){
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify([{priority:priority, task:gettask}])
    }
    fetch(ROOTURL+'/priority', options)
    .then(response => {
      if (!response.ok){
        throw new Error('Priority Could No Be Changed!')
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
      setTaskList(tasksarray)
    })
    .catch(error => {
      setError(error.message)
      setTimeout(() => {
        setError(null)
       }, 1500)
    })
  }
  else{
    setError('Task Is Already Current Priority')
    setTimeout(() => {
      setError(null)
     }, 1500)
  }
 }
 
 function ResetError(){
   setError(null)
 }
 
 function AllHighPriority(){
  const options1 = {
    method: 'GET',
    //headers: {'Authorization':'Bearer'+' '+token}
  }
  fetch(ROOTURL+'/tasks', options1)
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
    setTaskList(tasksarray)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }


 function AllMediumPriority(){
  const options1 = {
    method: 'GET',
    //headers: {'Authorization':'Bearer'+' '+token}
  }
  fetch(ROOTURL+'/tasks', options1)
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
      if (variable.priority==='medium'){
        tasksarray.push(variable)
      }
    }
    setTaskList(tasksarray)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }
 
 function AllLowPriority(){
  const options1 = {
    method: 'GET',
    //headers: {'Authorization':'Bearer'+' '+token}
  }
  fetch(ROOTURL+'/tasks', options1)
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
      if (variable.priority==='low'){
        tasksarray.push(variable)
      }
    }
    setTaskList(tasksarray)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }
 
 
 function HandleDateChange(){
  if (Number(editdateinput)>=0&&editdateinput.length>0){
    let gettask = taskslist[editdateindex]
  const options = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify([{task:gettask, extend:editdateinput}])
  }
  fetch(ROOTURL+'/extenddate', options)
  .then(response => {
    console.log('hey')
    if (!response.ok){
      throw new Error('Date Could Not Be Extended!')
    }
    return response.json()
  })
  .then(data => {
    console.log(data)
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
    setTaskList(tasksarray)
    setEditingDate(false)
    setEditDateInput('')
    setInputFieldAppeared(null)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
  }
  else{
    setError('Could Not Extend Date!')
    setTimeout(() => {
      setError(null)
     }, 1500)
    setEditingDate(false)
    setEditDateInput('')
    setInputFieldAppeared(null)
  }
 }
 

 async function SetDateIndex(index){
   if (inputfieldappeared===true){
    setError('There Is A Input Field Already Active!')
    setTimeout(() => {
      setError(null)
     }, 1500)
   }
   else{
    setEditDateIndex(index)
    setEditingDate(true)
    setInputFieldAppeared(true)
   }
 }
 
 function SetDecreaseDateIndex(index){
  if (inputfieldappeared===true){
    setError('There Is A Input Field Already Active!')
    setTimeout(() => {
      setError(null)
     }, 1500)
   }
   else{
    setEditDateDownIndex(index)
    setEditingDateDown(true)
    setInputFieldAppeared(true)
   }
 }
 
 function HandleDecreaseDateInputChange(e){
   setEditDateDownInput(e.target.value)
 }
 function HandleDecreaseDueDate(){
  if (Number(editdatedowninput)>=0&&editdatedowninput.length>0){
    let gettask = taskslist[editdatedownindex]
    const decreasedate = Number(editdatedowninput)
    const currentduedate = taskslist[editdatedownindex].duedate
    const seenewduedate = currentduedate - decreasedate
    if (seenewduedate<0){
      setError('Due Date Cannot Be Negative!')
      setTimeout(() => {
        setError(null)
       }, 1500)
      setInputFieldAppeared(null)
      setEditingDateDown(false)
      setEditDateDownInput('')
    }
    else{
      const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({decrease:editdatedowninput, task:gettask})
      }
      fetch(ROOTURL+'/extenddate/decrease', options)
      .then(response => {
        if (!response.ok){
          throw new Error('Date Could Not Be Decreased!')
        }
        return response.json()
      })
      .then(data => {
        setTaskList(data)
        setEditingDateDown(false)
        setEditDateDownInput('')
        setInputFieldAppeared(null)
      })
      .catch(error => {
        setError(error.message)
        setTimeout(() => {
          setError(null)
         }, 1500)
      })
    }
  }
  else{
    setError('Date Cannot Be Empty!')
    setTimeout(() => {
      setError(null)
     }, 1500)
    setInputFieldAppeared(null) 
    setEditingDateDown(false)
  }
 }
 
 
 function HandleSubmitSearch(){
   let cleanstring = ''
   for (let i = 0; i < searchtaskinput.length; i++){
     let variable = searchtaskinput[i]
     if (variable!=' '){
      cleanstring = cleanstring + variable
     }
   }
   const checkstring = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
   for (let i = 0; i < cleanstring.length; i++){
     let variable = cleanstring[i]
     if (checkstring.includes(variable)==true){
       setError('Cannot Add UpperCase Characters!')
       setTimeout(() => {
        setError(null)
       }, 1500)
       setSearchTaskInput('')
       return
     }
   }
   const options = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({search:cleanstring})
   }
   fetch(ROOTURL+'/search', options)
   .then(response => {
     if (!response.ok){
      throw new Error('Request Could Not Be Processed!')
     }
     return response.json()
   })
   .then(data => {
     if (data.length===0){
       setError('Could Not Find Any Tasks!')
       setTimeout(() => {
        setError(null)
       }, 1500)
     }
     else{
       setTaskList(data)
     }
   })
   .catch(error => {
     setError(error.message)
     setTimeout(() => {
      setError(null)
     }, 1500)
   })
   .finally(() => {
     setSearchTaskInput('')
   })
 }
 
 function HandleInputSearchTask(e){
   setSearchTaskInput(e.target.value)
 }
 
 
 function CloseInputField(){
  setEditingId()
  setEditingDate(false)
  setEditingDateDown(false)
  setInputFieldAppeared(null)
 }
 
 function SetAllCompleted(){
   let countvalid = 0
   for (let i = 0; i < taskslist.length; i++){
     let variable = taskslist[i]
     if (variable.completed===true){
      countvalid++
     }
   }
   if (countvalid===taskslist.length){
     setError('All Tasks Are Already Current State!')
     setTimeout(() => {
      setError(null)
     }, 1500)
     return
   }
   const state = true
   const options = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify([{state:state}])
   }
   fetch(ROOTURL+'/setall', options)
   .then(response => {
     if (!response.ok){
       throw new Error('Could Not Set All Tasks!')
     }
     return response.json()
   })
   .then(data => {
     setTaskList(data)
   })
   .catch(error => {
     setError(error.message)
     setTimeout(() => {
      setError(null)
     }, 1500)
   })
 }
 
 function SetAllPending(){
   let countvalid = 0
   for (let i = 0; i < taskslist.length; i++){
     let variable = taskslist[i]
     if (variable.completed===false){
      countvalid++
     }
   }
   if (countvalid===taskslist.length){
     setError('All Tasks Are Already Current State!')
     setTimeout(() => {
      setError(null)
     }, 1500)
     return
   }
  const state = false
  const options = {
   method: 'POST',
   headers: {'Content-Type':'application/json'},
   body: JSON.stringify([{state:state}])
  }
  fetch(ROOTURL+'/setall', options)
  .then(response => {
    if (!response.ok){
      throw new Error('Could Not Set All Tasks!')
    }
    return response.json()
  })
  .then(data => {
    setTaskList(data)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }
 
 function HandleDeleteAll(){
   const options = {
     method: 'GET'
   }
   fetch(ROOTURL+'/deleteall', options)
   .then(response => {
     if (!response.ok){
       throw new Error('Request Could Not Be Processed!')
     }
     return response.json()
   })
   .then(data => {
     setTaskList(data)
   })
   .catch(error => {
     setError(error.message)
     setTimeout(() => {
      setError(null)
     }, 1500)
   })
 }

 function HandleReturnPreviousChanges(){
  const options = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(tasklistfirststate)

  }
  fetch(ROOTURL+'/returnchanges', options)
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
    setTaskList(tasksarray)
  })
  .catch(error => {
    setError(error.message)
  })
 }
 

 function HandleReverseAllTasks(){
   const options = {
     method: 'GET',
   }
   fetch(ROOTURL+'/reverseall', options)
   .then(response => {
     if (!response.ok){
       throw new Error('Tasks Could Not Be Reversed!')
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
    setTaskList(tasksarray)
   })
   .catch(error => {
     setError(error.message)
     setTimeout(() => {
      setError(null)
     }, 1500)
   })
 }

 useEffect(() => {
  const numberoftasks = taskslist.length
  let numberofnotcompleted = 0
  for (let i = 0; i < taskslist.length; i++){
   let variable = taskslist[i]
   if (!variable.completed){
     numberofnotcompleted++
   }
  } 
  //numberofnotcompleted = (numberofnotcompleted / 10) * 100
  setPercentageNotCompleted(numberofnotcompleted)
  let numberofcompleted = 0
  for (let i = 0; i < taskslist.length; i++){
   let variable = taskslist[i]
   if (variable.completed){
     numberofcompleted++
   }
  }
  //numberofcompleted = (numberofcompleted / 10) * 100
  setPercentageCompleted(numberofcompleted)
 }, [taskslist])
 
 useEffect(() => {
  let numberoflowpriority = 0
  for (let i = 0; i < taskslist.length; i++){
   let variable = taskslist[i]
   if (variable.priority==='low'){
     numberoflowpriority++
   }
  }
  setNumberLowPriority(numberoflowpriority)
  let numberofmediumpriority = 0
  for (let i = 0; i < taskslist.length; i++){
   let variable = taskslist[i]
   if (variable.priority==='medium'){
     numberofmediumpriority++
   }
  }
  setNumberMediumPriority(numberofmediumpriority)
  let numberofhighpriority = 0
  for (let i = 0; i < taskslist.length; i++){
   let variable = taskslist[i]
   if (variable.priority==='high'){
     numberofhighpriority++
   }
  }
  setNumberHighPriority(numberofhighpriority)
 }, [taskslist])
 
 function SetTaskFavorite(index){
   setShowAlert('Task Added To Favorites!')
   setTimeout(() => {
    setShowAlert(null)
   }, 1500)
   const gettask = taskslist[index]
   const gettitle = gettask.title
   const favorite = true
   const options = {
     method: 'POST',
     headers: {'Content-Type':'application/json'},
     body: JSON.stringify({favorite:favorite, title:gettitle})
   }
   fetch(ROOTURL+'/changefavorite', options)
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
    setTaskList(tasksarray)
   })
   .catch(error => {
     setError(error.message)
     setTimeout(() => {
      setError(null)
     }, 1500)
   })
 }

 function SetTasksUndoFavorite(index){
  setShowAlert('Task Removed From Favorites!')
  setTimeout(() => {
    setShowAlert(null)
   }, 1500)
  const gettask = taskslist[index]
  const gettitle = gettask.title
  const favorite = false
  const options = {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({favorite:favorite, title:gettitle})
  }
  fetch(ROOTURL+'/changefavorite', options)
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
    setTaskList(tasksarray)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
     setError(null)
    }, 1500)
  })
 }

 function ResetAlert(){
   setShowAlert(null)
 }

 useEffect(() => {
  const options1 = {
    method: 'GET',
    //headers: {'Authorization':'Bearer'+' '+token}
  }
  fetch(ROOTURL+'/tasks', options1)
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
      setTaskList(tasksarray)
      setTaskListFirstState(tasksarray)
  })
  .catch(error => {
    setError(error.message)
    setTimeout(() => {
      setError(null)
     }, 1500)
  })
 }, [])

 useEffect(() => {
   const filterarray = taskslist.filter(task => !task.hidden)
   setFilterTasksArray(filterarray)
 }, [taskslist])

// upon mapping in the conditonal render statement either make the task appear completed or not
 const tasklistsee = filtertaskarray.map((task, index) => <li key={index}>
 <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow">      
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-gray-800 font-medium">{task.completed 
              ? <Link className="text-2xl line-through text-gray-500" to={'/tasks/:'+index} state={{title:filtertaskarray[index].title, favorite:filtertaskarray[index].favorite}}>{task.title}</Link>
              : <Link to={'/tasks/:'+index} className="font-bold" state={{title:filtertaskarray[index].title, favorite:filtertaskarray[index].favorite}}>{task.title}</Link>
                }</span>
              {task.priority === 'high' ? <span className="p-2 rounded-lg bg-red-500 font-bold">High</span> : <span></span>}
              {task.priority === 'medium' ? <span className="p-2 rounded-lg bg-orange-500 font-bold">Medium</span> : <span></span>}
              {task.priority === 'low' ? <span className="p-2 rounded-lg bg-green-500 font-bold">Low</span> : <span></span>}
              {task.completed ? <button className="inline-block px-6 py-3 bg-yellow-500 text-black font-semibold text-lg rounded-lg hover:bg-yellow-400 transition-all duration-300"
                onClick={() => HandleRevertTask(index)}>
                  Revert Task!
            </button>: <button className="inline-block px-6 py-2 bg-yellow-500 text-black font-semibold text-lg rounded-lg hover:bg-yellow-400 transition-all duration-300"
                onClick={() => HandleCompletedTask(index)}>
                  Complete Task!
              </button>}
              <button onClick={() => SetDateIndex(index)} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Extend Due Date</button>
              <button onClick={() => SetDecreaseDateIndex(index)} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Decrease Due Date</button>
              {task.favorite ? <button onClick={() => SetTasksUndoFavorite(index)} className="w-12 h-10 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">❄️</button> : <button onClick={() => SetTaskFavorite(index)} className="w-12 h-10 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">❤️</button>}
            {Number(task.duedate) >=0 && Number(task.duedate) <= 10 ? <p className="text-red-600 font-bold">Due In: {task.duedate} Days</p> : <p></p>}
            {Number(task.duedate) >=11 && Number(task.duedate) <= 20 ? <p className="text-orange-600 font-bold">Due In: {task.duedate} Days</p> : <p></p>}
            {Number(task.duedate) >=21 ? <p className="text-green-600 font-bold">Due In: {task.duedate} Days</p> : <p></p>}
            {task.completed && <span className="text-green-500 !important text-2xl ">✔</span>}
            </div>
            <div className="flex items-center space-x-3">
              <button
              onClick={() => HighPriority(index)}
              className="text-red-600 hover:text-red-800 border-2 border-red-500 text-red-500 p-2 font-bold"
              >High
              </button>
              <button
              className="text-orange-600 hover:text-orange-800 border-2 border-orange-500 text-orange-500 p-2 font-bold"
              onClick={() => MediumPriority(index)}
              >
                Medium
              </button>
              <button
              onClick={() => LowPriority(index)}
              className="text-green-600 hover:text-green-800 border-2 border-green-500 text-green-500 p-2 font-bold"
              >
              Low  
              </button>
              <span className="text-gray-800 font-medium">{task.completed
               ?
                 <div>Completed</div>
               :
                 <div>Pending</div>}</span>
              {task.completed ? <div/> : <button
               onClick={() => editTask(index, numberofinputfields)}
               className="text-blue-600 hover:text-blue-800">Edit</button>}
              <button
               onClick={() => DeleteTask(index)}
               className="text-red-600 hover:text-red-800">Delete</button>
            </div>
          </div>
 </div>
 </li>)

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      {/* Page Title */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Your Tasks</h1>
        <p className="text-gray-600 mt-2 font-bold">Manage your daily tasks efficiently</p>
        <input 
         type="text"
         value={searchtaskinput}
         onChange={(e) => HandleInputSearchTask(e)}
         placeholder="Enter First Word Of Task!"
         className="border p-2 rounded"></input>
        <button
          onClick={HandleSubmitSearch}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 mt-6"
        >Search For Tasks!</button>
      </div>

      {/* Task Management Section */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex justify-start">
        <input
          type="text"
          placeholder="Enter task"
          className="border p-2 rounded"
          value={task}
          onChange={(e) => handleCreateTaskInputChange(e)}
        />
        <button
         onClick={HandleSubmit}
         className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Add New Task
        </button>
        {editingId !== undefined ? <>
          <input
         onChange={(e) => handleEditTaskInputChange(e)}
         type='text'
         placeholder="Edit task"
         value={edittaskinput}
         className="border p-2 rounded">
         </input>
         <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
         onClick={handleSubmitEdit}>Edit Task!</button>
         <button className="px-4 py-2 font-bold bg-red-500 border border-red-600 rounded-md hover:bg-red-100" onClick={CloseInputField}>Close Input Field</button>
        </>
         
         :
         <div/>}
          {editingdate ? <>
          <input
           type="text"
           placeholder="Enter Extend Period"
           className="border p-2 rounded"
           value={editdateinput}
           onChange={(e) => HandleEditDateInput(e)}>
          </input>
          <button onClick={HandleDateChange} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Extend Due Date</button>
          <button className="px-4 py-2 font-bold bg-red-500 border border-red-600 rounded-md hover:bg-red-100" onClick={CloseInputField}>Close Input Field</button> </> : <div></div>}
          {editingdatedown && <>
          <input
           type="text"
           placeholder="Enter Decrease Period"
           className="border p-2 rounded"
           value={editdatedowninput}
           onChange={(e) => HandleDecreaseDateInputChange(e)}>
          </input>
          <button onClick={HandleDecreaseDueDate} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Decrease Due Date</button>
          <button className="px-4 py-2 font-bold bg-red-500 border border-red-600 rounded-md hover:bg-red-100" onClick={CloseInputField}>Close Input Field</button></>}
        </div>
        <div className="space-x-4"> {/* these buttons will only be changing the state of the variables in the front-end */}
          <button
           className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-100"
           onClick={AllHighPriority}
          >
          High Priority
          </button>
          <button
           className="px-4 py-2 text-orange-600 border border-orange-600 rounded-md hover:bg-orange-100"
           onClick={AllMediumPriority}
          >
          Medium Priority
          </button>
          <button
           className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-100"
           onClick={AllLowPriority}
          >
          Low Priority
          </button>
          <button
           onClick={AllTasks}
           className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100">
            All
          </button>
          <button
           onClick={Completed}
           className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-100">
            Completed
          </button>
          <button
           onClick={NotCompleted}
           className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-100">
            Pending
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {/* Additional Task Items */}
        {/* You can map through your tasks here */}
      </div>
      {error && (
        <div className="mt-6 max-w-2xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
          <button
          className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-100"
          onClick={ResetError}
          >Close Error</button>
        </div>
       )}
       {showalert && (
        <div className="mt-6 max-w-2xl mx-auto bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-md">
          <p className="font-semibold">Alert:</p>
          <p>{showalert}</p>
          <button
          className="px-4 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-100"
          onClick={ResetAlert}
          >Close Alert</button>
        </div>
       )}
       <ol>{tasklistsee}</ol>
       <div className="w-full flex justify-end p-4 mt-6 mr-6">
          {numberlowpriority != null && numbermediumpriority != null && numberhighpriority != null && <span className="p-2 rounded-lg bg-yellow-500 mr-2">{numberlowpriority}/{numbermediumpriority}/{numberhighpriority}</span>}
          {percentagecompleted != null && percentagenotcompleted != null && <span className="p-2 rounded-lg bg-yellow-500 mr-2">{percentagecompleted}/{percentagenotcompleted}</span>}
          <button onClick={SetAllCompleted} className="p-2 rounded-lg bg-green-500">All Completed</button>
          <button onClick={SetAllPending} className="p-2 rounded-lg bg-red-500 ml-2">All Pending</button>
          <button onClick={HandleDeleteAll} className="p-2 rounded-lg bg-red-500 ml-2">Delete All</button>
          <button onClick={HandleReturnPreviousChanges} className="p-2 rounded-lg bg-blue-500 ml-2">Undo Changes!🪄</button>
          <button onClick={HandleReverseAllTasks} className="p-2 rounded-lg bg-purple-500 ml-2">Reverse All Tasks!🔮</button>
      </div>
    </div>
  );
};

export default TasksList;