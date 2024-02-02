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

const put = async(PropertyUpdateModel, propertyId) => {
    return await http
    .put(API_PROPERTY_URL + "/" + propertyId,
    PropertyUpdateModel,
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
     return await http
    .get(API_PROPERTY_URL,
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

const GetPropertyWorkUnits = async (id) =>{
    return await http
    .get(API_PROPERTY_URL + "/" + id +"/workUnits",
        {
            headers:{
                Authorization : authHeader()
                
            }
        })
        .then(response =>{
           return response;
        })
        .catch(error =>{
            return error;
        })
}

const PostWorkUnits = async (propId, workUnitList) =>{
    return await http
    .post(API_PROPERTY_URL + '/' + propId + '/workUnit',
    workUnitList,
    {
        headers:{
            Authorization : authHeader()
            
        }
    })
    .then(response =>{
        return response;
     })
     .catch(error =>{
         return error;
     })
}

const DeleteWorkUnits = async (workUnitId) =>{
    return await http
    .delete(API_PROPERTY_URL + '/workUnits/' + workUnitId,
    {
        headers:{
            Authorization : authHeader()
        }
    })
    .then(response =>{
        return response;
    })
    .catch(error =>{
        return error;
    })
}

const PutWorkUnit = async(workUnitId, workUnitUpdateModel) => {
    console.log(workUnitUpdateModel)
    return await http
    .put(API_PROPERTY_URL + "/workUnits/" + workUnitId ,
    workUnitUpdateModel,
        {
            headers:{
                'Authorization' : authHeader(),
                'Content-Type' : 'application/json'
            }
        })
        .then(response =>{
            return response;
        })
        .catch(error =>{
            return error;
        })
}

const GetEmployeeWorkUnits = async (id) =>{
    return await http
    .get(API_PROPERTY_URL +"/workUnits/" + id,
        {
            headers:{
                Authorization : authHeader()
                
            }
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
    getPhotos,
    GetPropertyWorkUnits,
    PostWorkUnits,
    DeleteWorkUnits,
    PutWorkUnit,
    GetEmployeeWorkUnits
}

export default PropertyService;