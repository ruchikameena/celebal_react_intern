//it is used to fetch the data from the backend
import axios from "axios";
const API = axios.create({
    baseURL: "https://celebal-react-intern.onrender.com/api/v1",
});

export default API;