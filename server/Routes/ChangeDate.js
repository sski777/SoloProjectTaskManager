import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();


const route = express.Router()

route.use(express.json())

route.post('/', async (req, res) => {
   try{
    const datetoextend = Number(req.body[0].extend)
    const currentduedate = Number(req.body[0].task.duedate)
    const newduedate = currentduedate + datetoextend
    console.log(currentduedate)
    const task = req.body[0].task.title
    const result = await pool.query("UPDATE tasks SET duedate = $1 WHERE title = $2 RETURNING *", [newduedate, task])
    const database = await pool.query('SELECT * FROM tasks')
    console.log(database.rows)
    res.status(201).json(database.rows)
   }
   catch(error){
     res.status(400).json({error:error.message})
   }
})

route.post('/decrease', async (req, res) => {
   try{
     const datetodecrease = Number(req.body.decrease)
     const currentduedate = Number(req.body.task.duedate)
     const newduedate = currentduedate - datetodecrease
     const tasktitle = req.body.task.title
     const update = await pool.query("UPDATE tasks SET duedate = $1 WHERE title = $2 RETURNING *", [newduedate, tasktitle])
     const databaseresult = await pool.query('SELECT * FROM tasks')
     const currentarray = databaseresult.rows
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