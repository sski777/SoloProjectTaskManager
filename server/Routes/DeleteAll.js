import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();


const route = express.Router()


route.use(express.json())


route.get('/', async (req, res) => {
  try{
    const edittable = await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY')
    res.status(201).json([])
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})


export default route