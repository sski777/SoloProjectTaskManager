import pool from '../db.js'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config();

const route = express.Router();


route.use(express.json())


route.post('/:id', async (req, res) => {
   try{
     const getpriority = req.body.priority
     const titleoftask = req.body.tasktitle
     const database = await pool.query("UPDATE tasks SET priority = $1 WHERE title = $2 RETURNING *", [getpriority, titleoftask])
     res.status(201).send('Task Priority Has Been Updated!')
   }
   catch(error){
     res.status(400).json({error:error.message})
   }
})



export default route
