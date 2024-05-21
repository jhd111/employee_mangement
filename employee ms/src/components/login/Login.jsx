import { useState } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login(){
    const [value,setvalue]=useState({
        email:'',
        password:''

    })

    const[error,seterror]=useState(null)

    const navigate=useNavigate()

    axios.defaults.withCredentials=true
      function handlesubmit(e){
            e.preventDefault()
            axios.post('http://localhost:3000/admin',value)
            .then(result=>{
                if(result.data.loginstatus){
                    navigate('/dasboard')
                }
                else{
                    seterror(result.data.Eoor)
                }
            })
            .catch(err=>{console.log(err)})
      }
    return(
        <div className="d-flex justify-content-center align-items-center vh-100 loginpage">
            <div className='p-3 border rounded w-25 loginform'>
                <div className='text-warning'>
                    <p>{error&&error}</p>
                </div>
            <h1>Login Form</h1> 
            <form onSubmit={handlesubmit}>
                <div className='mb-3'>
               <label htmlFor="username">Username:</label>
               <input type="email" id="username" autoComplete='off'
               onChange={(e)=>{setvalue({...value,email:e.target.value})}} 
               className='form-control rounded-2'/>
               </div>
               <div className='mb-3'>
               <label htmlFor="password">Password:</label>
               <input type="password" id="password" autoComplete='off'
               onChange={(e)=>{setvalue({...value,password:e.target.value})}}
               className='form-control rounded-2'/>
               </div>
               <button className='btn btn-success w-100 rounded-2 '>submit</button>
               <div className='mb-1'>
                <input type="checkbox" name="tick" id="tick" className='me-2'/>
                <label htmlFor="tick">You agreed with terms & conditions</label>
               </div>
            </form>
        </div>
        </div>
    )
}
export default Login