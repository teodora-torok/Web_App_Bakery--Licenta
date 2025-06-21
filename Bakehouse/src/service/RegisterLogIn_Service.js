import axios from "axios";
import { data } from "react-router-dom";

const URL_API= "http://localhost:8080/api";

export const userRegistration= async (data) => {
    try {
        const response= await axios.post(URL_API+"/register", data);
        return response
    } catch (error) {
        throw error;
    }
}

export const userLogIn= async (data)=> {
    try {
        const response= await axios.post(URL_API+"/login", data);

        return response;
    } catch (error) {
        throw error;
    }
}


