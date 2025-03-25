import pool from '../db.js'
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();


const route = express.Router()



route.use(express.json())


route.post('/', async (req, res) => {
  try{
    const favoritestate = req.body.favorite
    const updatetable = await pool.query('UPDATE tasks SET favorite = $1 RETURNING *', [favoritestate])
    res.status(201).send('State Sucessfully Updated!')
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})

route.post('/delete', async (req, res) => {
  try{
    const tasktitle = req.body.tasktitle
    const favoritestate = false
    const updatetable = await pool.query('UPDATE tasks SET favorite = $1 WHERE title = $2 RETURNING *', [favoritestate, tasktitle])
    const database = await pool.query('SELECT * FROM tasks')
    res.status(201).json(database.rows)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})

route.post('/:id', async (req, res) => {
  try{
    const getindex = Number(req.params.id.slice(1))
    const gettable = await pool.query('SELECT * FROM tasks')
    const everything = gettable.rows
    const whatwasdeleted = everything.splice(getindex,1)
    const newtasksarray = whatwasdeleted.concat(everything)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})


export default route