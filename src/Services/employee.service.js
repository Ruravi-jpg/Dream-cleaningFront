import authHeader from './auth-header';
import http from "./http";
const API_EMPLOYEE_URL = "/api/castle/employees";

const post = (EmployeeCreateModel) =>{
    return http
    .post(API_EMPLOYEE_URL,
        EmployeeCreateModel,
        {
            headers:{
                'Authorization' : authHeader(),
            }
        })
        .then(response =>{
            if(response.status === 201){
                return true;
            }
        })
        .catch(error =>{
            console.log(error);
        })
}

const put = async(EmployeeUpdateModel, employeeId) => {
    return await http
    .put(API_EMPLOYEE_URL + "/" + employeeId,
    EmployeeUpdateModel,
        {
            headers:{
                'Authorization' : authHeader(),
            }
        })
        .then(response =>{
            if(response.status === 204){
                return true;
            }
        })
        .catch(error =>{
            console.log(error);
        })
}

const GetAll = async () =>{
     let data = await http
    .get(API_EMPLOYEE_URL,
        {
            headers:{
                'Authorization' : authHeader()
            }
        })
        .catch(error =>{
            console.log(error);
        })

    return data.data;
}

const EmployeeService = {
    post,
    put,
    GetAll
}

export default EmployeeService;