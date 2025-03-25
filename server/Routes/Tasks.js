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

route.get('/:id', async (req, res) => {
  try{
    const id = Number(req.params.id.slice(1))
    const database = await pool.query('SELECT * FROM tasks')
    const everything = database.rows
    const tasksarray = []
      for (let i = 0; i < everything.length; i++){
        let variable = everything[i]
        if (variable.priority==='high'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < everything.length; i++){
        let variable = everything[i]
        if (variable.priority==='medium'){
          tasksarray.push(variable)
        }
      }
      for (let i = 0; i < everything.length; i++){
        let variable = everything[i]
        if (variable.priority==='low'){
          tasksarray.push(variable)
        }
      }
    if (id===0){
      return res.status(200).json([tasksarray[id]])
    }
    else{
      let gettask = tasksarray[id]
      console.log(gettask)
      if (gettask===undefined){ // task does not exist
        return res.status(400).json({error:'Task Does Not Exist!'})
      }
      else{
        return res.status(200).json([gettask])
      }
    }
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