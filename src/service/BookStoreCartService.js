import axios from "axios";

class BookStoreCartService {
    baseURL = `http://localhost:9003/`;

    addBookToCart =(book,id) => {
        console.log(id);
        axios.post(this.baseURL+`addbook/${parseInt(id)}`,book);
    }

    noofBooksPresentinCart = (id) =>{
        return axios.get(this.baseURL+`bookscount/${parseInt(id)}`)
    }

    getBookPresentinCart(id){
        return axios.get(this.baseURL+`booksincart/${parseInt(id)}`);
    }

    removeBookFromCart(id){
        return axios.delete(this.baseURL+`removebookfromcart/${parseInt(id)}`)
    }

    updateBooksinCart(bookid,quantity){
        return axios.post(this.baseURL+`updatequantity/${parseInt(quantity)}/${parseInt(bookid)}`);
    }

    getCartTotal(userId) {
        return axios.get(this.baseURL+`carttotal/${parseInt(userId)}`)
    }

    removeBookFromCartusingUserId(id){
        return axios.delete(this.baseURL+`deletebookbyuserid/${parseInt(id)}`)
    }

    saveOrder(order){
        console.log(order)
        return axios.post(`http://localhost:9004/order`,order);
    }
}

export default new BookStoreCartService();