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
import AddProperty from "./Pages/AdddProperty.js";
import PropertiesViewList from "./Pages/PropertyViewList.js";
import AboutUsPage from "./Pages/AboutUsPage.js";
import AssignWorkPage from "./Pages/AssignWork.js";
import ListAsignedWorkEmployee from "./Components/LIstAsignedHouses/ListAsignedWorkEmployee.jsx";

function App() {
let [currentUser, setCurrentUser] = useState(null);
  


useEffect(() =>{
  authService.getCurrentUser()
  .then(res =>{
    setCurrentUser(res);
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
    <Route path="/aboutus" element={<AboutUsPage/>}/>
    <Route path="/login" element={ <Login user={currentUser} />  }></Route>
    <Route element = {<PortectedRoute Token={currentUser}/>}>
      <Route path="/dashboard"  element={ <Dashboard userData={currentUser}/> }></Route>
      <Route path="/register" element={ <AddEmployee user={currentUser} /> }></Route>
      <Route path="/register-property" element={ <AddProperty user={currentUser} /> }></Route>
      <Route path="/employees" element={ <EmployeeViewList user ={currentUser} /> }></Route>
      <Route path="/properties" element={ <PropertiesViewList user ={currentUser} /> }></Route>
      <Route path="/tableDashboard" element={<SelectTable userData = {currentUser} />}></Route>
      <Route path="/assignwork" element={<AssignWorkPage userData = {currentUser} />}></Route>
      <Route path="/asignedWorkEmployee" element={<ListAsignedWorkEmployee userData = {currentUser}></ListAsignedWorkEmployee>}></Route>
    </Route>
    
  </Routes>
</Router>
  );
}

export default App;
