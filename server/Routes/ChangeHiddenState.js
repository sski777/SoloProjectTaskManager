import pool from '../db.js'
import dotenv from 'dotenv'
import express from 'express'



dotenv.config();



const route = express.Router()

route.use(express.json())

route.get('/getall', async (req, res) => {
  try{
    const gettable = await pool.query('SELECT * FROM tasks')
    res.status(200).json(gettable.rows)
  }
  catch(error){
    res.status(400).json({error:error.message})
  } 
})


route.post('/', async (req, res) => {
   try{
     const gethiddenstate = req.body.hiddenstate
     console.log(gethiddenstate)
     const gettitle = req.body.title
     const updatetable = await pool.query('UPDATE tasks SET hidden = $1 WHERE title = $2', [gethiddenstate, gettitle])
     const gettable = await pool.query('SELECT * FROM tasks')
     res.status(201).json(gettable.rows)
   }
   catch(error){
     res.status(400).json({error:error.message})
   } 
})


route.post('/deletehidden', async (req, res) => {
   try{
     const gettitle = req.body.title
     const updatetable = await pool.query('DELETE FROM tasks WHERE title = $1', [gettitle])
     const gettable = await pool.query('SELECT * FROM tasks')
     res.status(201).json(gettable.rows)
   }
   catch(error){
     res.status(400).json({error:error.message})
   }
})

export default route