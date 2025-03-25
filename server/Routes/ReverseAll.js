import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();


const route = express.Router()


route.use(express.json())


route.get('/', async (req, res) => {
  try{
    const updatedatabase = await pool.query("UPDATE tasks SET title = reverse(title)") // we are using the reverse() psql method
    const database = await pool.query('SELECT * FROM tasks')
    res.status(201).json(database.rows)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})


export default route