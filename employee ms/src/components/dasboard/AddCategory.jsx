import axios from "axios"
import { useRef } from "react"
import { useState } from "react"

function Addcategory(){
 
    const[category,setcategory]=useState()
    const inputRef=useRef(null)
     
    function handlesubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3000/addcategory',{category})
        .then(result=>{
            console.log(result.data)
        })
        .catch(err=>console.log(err))
    }


    return(
        <>
         <div className="d-flex justify-content-center align-items-center h-75">
            <div className="p-3 w-25 border rounded">
                 <h2>Add category</h2>
                 <form onSubmit={handlesubmit}>
                    <div className="mt-3">
                        <label htmlFor="nme">Add:</label>
                        <input type="text" name="nme" id="nme" autoComplete='off'
                        onChange={(e)=>{setcategory(e.target.value)}}
                        className='form-control rounded-2'/>

                    </div>
                    <button className="btn btn-success mt-2">Add</button>
                 </form>
            </div>
         </div>
        </>
    )
}
export default Addcategory