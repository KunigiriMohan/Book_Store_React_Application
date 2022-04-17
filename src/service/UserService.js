import axios from "axios";
import react from "react";

class UserService extends react.Component{

    /**
     * BaseURL
     */
    baseURL = `http://localhost:9001/`;

    /**
     * Funcion to handle Register User API
     * @param {*} user 
     * @returns : registered user object
     */
    userRegister= (user) =>{
        return axios.post(this.baseURL+`registeruser`,user)
    }

    /**
     * Function to Handle User Login API
     * @param {*} user 
     * @returns : userid and token
     */
    userLogin = (user) =>{
        return axios.post(this.baseURL+`login`,user);
    }

    /**
     * Function to handle get user object by userid API 
     * @param {*} id 
     * @returns : User Object
     */
    getUserbyId =(id) =>{
        return axios.get(this.baseURL+`getuserbyid/${id}`)
    }

    /**
     * Function to handle update user data API  
     * @param {e} user 
     * @param {*} userid 
     * @returns : Object of Updated user details object
     */
    updateUserById =(user,userid) =>{
        return axios.put(this.baseURL+`updateuser/${parseInt(userid)}`,user);
    }
 }
export default new UserService()