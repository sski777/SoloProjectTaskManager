import pool from '../db.js'
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();


const route = express.Router()

route.use(express.json())


route.post('/', async (req, res) => {
  try{
  const firstword = req.body.search
  const database = await pool.query('SELECT * FROM tasks')
  const everything = database.rows
  const arraytasksofinterest = []
  for (let i = 0; i < everything.length; i++){
    let variable = everything[i]
    let tasktitle = variable.title.toLowerCase()
    const arrayofwords = tasktitle.split(' ')
    if (arrayofwords[0]===firstword){
      arraytasksofinterest.push(variable) 
    }
  }
  const tasksarray = []
      for (let i = 0; i < arraytasksofinterest.length; i++){
        let variable = arraytasksofinterest[i]
        if (variable.priority==='high'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < arraytasksofinterest.length; i++){
        let variable = arraytasksofinterest[i]
        if (variable.priority==='medium'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < arraytasksofinterest.length; i++){
        let variable = arraytasksofinterest[i]
        if (variable.priority==='low'){
          tasksarray.push(variable)
        }
    }
  res.status(200).json(tasksarray)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})



export default route