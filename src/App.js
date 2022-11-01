import {BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import Home from"./Pages/Home.js";
import Login from "./Pages/Login.js";
import Dashboard from "./Pages/DashBoard.js";
import AddEmployee from "./Pages/AddEmployee.js";
import EmployeeViewList from "./Pages/EmployeeViewList.js";
import SelectTable from "./Pages/SelectTable.js";
import authService from "./Services/auth.service.js";
import PortectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
let [currentUser, setCurrentUser] = useState(null);
  


useEffect(() =>{
  authService.getCurrentUser()
  .then(res =>{
    setCurrentUser(res);
    console.log(res);
  })
  .catch(err =>{
    console.log(err);
  })

}, []);

// const logout = () => {
//   authService.logout();
// }

  return (
<Router>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={ <Login user={currentUser} />  }></Route>
    <Route element = {<PortectedRoute Token={currentUser}/>}>
      <Route path="/dashboard"  element={ <Dashboard userData={currentUser}/> }></Route>
      <Route path="/register" element={ <AddEmployee user={currentUser} /> }></Route>
      <Route path="/employees" element={ <EmployeeViewList user ={currentUser} /> }></Route>
      <Route path="/tableDashboard" element={<SelectTable userData = {currentUser} />}></Route>
    </Route>
    
  </Routes>
</Router>
  );
}

export default App;
