//it is used to fetch the data from the backend
import axios from "axios";
console.log("REACT_APP_BACKEND_URL: ",`${process.env.REACT_APP_backend_url}/api/v1`)
const API = axios.create({
    baseURL: `${process.env.REACT_APP_backend_url}/api/v1`,
});

export default API;