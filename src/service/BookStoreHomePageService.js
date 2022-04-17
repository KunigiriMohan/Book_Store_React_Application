import axios from "axios"
class BookStoreHomePageService {
    /**
     * BaseURL
     */
    baseURL = `http://localhost:9002/`;

    /**
     * Function to handle display books on Home Page API
     * @returns : List of Books to show on home Page
     */
    getAllBooksonHomeScreen() {
        return axios.get(this.baseURL + `getallbooks`);
    }

    /**
     * Function to handle display books on Home Page by name search API
     * @returns : List of Books to show on home Page
     */
    getAllBooksonSearchScreen(data) {
        return axios.get(this.baseURL + `getallbooks/${data}`);
    }

    /**
     * Function to handle display books on Home Page by price sorting API
     * @returns : List of Books to show on home Page
     */
    getAllBooksonSearchScreenByprice(data) {
        return axios.get(this.baseURL + `getbooks/${parseInt(data)}`);
    }

    /**
     * Function to handle get book details on Home Screen by book id API
     * @returns : Book object
     */
    getBookByBookId(data) {
        return axios.get(this.baseURL+`getbyid/${parseInt(data)}`)
    }

    
}

export default new BookStoreHomePageService();