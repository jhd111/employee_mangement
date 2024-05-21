import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function EditEmployee() {
    const { id } = useParams()

    const [employee, setemployee] = useState({
        name: '',
        email: '',
        salary: '',
        address: '',
        categoryid: '',
    })

    const navigate = useNavigate()

    const [category, setcategory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/category')
            .then(result => {
                if (result.data.status) {
                    setcategory(result.data.Result)
                }
                else {
                    alert(result.data.result)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/editemployee/${id}`)
            .then(result => {

                console.log(result.data)

                setemployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    email: result.data.Result[0].email,
                    address: result.data.Result[0].address,
                    salary: result.data.Result[0].salary,
                    categoryid: result.data.Result[0].categoryid,
                })


            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    function handlesubmit(e) {
        e.preventDefault()
        axios.put(`http://localhost:3000/updateemployee/${id}`, employee)
            .then(result => {
                console.log(result.data)
                if (result.data.status) {
                    navigate('/dasboard/employee')
                }
                else {
                    alert(result.data.Error)
                }
            }).catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="d-flex justify-content-center align-items-center ">
                <div className="p-3 w-50 border rounded">
                    <h2>Edit Employee</h2>
                    <form onSubmit={handlesubmit}>
                        <div className="col-12">
                            <label htmlFor="inputName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputName"
                                value={employee.name}

                                onChange={(e) => setemployee({ ...employee, name: e.target.value })}

                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputemail" className="form-label">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="form-control rounded-0"
                                id="inputemail"
                                value={employee.email}
                                placeholder="Enter email"
                                onChange={(e) => setemployee({ ...employee, email: e.target.value })}

                            />
                        </div>
                        {/* <div className="col-12">
                            <label htmlFor="inputpassword" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputpassword"
                                placeholder="Enter Password"

                            />
                        </div> */}
                        <div className="col-12">
                            <label htmlFor="inputsalary" className="form-label">
                                Salary
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputsalary"
                                placeholder="Enter Salary"
                                value={employee.salary}
                                onChange={(e) => setemployee({ ...employee, salary: e.target.value })}

                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputaddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputaddress"
                                placeholder="Enter Address"
                                value={employee.address}
                                onChange={(e) => setemployee({ ...employee, address: e.target.value })}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="categoryid" className="form-label">
                                Category
                            </label>
                            <select
                                name="categoryid"
                                id="categoryid"
                                className="form-select"
                                value={employee.categoryid}
                                onChange={(e) => setemployee({ ...employee, categoryid: e.target.value })}
                            >
                                {category.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-primary w-100" >
                                Edit Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default EditEmployee