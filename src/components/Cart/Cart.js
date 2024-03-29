import React from "react";
import logo from "../../assets/education.svg";
import cart from "../../assets/supermarket.svg";
import { useEffect, useState } from "react";
import BookStoreCartService from "../../service/BookStoreCartService";
import "../Cart/Cart.css"
import design from "../../assets/designof.png"
import groupdiscussion from "../../assets/groupdiscussion.png"
import learnux from "../../assets/learnux.png"
import react from "../../assets/react.png";
import sharepoint from "../../assets/sharepoint.png";
import UXdesign from "../../assets/UXdesign.png";
import dmmt from "../../assets/dontmake.png";
import wishList from "../../assets/heart-492.png"
import WishListService from "../../service/WishListService";

/**
 * Cart Functional Component
 */
const Cart = (props) => {

    const [count, setCount] = useState();

    const [bookList, setBookList] = useState([]);

    const userid = props.location.state;

    const [bookInWishList,setBooksInWishList] =useState([]);


    /**
     * Function to handle remove book from cart event 
     * @param {} id 
     */
    const removeBookFromCart = (id) => {
        BookStoreCartService.removeBookFromCart(id);
    }


    /**
     * Function to handle increasing quantity of books event 
     * @param {*} bookId 
     * @param {*} quantity 
     */
    const addBook = (bookId,quantity) => {
        BookStoreCartService.updateBooksinCart(bookId,quantity+1);
    }


    /**
     * Function to handle decreasing books quantity from cart event 
     * @param {*} bookId 
     * @param {*} quantity 
     */
    const deleteBook = (bookId,quantity) => {
        quantity === 1 ? BookStoreCartService.removeBookFromCart(bookId) :
        BookStoreCartService.updateBooksinCart(bookId,quantity-1);
    }

    /**
     * Function to handle Home redirect icon in header
     */
     const homeRedirect = () => {
        props.history.push({
            pathname: "/home",
            state: userid,
        });
    }

    /**
     * Function to handle wishlist redirect icon in header
     */
    const wishListRedirect = () =>{
        props.history.push({
            pathname: "/wishlist",
            state: userid,
        });
    }

    /**
     * Function to place Order Button
     */
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

    /**
     * useEffect() to store books present in wishlist in a array
     */
    useEffect(() =>{
        WishListService.getBookByUserId(userid).then((data) =>{setBooksInWishList(data.data)})
    },[bookInWishList])

    /**
     * useEffect() to store books present in cart ina array and store books in cart count in state variable
     */
    useEffect(() => {
        BookStoreCartService.noofBooksPresentinCart(userid).then((data) => { setCount(data.data) });
        BookStoreCartService.getBookPresentinCart(userid).then((data) => { setBookList(data.data) });
    }, [count, bookList,removeBookFromCart]);


    /**
     * DOM of the Cart Component
     */
    return (
        <>
            <header>
                <img className="header-logo1" src={logo} onClick={homeRedirect} />
                <h2>Book Store</h2>
                <img className="cart-image1" src={cart} /><div className="cart-count">{count}</div>
                <img className="wishlist-image" src={wishList} onClick={wishListRedirect} /><div className="cart-count">{bookInWishList.length}</div>
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