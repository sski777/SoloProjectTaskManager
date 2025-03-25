import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();

const route = express.Router()

route.use(express.json())


route.post('/', async (req, res) => {
  try{
    const priority = req.body[0].priority // priority to set
  const task = req.body[0].task.title
  const database = await pool.query("UPDATE tasks SET priority = $1 WHERE title = $2 RETURNING *", [priority, task])
  const database1 = await pool.query('SELECT * FROM tasks')
  res.status(201).json(database1.rows)  
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})

route.put('/timerpage', async (req, res) => {
  try{
    const priority = req.body[0].priority
    const database = await pool.query("UPDATE tasks SET priority = $1", [priority])
    res.status(201).send('Priority Changed!')
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})

export default route