import pool from "../db.js";
import dotenv from 'dotenv'
import express from 'express'



dotenv.config();




const route = express.Router()



route.use(express.json())


route.post('/', async (req, res) => {
  try{
    const gettitle = req.body.tasktitle
    const getfavoritestate = req.body.hiddenstate
    console.log(getfavoritestate)
    const update = await pool.query('UPDATE tasks SET hidden = $1 WHERE title = $2 RETURNING *', [getfavoritestate, gettitle])
    console.log(update.rows)
    res.status(201).json({see:getfavoritestate})
  }
  catch(error){
    res.status(400).json({error:error.message})
  }
})



export default route