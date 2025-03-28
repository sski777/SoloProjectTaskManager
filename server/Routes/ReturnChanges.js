import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();



const route = express.Router()



route.use(express.json())


route.post('/', async (req, res) => {
  try{
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
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})

route.post('/taskid', async (req, res) => {
  try{
    const state = req.body.state
    const title = req.body.tasktitle
    const updatetable = await pool.query('UPDATE tasks SET completed = $1 WHERE title = $2 RETURNING *', [state, title])
    const table = await pool.query('SELECT * FROM tasks')
    console.log('The List Of Users!', table.rows)
    res.status(201).send('State Sucessfully Updated!')
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})


export default route