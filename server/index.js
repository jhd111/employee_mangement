import express  from "express";

const app=express()
import cors from 'cors'
import {admin} from './Routes/AdminRoute.js'

app.use(cors(
    {
        origin:["http://localhost:5173"],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
     }
))
app.use(express.json())
app.use('/',admin)
app.use(express.static('public'))
app.listen(3000,()=>{
console.log(`server is running at ${3000}`  )
}
)