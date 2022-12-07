import authHeader from './auth-header';
import http from "./http";
const API_PROPERTY_URL = "/api/castle/properties";

const post = async (PropertyCreateModel) =>{

    return await http
    .post(API_PROPERTY_URL,
        PropertyCreateModel,
        {
            headers:{
                'Authorization' : authHeader()
            }
        })
        .then(response =>{
            return response;
        })
        .catch(error =>{
            return error;
        })
}

const put = async(EmployeeUpdateModel, employeeId) => {
    return await http
    .put(API_PROPERTY_URL + "/" + employeeId,
    EmployeeUpdateModel,
        {
            headers:{
                'Authorization' : authHeader(),
            }
        })
        .then(response =>{
            return response;
        })
        .catch(error =>{
            return error;
        })
}

const GetAll = async () =>{
     let data = await http
    .get(API_PROPERTY_URL,
        {
            headers:{
                'Authorization' : authHeader()
            }
        })
        .catch(error =>{
            return error;
        })

    return data.data;
}

const postPhotos = async (PhotosList, id) =>{
    let formData = new FormData();

    for(let key in PhotosList){
        formData.append(key, PhotosList[key]);
    }

    return await http
    .post(API_PROPERTY_URL + "/images/" + id,
        formData,
        {
            headers:{
                'Authorization' : authHeader(),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response =>{
           return response;
        })
        .catch(error =>{
            return error;
        })
}

const getPhotos = async (id, guid) =>{
    return await http
    .get(API_PROPERTY_URL + "/images/" + id + "/" + guid,
        {
            headers:{
                Authorization : authHeader()
                
            },
            responseType: "blob"
        })
        .then(response =>{
           return response;
        })
        .catch(error =>{
            return error;
        })
}

const PropertyService = {
    post,
    put,
    GetAll,
    postPhotos,
    getPhotos
}

export default PropertyService;