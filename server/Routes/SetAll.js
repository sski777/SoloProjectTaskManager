import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();

const route = express.Router()


route.use(express.json())


route.post('/', async (req, res) => {
   try{
    const state = req.body[0].state
    const update = await pool.query('UPDATE tasks SET completed = $1', [state])
    const database = await pool.query('SELECT * FROM tasks')
    const everything = database.rows
    const tasksarray = []
      for (let i = 0; i < everything.length; i++){
        let variable = everything[i]
        if (variable.priority==='high'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < everything.length; i++){
        let variable = everything[i]
        if (variable.priority==='medium'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < everything.length; i++){
        let variable = everything[i]
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