import pool from '../db.js'
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();



const route = express.Router()





route.use(express.json())


route.get('/', async (req, res) => {
  const geteverything = await pool.query('SELECT * FROM tasks')
  res.status(200).json(geteverything.rows)  
})


route.post('/', async (req, res) => {
   const favoritestate = req.body.favorite
   const tasktitle = req.body.title
   const updatetable = await pool.query("UPDATE tasks SET favorite = $1 WHERE title = $2 RETURNING *", [favoritestate, tasktitle])
   const geteverything = await pool.query('SELECT * FROM tasks')
   res.status(201).json(geteverything.rows)
})


export default route