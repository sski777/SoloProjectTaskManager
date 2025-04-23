import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();


const route = express.Router()


route.use(express.json())

route.post('/', async (req, res) => {
  try{
    const tasktitle = req.body.tasktitle
    const category = req.body.category
    const update = await pool.query('UPDATE tasks SET category = $1 WHERE title = $2', [category, tasktitle])
    const gettable = await pool.query('SELECT * FROM tasks')
    console.log('hey')
    res.status(201).json(gettable.rows)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})


export default route