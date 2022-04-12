import axios from "axios";

class BookStoreCartService {
    baseURL = `http://localhost:9003/`;

    addBookToCart =(book,id) => {
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
}

export default new BookStoreCartService();