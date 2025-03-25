import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();


const route = express.Router()


route.use(express.json())


route.post('/', async (req, res) => {
  const state = req.body.state
  const task = req.body.task.title
  console.log(state)
  try{
    const database = await pool.query('UPDATE tasks SET completed = $1 WHERE title = $2 RETURNING *', [state, task])
    const database1 = await pool.query('SELECT * FROM tasks')
    res.status(201).json(database1.rows)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})




export default route