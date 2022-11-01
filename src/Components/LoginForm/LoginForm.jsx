import { useState } from "react";
import styles from "./login.module.css";
import {useNavigate} from 'react-router-dom';
import AuthService from '../../Services/auth.service';



const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    await AuthService.login(username, password);
    navigate("/dashboard");
    window.location.reload();
  }

    //set body style
    document.body.className = styles.body;
    return ( 
      <>
          <div className="row">
          <div className="col-4" />
          <div className="col-4">
            <form className={styles.login} id="loginForm" onSubmit={handleSubmit}>
              <input
                name = "Username"
                placeholder="Username"
                id = "username"
                type = "text"
                onChange = {(e) => setUserName(e.target.value)}
                required
               />

               <input
                name = "Password"
                placeholder="Password"
                id = "password"
                type = "password"
                onChange = {(e) => setPassword(e.target.value)}
                required
               />
              <button
              id="submitLogin" 
              >
              Login
              </button>
            </form>
          </div>
          <div className="col-4" />
        </div>
      </>
     );

     
  }
  export default Login;