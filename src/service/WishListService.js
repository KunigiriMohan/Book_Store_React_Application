import axios from "axios";

class WishListService{

    /**
     * BaseURL
     */
    baseURL =`http://localhost:8080/`;

    /**
     * Function to handle add book to wishlist operation API
     * @param {*} book 
     * @param {*} id 
     */
    addBookToWishList(book,id){
        return axios.post(this.baseURL+`addbooktowishlist/${parseInt(id)}`,book);
    }

    /**
     * Function to handle get book by userid API
     * @param {*} id 
     */
    getBookByUserId(id){
        return axios.get(this.baseURL+`getallwishlistedbooks/${parseInt(id)}`);
    }

    /**
     * Function to handle get book by bookid API
     * @param {*} id 
     */
    getBookById(id){
        return axios.get(this.baseURL+`getbookbyid/${parseInt(id)}`);
    }

    /**
     *  Function to handle get book by bookid API
     * @param {*} id 
     */
    deleteBookById(id){
        return axios.delete(this.baseURL+`deletebookbyid/${parseInt(id)}`)
    }
}
export default new WishListService();
