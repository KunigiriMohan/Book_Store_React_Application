import axios from "axios";
import react from "react";

class UserService extends react.Component{
    baseURL = `http://localhost:9001/`;

    userRegister= (user) =>{
        return axios.post(this.baseURL+`registeruser`,user)
    }
    userLogin = (user) =>{
        return axios.post(this.baseURL+`login`,user);
    }
    getUserbyId =(id) =>{
        return axios.get(this.baseURL+`getuserbyid/${id}`)
    }

}
export default new UserService()