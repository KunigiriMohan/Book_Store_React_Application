import axios from "axios"
class BookStoreHomePageService {
    baseURL = `http://localhost:9002/`;

    getAllBooksonHomeScreen() {
        return axios.get(this.baseURL + `getallbooks`);
    }

    getAllBooksonSearchScreen(data) {
        return axios.get(this.baseURL + `getallbooks/${data}`);
    }

    getAllBooksonSearchScreenByprice(data) {
        return axios.get(this.baseURL + `getbooks/${parseInt(data)}`);
    }

    getBookByBookId(data) {
        return axios.get(this.baseURL+`getbyid/${parseInt(data)}`)
    }

    
}

export default new BookStoreHomePageService();