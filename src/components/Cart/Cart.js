import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/education.svg";
import cart from "../../assets/supermarket.svg";
import { useEffect, useState } from "react";
import BookStoreCartService from "../../service/BookStoreCartService";
import "../Cart/Cart.css"
import Collapsible from 'react-collapsible';
import design from "../../assets/designof.png"
import groupdiscussion from "../../assets/groupdiscussion.png"
import learnux from "../../assets/learnux.png"
import react from "../../assets/react.png";
import sharepoint from "../../assets/sharepoint.png";
import UXdesign from "../../assets/UXdesign.png";
import dmmt from "../../assets/dontmake.png";



const Cart = (props) => {

    const [count, setCount] = useState();

    const [bookname, setBookName] = useState();

    const [bookList, setBookList] = useState([]);

    const userid = props.location.state;

    
    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
        BookStoreCartService.getBookPresentinCart(userid).then((data) => { setBookList(data.data) });
    }, [count, bookList]);

    const cartRedirect = () => {
        props.history.push({
            pathname: "/home",
            state: userid,
        });
    }

    const removeBookFromCart = (id) => {
        BookStoreCartService.removeBookFromCart(id);
        window.location.assign(`/cart`);
        window.location.assign(`/cart`);
        window.location.assign(`/cart`);
    }


    const addBook = (bookId,quantity) => {
        BookStoreCartService.updateBooksinCart(bookId,quantity+1);
    }


    const deleteBook = (bookId,quantity) => {
        quantity === 1 ? BookStoreCartService.removeBookFromCart(bookId) :
        BookStoreCartService.updateBooksinCart(bookId,quantity-1);
    }

    const placeOrder =() =>{
        if (count){
            props.history.push({
                pathname: "/details",
                state: userid,
            });
        }else{
            alert("Your Cart is Empty")
            props.history.push({
                pathname: "/home",
                state: userid,
            });
        }
    }

    return (
        <>
            <header>
                <img className="header-logo1" src={logo} onClick={cartRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} /><div className="cart-count">{count}</div>
            </header>
            <div className="cart-main">
                <h2 className="cart-details"><strong>My Cart ({count})</strong></h2>
                {
                    bookList.map((book) =>
                        <div className="cart-book" key={book.id}>
                            <img className="book-image" src={
                                book.bookPath === "../../assets/image 11.png" ? dmmt
                                    : book.bookPath === "../../assets/designof.png" ? design
                                        : book.bookPath === "../../assets/groupdiscussion.png" ? groupdiscussion
                                            : book.bookPath === "../../assets/learnux.png" ? learnux
                                                : book.bookPath === "../../assets/react.png" ? react
                                                    : book.bookPath === "../../assets/sharepoint.png" ? sharepoint
                                                        : UXdesign} />
                            <div className="values">
                                <h2 className="book-title">{book.bookName}</h2>
                                <p className="book-author">{book.bookAuthor}</p>
                                <p className="book-price">Rs {book.bookPrice}</p>
                                <div className="quantity">
                                    <button className="quantity-button" onClick={()=>addBook(book.bookId,book.quantity)}>+</button>
                                    <p className="book-quantity">{book.quantity}</p>
                                    <button className="quantity-button"  onClick={()=>deleteBook(book.bookId,book.quantity)}>-</button>
                                    <button className="remove" onClick={() => removeBookFromCart(book.bookId)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                <button className="place-order" onClick={() => placeOrder()}>PLACE ORDER</button>
            </div>
        </>
    )


}
export default Cart;