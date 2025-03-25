import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();



const route = express.Router()



route.use(express.json())



route.post('/', async (req, res) => {
   try{
     const state = req.body.state
     const update = await pool.query('UPDATE tasks SET completed = $1', [state])
     res.status(201).send('State Has Been Sucessfully Updated!')
   }
   catch(error){
     res.status(400).json({error:error.message})
   }
})



export default route