import axios from "axios";

const getBaseUrl = () =>{
    let url = "";
    console.log(process.env.REACT_APP_ENV);
    switch(process.env.REACT_APP_ENV){
        case 'production':
            url = process.env.REACT_APP_API_URL;
            console.log(url);
            break;
        case 'development':
            url = process.env.REACT_APP_API_URL_Local;
            console.log(url);
            break;
        default:
            url = undefined;
    }
    console.log(url);
    return url;
}

export default axios.create({
    baseURL: getBaseUrl(),
})