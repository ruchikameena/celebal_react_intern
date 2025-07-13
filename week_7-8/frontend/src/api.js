//it is used to fetch the data from the backend
import axios from "axios";
const API = axios.create({
    baseURL: `${process.env.REACT_APP_backend_url}/api/v1`,
});

export default API;