import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'


dotenv.config();


const route = express.Router()


route.use(express.json())


route.get('/', async (req, res) => {
  try{
    const database = await pool.query('SELECT * FROM tasks')
    let countcompleted = 0
    let countpending = 0
    for (let i = 0; i < database.rows.length; i++){
      let variable = database.rows[i]
      if (variable.completed===true){
        countcompleted++
      }
      else if (variable.completed===false){
        countpending++
      }
    }
    console.log(countcompleted)
    console.log(countpending)
    res.status(200).json({completed:countcompleted, pending:countpending})
  }
  catch(error){
    res.status(400).json({error:error.message})
  }  
})



export default route