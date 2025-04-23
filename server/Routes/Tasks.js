import pool from '../db.js'
import dotenv from 'dotenv'
import e from 'express';
import express from 'express'
dotenv.config();


const route = express.Router()

route.use(express.json())

route.get('/', async (req, res) => {
  try{
    const database = await pool.query('SELECT * FROM tasks')
    res.status(200).json(database.rows)
  }
  catch(error){
    res.status(400).json(({error:error.message}))
  }
})

route.post('/', async (req, res) => {
  try{
    const task = req.body[0] // this is a string
    console.log(task)
    const database = await pool.query('SELECT * FROM tasks')
    const everythingbefore = database.rows
    let countvalid = 0
    for (let i = 0; i < everythingbefore.length; i++){
      let variable = everythingbefore[i]
      if (variable.title===task){
        countvalid++
      }
    }
    if (countvalid===0){
      const database1 = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *',
      [task])
      res.status(201).json(everythingbefore.concat(database1.rows))
    }
    else{
      res.status(400).json({error:'Task Already Exists!'})
    }
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})

route.post('/updatedynamic', async (req, res) => {
  try{
    const title = req.body.tasktitle
    const table = await pool.query('SELECT * FROM tasks')
    const task = []
    for (let i = 0; i < table.rows.length; i++){
      let variable = table.rows[i]
      if (variable.title===title){
        task.push(variable)
      }
    }
    res.status(200).json(task)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})



route.delete('/:see', async (req, res) => {
  try{
    const getid = Number(req.params.see.slice(1))
    const task = req.body.title
    const database = await pool.query("DELETE FROM tasks WHERE title = $1 RETURNING *", [task])
    const database1 = await pool.query('SELECT * FROM tasks')
    const currentarray = database1.rows
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
    res.status(200).json(tasksarray)
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})

export default route