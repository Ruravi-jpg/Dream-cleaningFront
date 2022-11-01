import React from 'react';
import LoginForm from "../Components/LoginForm/LoginForm"
import authService from '../Services/auth.service';
import Dashboard from './DashBoard';


function Login({user}) {

    const userData = JSON.parse(localStorage.getItem("user"));

    if(userData != null && user){
    //     navigate("/dashboard");
    //   window.location.reload();
        return <Dashboard userData={user}/>;
    }else{
        return <LoginForm/>;
    }
  }
  
  export default Login;