import pool from '../db.js'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()


const route = express.Router()



route.use(express.json())


route.post('/', async (req, res) => {
   try{
    const getemail = req.body.email
    console.log(getemail)
    const addentry = await pool.query('INSERT INTO emails (email) VALUES ($1)', [getemail]);
    const gettable = await pool.query('SELECT * FROM emails');
    let array = gettable.rows
    let countcheck = 0
    for (let i = 0; i < array.length; i++){
      let variable = array[i]
      if (variable.email===getemail){
         countcheck++
      }
    }
    if (countcheck>0){
     res.status(400).json({error:'Email Already Exists!'})
     return
    }
    res.status(201).json({message:'Email Added'})
    return
   }
   catch(error){
     res.status(400).json({error:error.message})
   }
})


export default route