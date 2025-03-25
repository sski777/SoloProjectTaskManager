import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();



const route = express.Router()


route.use(express.json())


route.post('/', async (req, res) => {
  try{
  const task = req.body[0].task // use this title to match task in table
  const updatedTaskTitle = req.body[0].newtask // this is the task to update with
  const database = await pool.query('SELECT * FROM tasks')
  for (let i = 0; i < database.rows.length; i++){
    let variable = database.rows[i]
    if (variable.title===updatedTaskTitle){
      return res.status(400).json({error:'task already exists!'})
    }
  }
  const databasesee = await pool.query('SELECT * FROM tasks')
  let indextoremember = null
  for (let i = 0; i < databasesee.rows.length; i++){
    let variable = databasesee.rows[i]
    if (variable.title===task.title){
      indextoremember = i
    }
  }
  const result = await pool.query("UPDATE tasks SET title = $2 WHERE id = $1 RETURNING *", [task.id, updatedTaskTitle])
  const database1 = await pool.query('SELECT * FROM tasks')
  const currentarray = database1.rows
  const tasksarray = []
      for (let i = 0; i < currentarray.length; i++){
        let variable = currentarray[i]
        if (variable.priority==='high'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < currentarray.length; i++){
        let variable = currentarray[i]
        if (variable.priority==='medium'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < currentarray.length; i++){
        let variable = currentarray[i]
        if (variable.priority==='low'){
          tasksarray.push(variable)
        }
      }
     res.status(201).json(tasksarray)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})



export default route