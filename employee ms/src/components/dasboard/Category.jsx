import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"


function Category(){
 
    const [category,setcategory]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/category')
        .then(result=>{
            if(result.data.status){
            setcategory(result.data.Result)
            }
            else{
                alert(result.data.Error)
            }
        })
        .catch(err=>{console.log(err)})
    },[])

    return(
        <div className="px-2 mt-3"> 
        <div className="d-flex justify-content-center">
            <h1>Add Category</h1>
            </div>
            <div>
                <Link to='/dasboard/addcategory' className="btn btn-success">Add Category</Link>
            </div>
            <div className="mt-2">
               <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        category.map((value=>
                           <tr key={value.id}>
                            <td >{value.name}</td>
                           </tr>
                            
                            
                        )
                        )
}
                </tbody>
               </table>
               </div>
        </div>
    )
}
export default Category