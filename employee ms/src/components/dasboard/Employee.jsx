import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import './employee.css'

function Emoployee() {

  // const{id}=useParams()

  const [employee, setemployee] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/employee')
      .then(result => {
        if (result.data.status) {
          setemployee(result.data.Result)

        }
        else {
          alert(result.data.Error)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

function handledelete(id){
    
     axios.delete(`http://localhost:3000/deleterecord/${id}`)
     .then(result=> 
      {
        if(result.data.status)
        {
          window.location.reload()
        }
        else{
          alert(result.data.Error)
        }
      })
}
  return (
    <div className="mt-3 px-3">
      <div className="d-flex justify-content-center align-items-center">
        Employee list
      </div>
      <div className="mt-3">
        <Link to='/dasboard/addemployee' className="btn btn-success" >Add Employee</Link>
      </div>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Image</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {
              employee.map(value => (

                <tr key={value.id}>
                  <td>{value.name}</td>
                  <td>{value.email}</td>
                  <td><img src={`http://localhost:3000/images/` + value.image} className='imgwidth'></img></td>
                  <td>{value.address}</td>
                  <td>{value.salary}</td>
                  <td>
                  
                    
                    <Link to={'/dasboard/editemployee/'+value.id} className="btn btn-info btn-sm me-2">edit</Link>
                      
                    <button className="btn btn-warning btn-sm" onClick={()=>{handledelete(value.id)}}>delete</button>
                  </td>
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
export default Emoployee