import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"

function Home(){
    const[admin,setadmin]=useState(0)
    const[employee,setemployee]=useState()
    const[salary,setsalary]=useState()
    const [admindetail,setadmindetail]=useState([])

    useEffect(()=>{
        adminfun()
        Totalemployee()
        totalsalary()
        AdminRecords()
    },[])
    function adminfun(){
        axios.get('http://localhost:3000/admincount')
        .then(result=>{
            if(result.data.status)
            {
                setadmin(result.data.Result[0].admin)
            } 
        })
        .catch(error => {
            // Handle API call failure
            console.error("Error fetching admin count:", error)
            
        })
        
    }

    function Totalemployee(){
        axios.get("http://localhost:3000/employeecount")
        .then(result=>{
            if(result.data.status){
                setemployee(result.data.Result[0].employe)
            }
        })
    }

    function totalsalary(){
        axios.get('http://localhost:3000/salarycount')
        .then(result=>{
            if(result.data.status)
            {
                setsalary(result.data.Result[0].salarry)
            }
        })
    }
    
    const AdminRecords = () => {
        axios.get('http://localhost:3000/adminrecords')
        .then(result => {
          if(result.data.Status) {
            setadmindetail(result.data.Result)
          } else {
             alert(result.data.Error)
          }
        })
      }

    return(
        <div>
        <div className='p-3 d-flex justify-content-around mt-3'>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Admin</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{admin}</h5>
            </div>
          </div>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Employee</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>{employee}</h5>
            </div>
          </div>
          <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
            <div className='text-center pb-1'>
              <h4>Salary</h4>
            </div>
            <hr />
            <div className='d-flex justify-content-between'>
              <h5>Total:</h5>
              <h5>${salary}</h5>
            </div>
          </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
          <h3>List of Admins</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                admindetail.map(a => 
                    {
                return ( 
                <tr key={a.id}>
                    <td>{a.email}</td>
                    <td>
                    <button
                      className="btn btn-info btn-sm me-2">
                      Edit
                    </button>
                    <button
                      className="btn btn-warning btn-sm" >
                      Delete
                    </button>
                    </td>
                  </tr>
                  )
                    }
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    
    )
}

export default Home