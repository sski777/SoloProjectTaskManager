import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();



const route = express.Router()



route.use(express.json())


route.post('/', async (req, res) => {
  const tasksarray = req.body
  const query = `INSERT INTO tasks (title, completed, priority, duedate, favorite) VALUES ($1, $2, $3, $4, $5)`;
  const cleartable = await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY')
  for (let i = 0; i < tasksarray.length; i++){
    let variable = tasksarray[i]
    let title = variable.title
    let completed = variable.completed
    let priority = variable.priority
    let duedate = variable.duedate
    let favorite = variable.favorite
    await pool.query(query, [title, completed, priority, duedate, favorite])
  }
  const geteverything = await pool.query('SELECT * FROM tasks')
  res.status(201).json(geteverything.rows)  
})




export default route