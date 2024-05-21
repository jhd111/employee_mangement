import Login from "./components/login/Login"
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter,
  Routes, Route
} from "react-router-dom";
import Dasboard from "./components/dasboard/Dashboard";
import Home from "./components/dasboard/Home";
import Category from "./components/dasboard/Category";
import Emoployee from "./components/dasboard/Employee";
import Profile from "./components/dasboard/Profile";
import Addcategory from "./components/dasboard/AddCategory";
import AddEmployee from "./components/dasboard/Addemployee";
import EditEmployee from "./components/dasboard/EditEmployee";
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/admin" element={<Login/>}/>
    <Route path="/dasboard" element={<Dasboard/>}>

    <Route path="" element={<Home/>}></Route>

    <Route path="/dasboard/category" element={<Category/>}></Route>

    
    <Route path="/dasboard/employee" element={<Emoployee/>}></Route>

    <Route path="/dasboard/profile" element={<Profile/>}></Route>
    
    <Route path="/dasboard/addcategory" element={<Addcategory/>}></Route>

    <Route path="/dasboard/addemployee" element={<AddEmployee/>}></Route>
     
     <Route path="/dasboard/editemployee/:id" element={<EditEmployee/>}></Route>

    </Route>
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
