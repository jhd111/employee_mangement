
import express, { query } from 'express'
import jwt from 'jsonwebtoken'
import con from '../utils/db.js'
import bcrypt, { hash } from 'bcrypt'
import multer from "multer";
import path from "path";


const router=express.Router()

router.post('/admin',(req,res)=>{
    const sql="select * from admin where email=? and password=?"
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({loginstatus:false,Error:'query error'})
        if(result.length>0){
            const email=result[0].email
            const token =jwt.sign(
                {
                    role:"admin",email:email
                },
                "jwt_whatever",
                {
                    expiresIn:"1d"
                }
                )
                res.cookie("token",token)
                return res.json({loginstatus:true})
        }
        else{
            return res.json({loginstatus:false, Eoor:"wrong password or email"})
        }
    })
})

router.get('/category',(req,res)=>{
    const sql='select * from addcategory'
    con.query(sql,(err,result)=>{
        if(err) return res.json({status:false,Error:"query error"})
        return res.json({status:true,Result:result})
    })
})

router.post('/addcategory',(req,res)=>{
    const sql='insert into addcategory (`name`) values (?)'
    con.query(sql,[req.body.category],(err,result)=>{
      if(err)
      {
        return res.json({status:false,Error:"query error"})

      }
      return res.json({status:true})
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

router.post('/addemployee',upload.single('image'),(req,res)=>{
    const sql=`insert into employee ( name, email, password, salary, address,image, categoryid)  values (?,?,?,?,?,?,?)`
    bcrypt.hash(req.body.password,(10),(err,hash)=>{


        const values=[
            req.body.name,
            req.body.email,
            hash,
           req.body.salary, 
            req.body.address,
            req.file.filename,
            req.body.category_id
        ]
        console.log('Request Body:', req.body);
        con.query(sql,values,(err,result)=>{
            if(err)
            {   console.error('Error executing SQL:', err);
                return res.status(500).json({status:false,Error:'query error'})
            }
            return res.status(200).json({status:true})
        })
    })
})

router.get('/employee',(req,res)=>{
    const sql='select * from employee'
    con.query(sql,(err,result)=>{
        if(err){
            return res.json({status:false,Error:"query error"})
        }
        return res.json({status:true,Result:result})
    })
})

router.get('/editemployee/:id',(req,res)=>{
    const id=req.params.id
    // console.log('id ' +id)
    const sql ='select * from employee where id = ?'
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({status:false,Error:" Query error"})
        return res.json({status:true,Result:result})
    })
})

router.put('/updateemployee/:id',(req,res)=>{
    const id=req.params.id
    // const sql=`update employee set name = ?, email = ?, salary = ?, address = ?, categoryid = ? 
    // Where id = ?`
    const sql = `UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, categoryid = ? WHERE id = ?` 
   const values=[
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.categoryid,
   ]
   console.log(values)
   con.query(sql,[...values,id],(err,result)=>{
    if(err) return res.json({status:false,Error:"query error"+ err})
    return res.json({status:true,Result:result})
   })

})

router.delete('/deleterecord/:id',(req,res)=>{
    const id=req.params.id
    const sql='delete from employee where id=?'
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({status:false,Error:'error'+err})
        return res.json({status:true,Result:result})
    })
})

router.get('/admincount',(req,res)=>{
    const sql='select count(id) as admin from admin'
    con.query(sql,(err,result)=>{
        if(err) return res.json({status:false,Error:'error'+err})
        return res.json({status:true,Result:result})
    })
})

router.get('/employeecount',(req,res)=>{
    const sql='select count(id) as employe from employee'
    con.query(sql,(err,result)=>{
        if(err) return res.json({status:false,Result:result})
        return res.json({status:true,Result:result})
    })
})

router.get('/salarycount',(req,res)=>{
    const sql='select sum(salary) as salarry from employee'
    con.query(sql,(err,result)=>{
        if(err) return res.json({status:false,Result:result})
        return res.json({status:true,Result:result})
    })
})

router.get('/adminrecords', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logoutt',(req,res)=>{
    res.clearCookie('token')
    return res.json({status:true})
})

export {router as admin}