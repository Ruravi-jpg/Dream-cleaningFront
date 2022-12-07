import axios from "axios";

const getBaseUrl = () =>{
    let url = "";
    console.log(process.env.REACT_APP_ENV);
    switch(process.env.REACT_APP_ENV){
        case 'production':
            url = process.env.REACT_APP_API_URL;
            break;
        case 'development':
            url = process.env.REACT_APP_API_URL_Local;
            break;
        default:
            url = undefined;
    }
    return url;
}

export default axios.create({
    baseURL: getBaseUrl(),
})