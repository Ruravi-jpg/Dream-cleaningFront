import authHeader from './auth-header';
import http from "./http";
const API_LOGIN_URL = "/api/gatekeepr/login";


const login = (username, password) => {
    return http
    .post(  API_LOGIN_URL,{
        username,
        password,
    })
    .then(response => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data))
        }

        return response.data;
    })

}

const logout = () =>{
    localStorage.removeItem("user");
}

const getCurrentUser =  () =>{
    const userData = JSON.parse(localStorage.getItem("user"));
    const header = authHeader();
    return http
    .get( API_LOGIN_URL + "/status",  {
        headers:{
            'Authorization' : header
        }
            
    })
    // .then(response => JSON.parse(response))
    .then(response => {
        if(response.data){
            return userData;
        }else{
            return null;
        }
    })
    .catch(error =>{
        console.log(error);
    })
}

const authService = {
    login,
    logout,
    getCurrentUser
}

export default authService;

