import authHeader from './auth-header';
import http from "./http";
const API_USER_URL = "/api/castle/users";

const put = async(UserUpdateModel, userId) => {
    return await http
    .put(API_USER_URL + "/" + userId,
    UserUpdateModel,
        {
            headers:{
                'Authorization' : authHeader(),
            }
        })
        .then(response =>{
            console.log(response);
            if(response.status === 204){
                return true;
            }
        })
        .catch(error =>{
            console.log(error);
        })
}

const UserService = {
    put
}

export default UserService;