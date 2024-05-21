import mysql2 from 'mysql2'

const con=mysql2.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'employeems',
    port:"3306"
})

con.connect(function(err){
    if(err){
      console.log(err)  
    }
    else{
        console.log('connected ')
    }
})
export default con