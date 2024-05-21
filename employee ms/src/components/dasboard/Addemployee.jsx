import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"

function AddEmployee() {

    const [employee, setemployee] = useState({
        name: "",
        email: "",
        password: "",
        salary: "",
        address: "",
        category_id: "",
        image: "",
    })

    const [category, setcategory] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/category')
            .then(result => {
                if (result.data.status) {
                    setcategory(result.data.Result)
                }
                else {
                    alert(result.data.Error)
                }
            })
            .catch(err => { console.log(err) })
    }, [])

    function handlesubmit(e){

        const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);


        e.preventDefault()
        axios.post('http://localhost:3000/addemployee',formData)
        .then(result=>{
            console.log(result.data)})
        .catch(err=>console.log(err))
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center ">
                <div className="p-3 w-50 border rounded">
                    <h2>Add Employee</h2>
                    <form onSubmit={handlesubmit} encType="multipart/form-data">
                        <div className="col-12">
                            <label htmlFor="inputName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputName"
                                onChange={(e) => { setemployee({ ...employee, name: e.target.value }) }}
                                placeholder="Enter Name"

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
                                onChange={(e) => { setemployee({ ...employee, email: e.target.value }) }}
                                placeholder="Enter email"

                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputpassword" className="form-label">
                                Password
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputpassword"
                                onChange={(e) => { setemployee({ ...employee, password: e.target.value }) }}
                                placeholder="Enter Password"

                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputsalary" className="form-label">
                                Salary
                            </label>
                            <input
                                type="text"
                                className="form-control rounded-0"
                                id="inputsalary"
                                onChange={(e) => { setemployee({ ...employee, salary: e.target.value }) }}
                                placeholder="Enter Salary"

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
                                onChange={(e) => { setemployee({ ...employee, address: e.target.value }) }}
                                placeholder="Enter Address"

                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="categoryid" className="form-label">
                                Category
                            </label>
                            <select name="categoryid" id="categoryid" className="form-select"
                                onChange={(e) => { setemployee({ ...employee, category_id: e.target.value }) }}
                                // onChange={(e) => {
                                //     const categoryId = e.target.value === 'undefined' ? undefined : e.target.value;
                                //     setemployee({ ...employee, categoryid: categoryId });
                                //   }}
                                
                                >
                                {
                                    category.map(value => {
                                        return <option key={value.id} value={value.id}>{value.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-12 mb-3">
                            <label className="form-label" htmlFor="inputGroupFile01">
                                Select Image
                            </label>
                            <input
                                type="file"
                                className="form-control rounded-0"
                                id="inputGroupFile01"
                                name="image"
                                onChange={(e) => setemployee({ ...employee, image: e.target.files[0] })}
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <button type="submit" className="btn btn-primary w-100" >
                                Add Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default AddEmployee