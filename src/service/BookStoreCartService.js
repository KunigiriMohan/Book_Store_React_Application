import axios from "axios";

/**
 * Cart Service class to handle cart API operations
 */
class BookStoreCartService {
    /**
     * Base URL of Cart
     */
    baseURL = `http://localhost:9003/`;

    /**
     * Function to handle adding book to cart operation API
     * @param {*} book 
     * @param {*} id 
     */
    addBookToCart =(book,id) => {
        axios.post(this.baseURL+`addbook/${parseInt(id)}`,book);
    }

    /**
     * Function to handle get no of books present in cart API
     * @param {*} id 
     * @returns : books count present in cart
     */
    noofBooksPresentinCart = (id) =>{
        return axios.get(this.baseURL+`bookscount/${parseInt(id)}`)
    }

    /**
     * Function to handle get books present in cart API
     * @param {*} id 
     * @returns : List of Books
     */
    getBookPresentinCart(id){
        return axios.get(this.baseURL+`booksincart/${parseInt(id)}`);
    }

    /**
     * Function to handle remove book present in cart API
     * @param {*} id 
     */
    removeBookFromCart(id){
        return axios.delete(this.baseURL+`removebookfromcart/${parseInt(id)}`)
    }

    /**
     * Function to handle increasing or decreasing quantity of books present in cart API
     * @param {*} bookid 
     * @param {*} quantity 
     * @returns : List of Updated Book Quantity
     */
    updateBooksinCart(bookid,quantity){
        return axios.post(this.baseURL+`updatequantity/${parseInt(quantity)}/${parseInt(bookid)}`);
    }

    /**
     * Function to handle total cart value API
     * @param {*} userId 
     * @returns : Total Cart Value
     */
    getCartTotal(userId) {
        return axios.get(this.baseURL+`carttotal/${parseInt(userId)}`)
    }

    /**
     * Function to handle remove book from Cart API
     * @param {*} id 
     */
    removeBookFromCartusingUserId(id){
        return axios.delete(this.baseURL+`deletebookbyuserid/${parseInt(id)}`)
    }

    /**
     * Function to handle save order Details API
     * @param {*} order 
     */
    saveOrder(order){
        return axios.post(`http://localhost:9004/order`,order);
    }
}

export default new BookStoreCartService();